const { Telegraf, Markup, Input } = require("telegraf");
const { recordTelegramChat } = require("./chatDiscovery");
const academyPrograms = require("../config/academyPrograms");
const reviewRegistrationPayment = require("../services/registrationPaymentReview");
const handleCommunityJoinRequest = require("../services/communityJoinRequests");
const Registration = require("../models/Registration");

const WEBSITE_URL = "https://www.adonaytiktokacademy.com";
const DEFAULT_MINI_APP_URL = "https://www.adonaytiktokacademy.com/app";
const FAQ_ANSWER =
  "<b>❔ ACADEMY FAQ</b>\n\n" +
  "<b>🎬 What will I learn?</b>\nShort-form content, TikTok strategy, audience communication, and personal branding.\n\n" +
  "<b>📝 How do I register?</b>\nTap <b>Launch Academy App</b>, choose registration, complete the form, and submit your payment screenshot. Support reviews it and emails you the decision.\n\n" +
  "<b>🌱 Do I need TikTok experience?</b>\nNo. Training is practical and suitable for beginners and active creators alike.\n\n" +
  "<b>👥 Who is it for?</b>\nCreators, entrepreneurs, professionals, agents, and businesses.\n\n" +
  "<b>📍 Where is current training held?</b>\nReal Estate Agency Training is face-to-face. Check the Academy App for current program details.";
const ABOUT_ANSWER =
  "<b>✨ ADONAY TIKTOK ACADEMY</b>\n" +
  "A practical learning platform for TikTok, short-form content, personal branding, and digital growth. We make digital education clearer, more practical, and useful in real life.\n\n" +
  "<b>👤 FOUNDER &amp; ACADEMY LEAD</b>\n" +
  "<b>Adonay hailemikael</b>\n" +
  "Building practical digital skills through content, strategy, and education.\n\n" +
  "<b>01 · OUR MISSION</b>\n" +
  "Make practical digital learning accessible, helping people build stronger skills, brands, businesses, and opportunities online.\n\n" +
  "<b>02 · OUR PHILOSOPHY</b>\n" +
  "Information matters when you can use it. We focus on clear strategy, practical understanding, and real-world action.\n\n" +
  "<b>03 · OUR COMMUNITY</b>\n" +
  "A learning environment for creators, professionals, businesses, and future digital leaders.\n\n" +
  "<b>🚀 WHAT YOU’LL BUILD</b>\n" +
  "✦ <b>Content</b> · Create stronger short-form videos\n" +
  "✦ <b>Strategy</b> · Post with intention\n" +
  "✦ <b>Audience</b> · Reach and connect with the right people\n" +
  "✦ <b>Confidence</b> · Keep using your skills to grow\n\n" +
  "<i>Learn. Create. Grow.</i>";
let activeBot = null;
let pollingActive = false;
let pollingFailureStatus = null;
const communityChatReadiness = new Map();

function classifyPollingFailure(error) {
  const errorCode = error?.response?.error_code || error?.code;
  const message = String(error?.response?.description || error?.message || "");
  if (
    Number(errorCode) === 409 ||
    /terminated by other getupdates|conflict/i.test(message)
  ) {
    return "polling_conflict";
  }
  if (
    Number(errorCode) === 401 ||
    /unauthorized|invalid token/i.test(message)
  ) {
    return "bot_token_invalid";
  }
  return "bot_connection_failed";
}

