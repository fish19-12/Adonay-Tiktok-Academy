const test = require("node:test");
const assert = require("node:assert/strict");
const telegramBot = require("./index");

test("builds direct Mini App links for home and registration", () => {
  const previousUrl = process.env.TELEGRAM_MINI_APP_URL;
  process.env.TELEGRAM_MINI_APP_URL = "https://www.adonaytiktokacademy.com/app";

  assert.equal(
    telegramBot.miniAppUrl("home"),
    "https://www.adonaytiktokacademy.com/app",
  );
  assert.equal(
    telegramBot.miniAppUrl("register"),
    "https://www.adonaytiktokacademy.com/app?screen=register",
  );

  if (previousUrl === undefined) delete process.env.TELEGRAM_MINI_APP_URL;
  else process.env.TELEGRAM_MINI_APP_URL = previousUrl;
});

test("uses the configured support username and a safe website fallback", () => {
  const previousUsername = process.env.TELEGRAM_SUPPORT_USERNAME;
  process.env.TELEGRAM_SUPPORT_USERNAME = "@Adonaytiktokacademysupport";
  assert.equal(
    telegramBot.supportUrl(),
    "https://t.me/Adonaytiktokacademysupport",
  );

  process.env.TELEGRAM_SUPPORT_USERNAME = "invalid handle";
  assert.equal(
    telegramBot.supportUrl(),
    "https://www.adonaytiktokacademy.com/faq",
  );

  if (previousUsername === undefined)
    delete process.env.TELEGRAM_SUPPORT_USERNAME;
  else process.env.TELEGRAM_SUPPORT_USERNAME = previousUsername;
});

test("welcome keyboard contains only the launch, FAQ, about, and support actions", () => {
  const rows = telegramBot.welcomeKeyboard().reply_markup.inline_keyboard;
  const buttons = rows.flat();
  assert.ok(buttons.some((button) => button.text === "🚀 Launch Academy App"));
  assert.ok(buttons.some((button) => button.text === "❔ FAQs"));
  assert.ok(buttons.some((button) => button.text === "✨ About"));
  assert.ok(buttons.some((button) => button.text === "💬 Contact Support"));
  assert.equal(buttons.length, 4);
  assert.ok(
    !buttons.some((button) =>
      /Register|Webinar|Payment|Program|Community|Announcements/.test(
        button.text,
      ),
    ),
  );
});

test("escapes Telegram HTML in the personalized welcome", () => {
  const message = telegramBot.welcomeText("<student>");
  assert.match(message, /✨ <b>ADONAY TIKTOK ACADEMY<\/b>/);
  assert.match(message, /<b>Here to help you:<\/b>/);
  assert.match(message, /&lt;student&gt;! 👋/);
  assert.match(message, /Where would you like to start\?/);
  assert.doesNotMatch(message, /\nWelcome, <student>/);
});

test("payment reviews are limited to configured numeric Telegram IDs", () => {
  const reviewers = telegramBot.adminTelegramIds({
    ADMIN_TELEGRAM_IDS: "123456, 789012 invalid -42",
  });

  assert.equal(reviewers.has("123456"), true);
  assert.equal(reviewers.has("789012"), true);
  assert.equal(reviewers.has("invalid"), false);
  assert.equal(reviewers.has("-42"), false);
  assert.equal(
    telegramBot.canReviewPayments({ ADMIN_TELEGRAM_IDS: "invalid" }),
    false,
  );
});

test("payment readiness identifies bot, reviewer, and polling requirements", () => {
  assert.equal(
    telegramBot.paymentReviewStatus({}, false),
    "bot_not_configured",
  );
  assert.equal(
    telegramBot.paymentReviewStatus({ TELEGRAM_BOT_TOKEN: "token" }, false),
    "reviewers_not_configured",
  );
  assert.equal(
    telegramBot.paymentReviewStatus(
      { TELEGRAM_BOT_TOKEN: "token", ADMIN_TELEGRAM_IDS: "12345" },
      false,
    ),
    "bot_not_polling",
  );
  assert.equal(
    telegramBot.paymentReviewStatus(
      { TELEGRAM_BOT_TOKEN: "token", ADMIN_TELEGRAM_IDS: "12345" },
      true,
    ),
    "ready",
  );
});

test("FAQ reply explains registration and welcomes learners at every level", () => {
  assert.match(telegramBot.faqAnswer, /How do I register\?/);
  assert.match(telegramBot.faqAnswer, /Launch Academy App/);
  assert.match(telegramBot.faqAnswer, /payment screenshot/);
  assert.match(telegramBot.faqAnswer, /beginners and active creators/);
  assert.match(
    telegramBot.faqAnswer,
    /Real Estate Agency Training is face-to-face/,
  );
});

test("About reply covers the founder and academy's practical learning approach", () => {
  assert.match(telegramBot.aboutAnswer, /Adonay hailemikael/);
  assert.match(telegramBot.aboutAnswer, /FOUNDER &amp; ACADEMY LEAD/);
  assert.match(telegramBot.aboutAnswer, /OUR MISSION/);
  assert.match(telegramBot.aboutAnswer, /OUR PHILOSOPHY/);
  assert.match(telegramBot.aboutAnswer, /OUR COMMUNITY/);
  assert.match(telegramBot.aboutAnswer, /Content/);
  assert.match(telegramBot.aboutAnswer, /Strategy/);
  assert.match(telegramBot.aboutAnswer, /Audience/);
  assert.match(telegramBot.aboutAnswer, /Confidence/);
});
