const { Telegraf, Markup } = require("telegraf");

const WEBSITE_URL = "https://www.adonaytiktokacademy.com";
const DEFAULT_MINI_APP_URL = "https://www.adonaytiktokacademy.com/app";

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
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
  const buttons = [
    [Markup.button.webApp("Launch Academy App", miniAppUrl("home"))],
    [
      appButton("register", "Apply for Training"),
      appButton("training", "Explore Programs"),
    ],
    [appButton("webinars", "Webinars"), appButton("faq", "FAQs")],
    [
      appButton("profile", "My Profile"),
      Markup.button.callback("Payment Information", "payments"),
    ],
    [
      Markup.button.url("About the Academy", `${WEBSITE_URL}/about`),
      Markup.button.url("Contact Support", supportUrl()),
    ],
  ];

  const announcementsUrl = telegramInviteUrl(
    process.env.TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL,
  );
  if (announcementsUrl) {
    buttons.push([
      Markup.button.url("Academy Announcements", announcementsUrl),
    ]);
  }

  const communityUrl = telegramInviteUrl(
    process.env.TELEGRAM_STUDENT_GROUP_URL,
  );
  if (communityUrl)
    buttons.push([Markup.button.url("Student Community", communityUrl)]);
  return Markup.inlineKeyboard(buttons);
}

const welcomeText = (name = "") =>
  `<b>ADONAY TIKTOK ACADEMY</b>${name ? `\nWelcome, ${escapeHtml(name)}.` : ""}\n\n` +
  "Build practical skills in TikTok, short-form content, personal branding, and digital growth.\n\n" +
  "Choose where you would like to begin.";

function startTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.info(
      "Telegram bot is not started: TELEGRAM_BOT_TOKEN is not configured.",
    );
    return null;
  }

  const bot = new Telegraf(token);
  const sendWelcome = (ctx) =>
    ctx.reply(welcomeText(ctx.from?.first_name), {
      ...welcomeKeyboard(),
      parse_mode: "HTML",
    });

  bot.start(sendWelcome);
  bot.help((ctx) =>
    ctx.reply(
      "Use /start to open the academy menu. You can browse training, check webinars, read FAQs, and contact the academy here.",
    ),
  );
  bot.command("register", (ctx) =>
    ctx.reply(
      "Registration is handled through the academy's official form. Open the registration screen below to apply.",
      Markup.inlineKeyboard([[appButton("register", "Open Registration")]]),
    ),
  );
  bot.command("courses", (ctx) =>
    ctx.reply(
      "Browse the academy's available training programs.",
      Markup.inlineKeyboard([[appButton("training", "Explore Training")]]),
    ),
  );
  bot.command("account", (ctx) =>
    ctx.reply(
      "Open the Academy App to see your Telegram profile and account options.",
      Markup.inlineKeyboard([[appButton("profile", "My Account")]]),
    ),
  );
  bot.command("payments", (ctx) =>
    ctx.reply(
      "Payment status is not managed in this bot. The academy will provide payment instructions through an authorized process after registration. Never send payment details or receipt screenshots in this chat.",
    ),
  );
  bot.command("webinars", (ctx) =>
    ctx.reply(
      "See public upcoming and live academy webinars.",
      Markup.inlineKeyboard([[appButton("webinars", "View Webinars")]]),
    ),
  );
  bot.command("announcements", (ctx) => {
    const announcementsUrl = telegramInviteUrl(
      process.env.TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL,
    );
    if (!announcementsUrl) {
      return ctx.reply("Academy announcements are not configured yet.");
    }
    return ctx.reply(
      "Follow the official academy channel for updates and announcements.",
      Markup.inlineKeyboard([
        [Markup.button.url("Open Announcements Channel", announcementsUrl)],
      ]),
    );
  });
  bot.command("faq", (ctx) =>
    ctx.reply(
      "The academy focuses on practical TikTok, short-form content, personal branding, and digital strategy. Training formats depend on each program. Read more at the official FAQ: https://www.adonaytiktokacademy.com/faq",
      Markup.inlineKeyboard([[appButton("faq", "Open FAQ")]]),
    ),
  );
  bot.command("support", (ctx) =>
    ctx.reply(
      "Contact the academy support team here. Never share your password or payment credentials.",
      Markup.inlineKeyboard([
        [Markup.button.url("Message Support", supportUrl())],
      ]),
    ),
  );
  bot.command("about", (ctx) =>
    ctx.reply(
      "Adonay TikTok Academy builds practical digital skills through content, strategy, and education. Learn, create, and grow with a focus on real-world application. More: https://www.adonaytiktokacademy.com/about",
      Markup.inlineKeyboard([
        [Markup.button.url("About the Academy", `${WEBSITE_URL}/about`)],
      ]),
    ),
  );

  bot.action(/^open:(.+)$/, async (ctx) => {
    const screen = ctx.match[1];
    await ctx.answerCbQuery();
    const url = miniAppUrl(screen);
    const markup = Markup.inlineKeyboard([
      [
        url
          ? Markup.button.webApp("Open this screen", url)
          : Markup.button.url("Open Academy Website", websiteUrl(screen)),
      ],
    ]);
    return ctx.reply(
      `Open ${screen === "training" ? "training" : screen} in the Academy App.`,
      markup,
    );
  });
  bot.action("payments", async (ctx) => {
    await ctx.answerCbQuery();
    return ctx.reply(
      "Payment status is not managed in this bot. Never send payment details or receipt screenshots in this chat.",
    );
  });
  bot.action("about", async (ctx) => {
    await ctx.answerCbQuery();
    return ctx.reply(
      "Adonay TikTok Academy builds practical digital skills through content, strategy, and education.",
      Markup.inlineKeyboard([
        [Markup.button.url("About the Academy", `${WEBSITE_URL}/about`)],
      ]),
    );
  });
  bot.action("support", async (ctx) => {
    await ctx.answerCbQuery();
    return ctx.reply(
      "Contact the academy support team here. Never share your password or payment credentials.",
      Markup.inlineKeyboard([
        [Markup.button.url("Message Support", supportUrl())],
      ]),
    );
  });

  bot.catch((error) =>
    console.error("Telegram bot update failed:", error.message),
  );
  bot.telegram
    .setMyCommands([
      { command: "start", description: "Open the academy menu" },
      { command: "help", description: "Get help using the bot" },
      { command: "register", description: "Register for training" },
      { command: "courses", description: "Explore training programs" },
      { command: "account", description: "Open account options" },
      { command: "payments", description: "Payment status information" },
      { command: "webinars", description: "View public webinars" },
      { command: "announcements", description: "Follow academy updates" },
      { command: "faq", description: "Frequently asked questions" },
      { command: "support", description: "Contact academy support" },
      { command: "about", description: "About the academy" },
    ])
    .catch((error) =>
      console.error("Telegram command setup failed:", error.message),
    );

  bot.telegram
    .setChatMenuButton({
      menuButton: {
        type: "web_app",
        text: "Open Academy",
        web_app: { url: miniAppUrl("home") },
      },
    })
    .catch((error) =>
      console.error("Telegram Mini App menu setup failed:", error.message),
    );

  bot.telegram
    .setMyDescription(
      "Practical TikTok and digital content training. Explore programs, webinars, and academy support.",
    )
    .catch((error) =>
      console.error("Telegram bot description setup failed:", error.message),
    );

  bot.telegram
    .setMyShortDescription(
      "Learn. Create. Grow. Practical creator education from Adonay TikTok Academy.",
    )
    .catch((error) =>
      console.error(
        "Telegram bot short description setup failed:",
        error.message,
      ),
    );

  bot
    .launch()
    .then(() => console.info("Telegram bot started."))
    .catch((error) =>
      console.error("Telegram bot could not start:", error.message),
    );
  return bot;
}

module.exports = startTelegramBot;
module.exports.miniAppUrl = miniAppUrl;
module.exports.supportUrl = supportUrl;
module.exports.telegramInviteUrl = telegramInviteUrl;
module.exports.welcomeKeyboard = welcomeKeyboard;
module.exports.welcomeText = welcomeText;
