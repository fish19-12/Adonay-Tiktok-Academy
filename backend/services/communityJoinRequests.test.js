const test = require("node:test");
const assert = require("node:assert/strict");
const handleCommunityJoinRequest = require("./communityJoinRequests");

function createHarness(registration) {
  const calls = [];
  const bot = {
    telegram: {
      async approveChatJoinRequest(chatId, userId) {
        calls.push({ action: "approve", chatId, userId });
      },
      async declineChatJoinRequest(chatId, userId) {
        calls.push({ action: "decline", chatId, userId });
      },
    },
  };
  const Registration = {
    async findOne(query) {
      assert.equal(query.status, "approved");
      assert.equal(query.paymentStatus, "approved");
      return query.telegramUserId === registration?.telegramUserId
        ? registration
        : null;
    },
  };
  return { bot, Registration, calls };
}

const environment = {
  TELEGRAM_STUDENT_GROUP_ID: "-100111",
  TELEGRAM_ANNOUNCEMENTS_CHANNEL_ID: "-100222",
};

test("approves a join request only for the approved student's own issued link", async () => {
  const registration = {
    telegramUserId: 445566,
    status: "approved",
    paymentStatus: "approved",
    communityInvites: {
      studentGroup: { url: "https://t.me/+student-link" },
    },
  };
  const { bot, Registration, calls } = createHarness(registration);
  const result = await handleCommunityJoinRequest(
    {
      chat: { id: -100111 },
      from: { id: 445566 },
      invite_link: { invite_link: "https://t.me/+student-link" },
    },
    bot,
    Registration,
    environment,
  );

  assert.deepEqual(result, { result: "approved" });
  assert.deepEqual(calls, [
    { action: "approve", chatId: "-100111", userId: 445566 },
  ]);
});

test("declines a forwarded link used by a different Telegram account", async () => {
  const registration = {
    telegramUserId: 445566,
    status: "approved",
    paymentStatus: "approved",
    communityInvites: {
      studentGroup: { url: "https://t.me/+student-link" },
    },
  };
  const { bot, Registration, calls } = createHarness(registration);
  const result = await handleCommunityJoinRequest(
    {
      chat: { id: -100111 },
      from: { id: 998877 },
      invite_link: { invite_link: "https://t.me/+student-link" },
    },
    bot,
    Registration,
    environment,
  );

  assert.deepEqual(result, { result: "declined" });
  assert.deepEqual(calls, [
    { action: "decline", chatId: "-100111", userId: 998877 },
  ]);
});

test("declines requests using a link not issued to the matching registration", async () => {
  const registration = {
    telegramUserId: 445566,
    status: "approved",
    paymentStatus: "approved",
    communityInvites: {
      studentGroup: { url: "https://t.me/+student-link" },
    },
  };
  const { bot, Registration, calls } = createHarness(registration);
  const result = await handleCommunityJoinRequest(
    {
      chat: { id: -100111 },
      from: { id: 445566 },
      invite_link: { invite_link: "https://t.me/+another-student-link" },
    },
    bot,
    Registration,
    environment,
  );

  assert.deepEqual(result, { result: "declined" });
  assert.deepEqual(calls[0], {
    action: "decline",
    chatId: "-100111",
    userId: 445566,
  });
});

test("ignores join requests for chats outside the configured academy spaces", async () => {
  const { bot, Registration, calls } = createHarness(null);
  const result = await handleCommunityJoinRequest(
    { chat: { id: -100999 }, from: { id: 445566 } },
    bot,
    Registration,
    environment,
  );

  assert.deepEqual(result, { result: "not_managed" });
  assert.equal(calls.length, 0);
});