function launchTelegramPolling(bot) {
  pollingActive = false;
  bot
    .launch(
      {
        allowedUpdates: [
          "message",
          "edited_message",
          "channel_post",
          "edited_channel_post",
          "callback_query",
          "chat_join_request",
          "my_chat_member",
          "chat_member",
        ],
      },
      () => {
        pollingActive = true;
        pollingFailureStatus = null;
        console.info("Telegram bot connected; long polling is active.");
      },
    )
    .catch((error) => {
      pollingActive = false;
      pollingFailureStatus = classifyPollingFailure(error);
      console.error(
        "Telegram bot polling failed:",
        pollingFailureStatus,
        error?.response?.description || error?.message || "unknown error",
      );
      const retryTimer = setTimeout(() => launchTelegramPolling(bot), 15000);
      retryTimer.unref?.();
    });
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>\"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '\"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

function websiteUrl(screen) {
  const paths = {
    home: "/",
    register: "/register",
    training: "/services",
    webinars: "/webinars",
    faq: "/faq",
    profile: "/about",
  };
  return `${WEBSITE_URL}${paths[screen] || "/"}`;
}

function miniAppUrl(screen) {
  let url;
  try {
    url = new URL(process.env.TELEGRAM_MINI_APP_URL || DEFAULT_MINI_APP_URL);
  } catch {
    url = new URL(DEFAULT_MINI_APP_URL);
  }
  if (url.protocol !== "https:") url = new URL(DEFAULT_MINI_APP_URL);
  if (screen === "home") url.searchParams.delete("screen");
  else url.searchParams.set("screen", screen);
  return url.toString();
}

function appButton(screen, label = "Open Academy App") {
  const url = miniAppUrl(screen);
  return url
    ? Markup.button.webApp(label, url)
    : Markup.button.url("Open Academy Website", websiteUrl(screen));
}

function supportUrl() {
  const username = (process.env.TELEGRAM_SUPPORT_USERNAME || "")
    .trim()
    .replace(/^@/, "");
  return /^[A-Za-z0-9_]{5,32}$/.test(username)
    ? `https://t.me/${username}`
    : `${WEBSITE_URL}/faq`;
}

function telegramInviteUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      ["t.me", "www.t.me"].includes(url.hostname)
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

function adminTelegramIds(environment = process.env) {
  return new Set(
    (environment.ADMIN_TELEGRAM_IDS || "")
      .split(/[\s,]+/)
      .map((id) => id.trim())
      .filter((id) => /^\d+$/.test(id)),
  );
}

function canReviewPayments(environment = process.env) {
  return paymentReviewerTelegramIds(environment).size > 0;
}

function paymentReviewerTelegramIds(environment = process.env) {
  return new Set(
    (environment.PAYMENT_REVIEW_TELEGRAM_IDS || "")
      .split(/[\s,]+/)
      .map((id) => id.trim())
      .filter((id) => /^\d+$/.test(id)),
  );
}

function paymentReviewStatus(
  environment = process.env,
  isPolling = pollingActive,
) {
  if (!environment.TELEGRAM_BOT_TOKEN) return "bot_not_configured";
  if (!canReviewPayments(environment))
    return "payment_reviewers_not_configured";
  if (!isPolling) return pollingFailureStatus || "bot_not_polling";
  return "ready";
}

function formatDiscoveredChatIds(chats) {
  const relevantChats = chats.filter((chat) =>
    ["student_group", "announcements_channel"].includes(chat.classification),
  );
  if (relevantChats.length === 0) {
    return "No group or channel has been detected yet. Add the bot to each chat, send a group command, and publish a channel post, then try again.";
  }

  return [
    "<b>Detected Academy Telegram chats</b>",
    ...relevantChats.map(
      (chat) =>
        `<b>${chat.classification === "student_group" ? "Student group" : "Learning channel"}:</b> <code>${escapeHtml(chat.id)}</code>\n${escapeHtml(chat.title || "Untitled chat")}`,
    ),
    "\nUse these IDs for TELEGRAM_STUDENT_GROUP_ID and TELEGRAM_ANNOUNCEMENTS_CHANNEL_ID in the backend environment.",
  ].join("\n\n");
}

async function notifyPaymentReview(registration, receiptBuffer, mimeType) {
  const bot = getTelegramBot();
  const reviewers = [...paymentReviewerTelegramIds()];
  if (!bot || !pollingActive || reviewers.length === 0) {
    throw new Error("Telegram payment review is not configured.");
  }

  const method = registration.paymentMethod === "cbe" ? "CBE" : "Telebirr";
  const account =
    registration.paymentMethod === "cbe"
      ? process.env.PAYMENT_CBE_ACCOUNT_NUMBER
      : process.env.PAYMENT_TELEBIRR_NUMBER;
  const caption =
    `<b>Payment proof to review</b>\n\n` +
    `<b>Applicant:</b> ${escapeHtml(registration.name)}\n` +
    `<b>Phone:</b> ${escapeHtml(registration.phone)}\n` +
    `<b>Email:</b> ${escapeHtml(registration.email)}\n` +
    `<b>Method:</b> ${method}\n` +
    `<b>Amount:</b> ${escapeHtml(registration.paymentAmountEtb)} ETB\n` +
    `<b>Paid to:</b> ${escapeHtml(account || "Configured account")}\n` +
    `<b>Registration:</b> <code>${registration._id}</code>`;
  const keyboard = Markup.inlineKeyboard([
    [
      Markup.button.callback(
        "Approve payment",
        `pay:approve:${registration._id}`,
      ),
      Markup.button.callback(
        "Reject payment",
        `pay:reject:${registration._id}`,
      ),
    ],
  ]);
  const extension =
    mimeType === "image/png"
      ? "png"
      : mimeType === "image/webp"
        ? "webp"
        : "jpg";
  const deliveries = await Promise.allSettled(
    reviewers.map((adminId) =>
      bot.telegram.sendPhoto(
        adminId,
        Input.fromBuffer(receiptBuffer, `payment-receipt.${extension}`),
        { caption, parse_mode: "HTML", ...keyboard },
      ),
    ),
  );

  if (!deliveries.some((delivery) => delivery.status === "fulfilled")) {
    throw new Error("Telegram could not deliver the receipt to any admin.");
  }
}

function welcomeKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.webApp("🚀 Launch Academy App", miniAppUrl("home"))],
    [
      Markup.button.callback("❔ FAQs", "faq"),
      Markup.button.callback("✨ About", "about"),
    ],
    [Markup.button.url("💬 Contact Support", supportUrl())],
  ]);
}

