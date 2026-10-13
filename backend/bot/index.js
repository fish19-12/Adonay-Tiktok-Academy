const { Telegraf, Markup } = require("telegraf");
const { recordTelegramChat } = require("./chatDiscovery");
const academyPrograms = require("../config/academyPrograms");

const WEBSITE_URL = "https://www.adonaytiktokacademy.com";
const DEFAULT_MINI_APP_URL = "https://www.adonaytiktokacademy.com/app";
const FAQ_ANSWER =
  "<b>Quick FAQs</b>\n\n<b>What do you teach?</b> Practical TikTok, short-form video, content strategy, and personal branding.\n\n<b>What is open now?</b> Real Estate Agency Training is open for registration.\n\n<b>Do I need experience?</b> No. Training is designed for different levels.\n\n<b>How do I apply?</b> Tap Register for Training and submit the application. The academy will review it.\n\n<b>Where is the current training held?</b> Real Estate Agency Training is face-to-face.";
const ABOUT_ANSWER =
  "<b>About Adonay TikTok Academy</b>\n\nWe build practical digital skills through content, strategy, and education. Our learning helps creators, professionals, and businesses communicate ideas, strengthen their digital presence, and grow with purpose.\n\n<i>Learn. Create. Grow.</i>";
let activeBot = null;
let pollingActive = false;

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
  `✨ <b>ADONAY TIKTOK ACADEMY</b>\n` +
  `<i>Learn with purpose. Create with confidence.</i>\n\n` +
  `${name ? `Welcome, ${escapeHtml(name)}! 👋` : "Welcome, creator! 👋"}\n\n` +
  "Turn ideas into compelling short-form content and build your digital presence with practical guidance.\n\n" +
  "<b>Here to help you:</b> explore the Academy App, get quick answers, learn about our approach, or reach our support team.\n\n" +
  "Where would you like to start? 👇";

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
      "Payment status is not available in the bot yet. Follow the academy's official instructions after registration. Never send payment details or receipt screenshots in chat.",
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
    const announcementsUrl = telegramInviteUrl(
      process.env.TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL,
    );
    if (!announcementsUrl)
      return ctx.reply("Academy announcements are not configured yet.");
    return ctx.reply(
      "Follow the official academy channel for updates and announcements.",
      Markup.inlineKeyboard([
        [Markup.button.url("📣 Open Announcements", announcementsUrl)],
      ]),
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
      "Payment status is not available in the bot yet. Follow the academy's official instructions after registration. Never send payment details or receipt screenshots in chat.",
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

  bot.catch(() => console.error("Telegram bot could not process an update."));
  bot.telegram
    .setMyCommands([
      { command: "start", description: "Open the academy menu" },
      { command: "help", description: "Get help using the bot" },
      { command: "register", description: "Register for training" },
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

  bot.telegram
    .getWebhookInfo()
    .then((webhookInfo) => {
      if (webhookInfo.url) {
        console.error(
          "Telegram webhook is configured. Long polling was not started; remove the webhook before restarting the bot.",
        );
        return;
      }
      return bot
        .launch({
          allowedUpdates: [
            "message",
            "edited_message",
            "channel_post",
            "edited_channel_post",
            "callback_query",
            "my_chat_member",
            "chat_member",
          ],
        })
        .then(() => {
          pollingActive = true;
          console.info("Telegram bot started with long polling.");
        });
    })
    .catch(() =>
      console.error("Telegram bot could not verify its polling configuration."),
    );
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
