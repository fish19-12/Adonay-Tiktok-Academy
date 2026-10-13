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

test("adds configured announcement and community invite links", () => {
  const previousChannel = process.env.TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL;
  const previousGroup = process.env.TELEGRAM_STUDENT_GROUP_URL;
  process.env.TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL =
    "https://t.me/+channelInvite";
  process.env.TELEGRAM_STUDENT_GROUP_URL = "https://t.me/+groupInvite";

  const rows = telegramBot.welcomeKeyboard().reply_markup.inline_keyboard;
  const buttons = rows.flat();
  assert.ok(buttons.some((button) => button.text === "📣 Announcements"));
  assert.ok(buttons.some((button) => button.text === "👥 Student Community"));
  assert.ok(buttons.some((button) => button.text === "🚀 Launch Academy App"));
  assert.ok(buttons.some((button) => button.text === "❔ FAQs"));
  assert.ok(buttons.some((button) => button.text === "ℹ️ About"));
  assert.ok(
    !buttons.some((button) => /Webinars|Programs|Payments/.test(button.text)),
  );
  assert.equal(telegramBot.telegramInviteUrl("javascript:alert(1)"), null);

  if (previousChannel === undefined)
    delete process.env.TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL;
  else process.env.TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL = previousChannel;
  if (previousGroup === undefined)
    delete process.env.TELEGRAM_STUDENT_GROUP_URL;
  else process.env.TELEGRAM_STUDENT_GROUP_URL = previousGroup;
});

test("escapes Telegram HTML in the personalized welcome", () => {
  const message = telegramBot.welcomeText("<student>");
  assert.match(message, /✨ <b>ADONAY TIKTOK ACADEMY<\/b>/);
  assert.match(message, /🚀 <b>What you can do<\/b>/);
  assert.match(message, /&lt;student&gt;! 👋/);
  assert.match(message, /Choose your next step below/);
  assert.doesNotMatch(message, /\nWelcome, <student>/);
});