const welcomeText = (name = "") =>
  `🚀 <b>WELCOME TO ADONAY TIKTOK ACADEMY!</b>\n\n` +
  `${name ? `Welcome, ${escapeHtml(name)}! 👋\n\n` : ""}` +
  "Turn your creativity into influence. ✨\n\n" +
  "🎓 Learn practical skills\n" +
  "📈 Master audience growth\n" +
  "🎯 Build your personal brand\n" +
  "💡 Discover content strategies\n" +
  "🔴 Join live webinars\n" +
  "📚 Access exclusive learning resources\n\n" +
  "🔥 <b>Learn. Create. Grow. Make an Impact.</b>\n\n" +
  "👇 Start your journey today!";

async function createApprovedCommunityInvites(
  registration,
  bot = getTelegramBot(),
  environment = process.env,
  now = Date.now(),
) {
  if (registration.status !== "approved") return null;

  if (!registration.telegramUserId) {
    return {
      studentGroupUrl: null,
      announcementsUrl: null,
      studentGroupStatus: "identity_required",
      announcementsStatus: "identity_required",
    };
  }

  const inviteTargets = [
    ["studentGroup", environment.TELEGRAM_STUDENT_GROUP_ID],
    ["announcementsChannel", environment.TELEGRAM_ANNOUNCEMENTS_CHANNEL_ID],
  ];
  const communityInvites = registration.communityInvites || {};
  const inviteStatuses = {};
  const expiresAt = new Date(now + 30 * 24 * 60 * 60 * 1000);
  let changed = false;

  for (const [key, chatId] of inviteTargets) {
    if (!chatId || !/^-?\d+$/.test(chatId)) {
      inviteStatuses[key] = "not_configured";
      continue;
    }
    if (!bot) {
      inviteStatuses[key] = "bot_unavailable";
      continue;
    }

    let readiness = communityChatReadiness.get(chatId);
    if (!readiness || readiness.expiresAt <= now) {
      try {
        const chat = await bot.telegram.getChat(chatId);
        if (chat.type === "group") {
          readiness = {
            status: "upgrade_required",
            expiresAt: now + 5 * 60 * 1000,
          };
        } else if (chat.username) {
          readiness = {
            status: "make_private",
            expiresAt: now + 5 * 60 * 1000,
          };
        } else {
          const botInfo = await bot.telegram.getMe();
          const membership = await bot.telegram.getChatMember(
            chatId,
            botInfo.id,
          );
          readiness =
            ["administrator", "creator"].includes(membership.status) &&
            membership.can_invite_users !== false
              ? {
                  status: "ready",
                  expiresAt: now + 5 * 60 * 1000,
                }
              : {
                  status: "permission_required",
                  expiresAt: now + 60 * 1000,
                };
        }
      } catch (error) {
        const errorMessage = String(
          error?.response?.description ||
            error?.description ||
            error?.message ||
            "",
        );
        readiness = {
          status:
            /administrator|invite users|not enough rights|permission/i.test(
              errorMessage,
            )
              ? "permission_required"
              : "invite_unavailable",
          expiresAt: now + 60 * 1000,
        };
        console.error(
          `[Telegram] Could not verify ${key} access settings:`,
          error?.code || error?.message || "unknown error",
        );
      }
      communityChatReadiness.set(chatId, readiness);
    }
    if (readiness.status !== "ready") {
      inviteStatuses[key] = readiness.status;
      continue;
    }

    const currentInvite = communityInvites[key];
    if (
      currentInvite?.url &&
      currentInvite.requiresJoinApproval === true &&
      currentInvite.expiresAt &&
      new Date(currentInvite.expiresAt).getTime() > now
    ) {
      inviteStatuses[key] = "ready";
      continue;
    }

    try {
      if (currentInvite?.url) {
        await bot.telegram
          .revokeChatInviteLink(chatId, currentInvite.url)
          .catch(() => {});
      }
      const invite = await bot.telegram.createChatInviteLink(chatId, {
        creates_join_request: true,
        expire_date: Math.floor(expiresAt.getTime() / 1000),
      });
      communityInvites[key] = {
        url: invite.invite_link,
        expiresAt,
        requiresJoinApproval: true,
      };
      inviteStatuses[key] = "ready";
      changed = true;
    } catch (error) {
      const errorMessage = String(
        error?.response?.description ||
          error?.description ||
          error?.message ||
          "",
      );
      inviteStatuses[key] =
        /administrator|invite users|not enough rights|permission/i.test(
          errorMessage,
        )
          ? "permission_required"
          : "invite_unavailable";
      console.error(
        `[Telegram] Could not create approved ${key} invite:`,
        error?.code || error?.message || "unknown error",
      );
    }
  }

  if (changed) {
    registration.communityInvites = communityInvites;
    await registration.save();
  }

  return {
    studentGroupUrl: communityInvites.studentGroup?.url || null,
    announcementsUrl: communityInvites.announcementsChannel?.url || null,
    studentGroupStatus: inviteStatuses.studentGroup || "not_configured",
    announcementsStatus:
      inviteStatuses.announcementsChannel || "not_configured",
  };
}

