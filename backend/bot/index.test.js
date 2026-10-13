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
  assert.match(message, /🚀 <b>WELCOME TO ADONAY TIKTOK ACADEMY!<\/b>/);
  assert.match(message, /Turn your creativity into influence/);
  assert.match(message, /Learn practical skills/);
  assert.match(message, /Learn\. Create\. Grow\. Make an Impact\./);
  assert.match(message, /&lt;student&gt;! 👋/);
  assert.doesNotMatch(message, /\nWelcome, <student>/);
});

test("only approved registrations receive reusable one-person community invites", async () => {
  const calls = [];
  const bot = {
    telegram: {
      async createChatInviteLink(chatId, options) {
        calls.push({ chatId, options });
        return { invite_link: `https://t.me/+private-${chatId}` };
      },
    },
  };
  const environment = {
    TELEGRAM_STUDENT_GROUP_ID: "-100123",
    TELEGRAM_ANNOUNCEMENTS_CHANNEL_ID: "-100456",
  };
  const pending = { status: "pending", communityInvites: {} };
  assert.equal(
    await telegramBot.createApprovedCommunityInvites(
      pending,
      bot,
      environment,
      1000,
    ),
    null,
  );
  assert.equal(calls.length, 0);

  const approved = {
    status: "approved",
    communityInvites: {},
    async save() {
      this.saved = true;
    },
  };
  const links = await telegramBot.createApprovedCommunityInvites(
    approved,
    bot,
    environment,
    1000,
  );
  assert.equal(calls.length, 2);
  assert.equal(calls[0].options.member_limit, 1);
  assert.equal(approved.saved, true);
  assert.equal(links.studentGroupUrl, "https://t.me/+private--100123");
  assert.equal(links.announcementsUrl, "https://t.me/+private--100456");

  await telegramBot.createApprovedCommunityInvites(
    approved,
    bot,
    environment,
    2000,
  );
  assert.equal(calls.length, 2);
});

test("legacy shared group and channel invite links are revoked at startup", async () => {
  const revoked = [];
  const bot = {
    telegram: {
      async revokeChatInviteLink(chatId, inviteLink) {
        revoked.push({ chatId, inviteLink });
        return true;
      },
    },
  };

  await telegramBot.revokeLegacyCommunityInvites(bot, {
    TELEGRAM_STUDENT_GROUP_ID: "-100123",
    TELEGRAM_ANNOUNCEMENTS_CHANNEL_ID: "-100456",
  });

  assert.equal(revoked.length, 2);
  assert.equal(revoked[0].inviteLink, "https://t.me/+KRece_7cHLZlOTJk");
  assert.equal(revoked[1].inviteLink, "https://t.me/+6m8OBjwrEgUxMzk0");
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
