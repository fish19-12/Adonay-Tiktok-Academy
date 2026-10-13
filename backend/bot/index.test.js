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
  process.env.TELEGRAM_SUPPORT_USERNAME = "@academy_help";
  assert.equal(telegramBot.supportUrl(), "https://t.me/academy_help");

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
  assert.ok(buttons.some((button) => button.text === "Academy Announcements"));
  assert.ok(buttons.some((button) => button.text === "Student Community"));
  assert.equal(telegramBot.telegramInviteUrl("javascript:alert(1)"), null);

  if (previousChannel === undefined)
    delete process.env.TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL;
  else process.env.TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL = previousChannel;
  if (previousGroup === undefined)
    delete process.env.TELEGRAM_STUDENT_GROUP_URL;
  else process.env.TELEGRAM_STUDENT_GROUP_URL = previousGroup;
});

test("escapes Telegram HTML in the personalized welcome", () => {
  assert.match(telegramBot.welcomeText("<student>"), /&lt;student&gt;/);
  assert.doesNotMatch(
    telegramBot.welcomeText("<student>"),
    /\nWelcome, <student>/,
  );
});