async function revokeLegacyCommunityInvites(
  bot = getTelegramBot(),
  environment = process.env,
) {
  if (!bot) return;

  const legacyInvites = [
    [
      environment.TELEGRAM_STUDENT_GROUP_ID,
      environment.TELEGRAM_STUDENT_GROUP_URL ||
        "https://t.me/+KRece_7cHLZlOTJk",
    ],
    [
      environment.TELEGRAM_ANNOUNCEMENTS_CHANNEL_ID,
      environment.TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL ||
        "https://t.me/+6m8OBjwrEgUxMzk0",
    ],
  ];

  await Promise.allSettled(
    legacyInvites.map(([chatId, inviteUrl]) => {
      const safeUrl = telegramInviteUrl(inviteUrl);
      if (!chatId || !/^-?\d+$/.test(chatId) || !safeUrl) return null;
      return bot.telegram.revokeChatInviteLink(chatId, safeUrl).catch(() => {
        console.warn(
          "[Telegram] Could not revoke a legacy community invite; verify the bot's admin permissions.",
        );
      });
    }),
  );
}

function startTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.info(
      "Telegram bot is not started: TELEGRAM_BOT_TOKEN is not configured.",
    );
    return null;
  }

  const bot = new Telegraf(token);
  activeBot = bot;
  bot.on(
    [
      "message",
      "edited_message",
      "channel_post",
      "edited_channel_post",
      "my_chat_member",
      "chat_member",
    ],
    (ctx, next) => {
      const membershipUpdate = ctx.myChatMember || ctx.chatMember;
      recordTelegramChat(
        ctx.chat,
        ctx.updateType,
        membershipUpdate?.new_chat_member?.status || null,
      );
      return next();
    },
  );

  bot.on("chat_join_request", async (ctx) => {
    try {
      const result = await handleCommunityJoinRequest(
        ctx.chatJoinRequest,
        bot,
        Registration,
        process.env,
      );
      if (result.result === "approved") {
        console.info("Approved a verified student community join request.");
      } else if (result.result === "declined") {
        console.info("Declined an unverified community join request.");
      }
    } catch (error) {
      console.error(
        "[Telegram] Could not process community join request:",
        error?.code || error?.message || "unknown error",
      );
    }
  });

  const sendWelcome = (ctx) =>
    ctx.reply(welcomeText(ctx.from?.first_name), {
      ...welcomeKeyboard(),
      parse_mode: "HTML",
    });

  bot.start(sendWelcome);
  bot.help((ctx) =>
    ctx.reply(
      "<b>What this bot can do</b>\n🚀 Open the Academy Mini App\n📝 Start a training registration\n🎓 Show available training\n📅 List public upcoming webinars\n❔ Answer common academy questions\n📣 Share the official announcements channel\n💬 Connect you with support\n\n<b>Commands</b>\n/start - Welcome and quick actions\n/register - Apply for training\n/courses - Available programs\n/account - Open your profile\n/payments - Payment guidance\n/webinars - Upcoming public webinars\n/announcements - Academy updates\n/faq - Common questions\n/support - Contact support\n/about - About the academy",
      { ...welcomeKeyboard(), parse_mode: "HTML" },
    ),
  );
  bot.command("register", (ctx) =>
    ctx.reply(
      "Apply for an academy training program using the registration form.",
      Markup.inlineKeyboard([[appButton("register", "📝 Open Registration")]]),
    ),
  );
  bot.command("chatid", (ctx) => {
    if (!["group", "supergroup", "channel"].includes(ctx.chat?.type)) {
      return ctx.reply(
        "Use /chatid inside the student group. For detected group and channel IDs, send /chatids to me privately.",
      );
    }
    return ctx.reply(`Chat ID: <code>${escapeHtml(ctx.chat.id)}</code>`, {
      parse_mode: "HTML",
    });
  });
  bot.command("chatids", (ctx) => {
    if (!adminTelegramIds().has(String(ctx.from?.id || ""))) {
      return ctx.reply(
        "This command is available to configured academy admins only.",
      );
    }
    if (ctx.chat?.type !== "private") {
      return ctx.reply("For privacy, send /chatids to me in a private chat.");
    }
    const { listDiscoveredTelegramChats } = require("./chatDiscovery");
    return ctx.reply(formatDiscoveredChatIds(listDiscoveredTelegramChats()), {
      parse_mode: "HTML",
    });
  });
  bot.command("myid", (ctx) => {
    if (ctx.chat?.type !== "private") {
      return ctx.reply("For privacy, send /myid to me in a private chat.");
    }
    return ctx.reply(
      `Your Telegram user ID: <code>${escapeHtml(ctx.from.id)}</code>`,
      {
        parse_mode: "HTML",
      },
    );
  });
  bot.command("courses", (ctx) => {
    const programs = academyPrograms
      .filter((program) => program.status === "available")
      .map(
        (program) =>
          `• <b>${escapeHtml(program.title)}</b>\n${escapeHtml(program.description)}`,
      );
    const details = programs.length
      ? `${programs.join("\n\n")}\n\nMore programs will be announced when registration opens.`
      : "There are no programs open for registration right now.";
    return ctx.reply(`<b>Available training</b>\n\n${details}`, {
      ...Markup.inlineKeyboard([
        [appButton("training", "🎬 Explore Programs")],
      ]),
      parse_mode: "HTML",
    });
  });
  bot.command("account", (ctx) =>
    ctx.reply(
      "Open your profile in the Academy App. Telegram identity is checked by the app; academy registration and payment records are not linked to this profile yet.",
      Markup.inlineKeyboard([[appButton("profile", "👤 Open My Account")]]),
    ),
  );
  bot.command("payments", (ctx) =>
    ctx.reply(
      "Open the Academy App registration form to view the official CBE and Telebirr instructions and upload your receipt screenshot. Academy support reviews submitted proof in a private admin chat. Do not send payment credentials or receipts to public chats or unverified accounts.",
    ),
  );
  bot.command("webinars", async (ctx) => {
    let sessions;
    try {
      const Webinar = require("../models/Webinar");
      sessions = await Webinar.find({
        status: { $in: ["scheduled", "live"] },
        accessType: { $ne: "private" },
        $or: [{ scheduledAt: null }, { scheduledAt: { $gte: new Date() } }],
      })
        .select("title scheduledAt")
        .sort({ scheduledAt: 1 })
        .limit(5)
        .lean();
    } catch {
      return ctx.reply(
        "Upcoming webinar details are temporarily unavailable. Open the Academy App to check again.",
        Markup.inlineKeyboard([[appButton("webinars", "📅 Open Webinars")]]),
      );
    }
    const details = sessions.length
      ? sessions
          .map((session) => {
            const date = session.scheduledAt
              ? new Date(session.scheduledAt).toLocaleString("en", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "Time to be announced";
            return `• <b>${escapeHtml(session.title)}</b>\n${escapeHtml(date)}`;
          })
          .join("\n\n")
      : "No upcoming public webinars are scheduled right now.";
    return ctx.reply(`<b>Upcoming webinars</b>\n\n${details}`, {
      ...Markup.inlineKeyboard([[appButton("webinars", "📅 Open Webinars")]]),
      parse_mode: "HTML",
    });
  });
  bot.command("announcements", (ctx) => {
    return ctx.reply(
      "Academy group and channel invitations are provided in your Academy App after your registration is approved.",
    );
  });
  bot.command("faq", (ctx) => ctx.reply(FAQ_ANSWER, { parse_mode: "HTML" }));
  bot.command("support", (ctx) =>
    ctx.reply(
      "Contact academy support here. Never share passwords or payment credentials.",
      Markup.inlineKeyboard([
        [Markup.button.url("💬 Message Support", supportUrl())],
      ]),
    ),
  );
  bot.command("about", (ctx) =>
    ctx.reply(ABOUT_ANSWER, { parse_mode: "HTML" }),
  );

  bot.action(/^open:(register|training|profile|webinars|faq)$/, async (ctx) => {
    const screen = ctx.match[1];
    await ctx.answerCbQuery();
    return ctx.reply(
      `Open ${screen === "training" ? "training programs" : screen} in the Academy App.`,
      Markup.inlineKeyboard([[appButton(screen, "🚀 Open in Academy App")]]),
    );
  });
  bot.action("payments", async (ctx) => {
    await ctx.answerCbQuery();
    return ctx.reply(
      "Open the Academy App registration form to view the official CBE and Telebirr instructions and upload your receipt screenshot. Academy support reviews submitted proof in a private admin chat. Do not send payment credentials or receipts to public chats or unverified accounts.",
    );
  });
  bot.action("faq", async (ctx) => {
    await ctx.answerCbQuery();
    return ctx.reply(FAQ_ANSWER, { parse_mode: "HTML" });
  });
  bot.action("about", async (ctx) => {
    await ctx.answerCbQuery();
    return ctx.reply(ABOUT_ANSWER, { parse_mode: "HTML" });
  });

  bot.action(/^pay:(approve|reject):([a-f\d]{24})$/i, async (ctx) => {
    const actorId = String(ctx.from?.id || "");
    if (!adminTelegramIds().has(actorId)) {
      await ctx.answerCbQuery("You are not authorized to review payments.", {
        show_alert: true,
      });
      return;
    }

    const decision = ctx.match[1] === "approve" ? "approved" : "rejected";
    try {
      const result = await reviewRegistrationPayment(ctx.match[2], decision);
      if (result.result === "not_found") {
        await ctx.answerCbQuery("Registration not found.", {
          show_alert: true,
        });
        return;
      }
      if (result.result === "already_reviewed") {
        await ctx.answerCbQuery(
          `This payment was already ${result.registration.paymentStatus}.`,
          { show_alert: true },
        );
        return;
      }

      await ctx.answerCbQuery(
        decision === "approved" ? "Payment approved." : "Payment rejected.",
      );
      const previousCaption = ctx.callbackQuery.message.caption || "";
      try {
        await ctx.editMessageCaption(
          `${previousCaption}\n\n<b>Decision:</b> ${decision.toUpperCase()} by ${escapeHtml(ctx.from.first_name || "Telegram admin")}`,
          { parse_mode: "HTML" },
        );
      } catch {
        console.warn(
          "[Telegram payment review] Could not update receipt caption.",
        );
      }
    } catch (error) {
      console.error("[Telegram payment review] Decision failed:", error);
      await ctx.answerCbQuery("Could not update this payment. Try again.", {
        show_alert: true,
      });
    }
  });

  bot.catch(() => console.error("Telegram bot could not process an update."));
  bot.telegram
    .setMyCommands([
      { command: "start", description: "Open the academy menu" },
      { command: "help", description: "Get help using the bot" },
      { command: "register", description: "Register for training" },
      { command: "chatid", description: "Show this group or channel ID" },
      { command: "chatids", description: "List discovered chat IDs (admins)" },
      { command: "myid", description: "Show your Telegram user ID privately" },
      { command: "courses", description: "Explore available programs" },
      { command: "account", description: "Open account options" },
      { command: "payments", description: "Payment guidance" },
      { command: "webinars", description: "View upcoming webinars" },
      { command: "announcements", description: "Follow academy updates" },
      { command: "faq", description: "Frequently asked questions" },
      { command: "support", description: "Contact academy support" },
      { command: "about", description: "About the academy" },
    ])
    .catch(() => console.error("Telegram command setup failed."));

  bot.telegram
    .setChatMenuButton({
      menuButton: {
        type: "web_app",
        text: "Open Academy",
        web_app: { url: miniAppUrl("home") },
      },
    })
    .catch(() => console.error("Telegram Mini App menu setup failed."));

  bot.telegram
    .setMyDescription(
      "Practical TikTok and digital content training. Explore programs, webinars, and academy support.",
    )
    .catch(() => console.error("Telegram bot description setup failed."));

  bot.telegram
    .setMyShortDescription(
      "Learn. Create. Grow. Practical creator education from Adonay TikTok Academy.",
    )
    .catch(() => console.error("Telegram bot short description setup failed."));

  launchTelegramPolling(bot);
  revokeLegacyCommunityInvites(bot).catch(() => {
    console.warn(
      "[Telegram] Legacy community invite cleanup did not complete.",
    );
  });
  console.info("Telegram bot polling startup requested.");
  return bot;
}

