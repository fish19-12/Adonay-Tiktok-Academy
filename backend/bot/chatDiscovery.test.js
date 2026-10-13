const test = require("node:test");
const assert = require("node:assert/strict");
const {
  listDiscoveredTelegramChats,
  recordTelegramChat,
} = require("./chatDiscovery");

test("records group and channel metadata without private chats or message content", () => {
  const group = recordTelegramChat(
    { id: -1002003004005, title: "Academy Community", type: "supergroup" },
    "my_chat_member",
    "administrator",
  );
  const channel = recordTelegramChat(
    { id: -1005006007008, title: "Academy Announcements", type: "channel" },
    "channel_post",
  );
  const privateChat = recordTelegramChat(
    { id: 1234, first_name: "Student", type: "private" },
    "message",
  );

  assert.equal(group.classification, "student_group");
  assert.equal(group.botMembershipStatus, "administrator");
  assert.equal(channel.classification, "announcements_channel");
  assert.equal(privateChat, null);

  const chats = listDiscoveredTelegramChats();
  assert.ok(chats.some((chat) => chat.id === String(group.id)));
  assert.ok(chats.some((chat) => chat.id === String(channel.id)));
  assert.ok(chats.every((chat) => !("message" in chat)));
});