function getTelegramBot() {
  return activeBot;
}

function isTelegramPollingActive() {
  return pollingActive;
}

module.exports = startTelegramBot;
module.exports.getTelegramBot = getTelegramBot;
module.exports.isTelegramPollingActive = isTelegramPollingActive;
module.exports.miniAppUrl = miniAppUrl;
module.exports.supportUrl = supportUrl;
module.exports.telegramInviteUrl = telegramInviteUrl;
module.exports.welcomeKeyboard = welcomeKeyboard;
module.exports.welcomeText = welcomeText;
module.exports.faqAnswer = FAQ_ANSWER;
module.exports.aboutAnswer = ABOUT_ANSWER;
module.exports.canReviewPayments = canReviewPayments;
module.exports.paymentReviewerTelegramIds = paymentReviewerTelegramIds;
module.exports.notifyPaymentReview = notifyPaymentReview;
module.exports.adminTelegramIds = adminTelegramIds;
module.exports.paymentReviewStatus = paymentReviewStatus;
module.exports.classifyPollingFailure = classifyPollingFailure;
module.exports.formatDiscoveredChatIds = formatDiscoveredChatIds;
module.exports.createApprovedCommunityInvites = createApprovedCommunityInvites;
module.exports.revokeLegacyCommunityInvites = revokeLegacyCommunityInvites;
module.exports.handleCommunityJoinRequest = handleCommunityJoinRequest;
