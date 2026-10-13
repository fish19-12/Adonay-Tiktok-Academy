const { listDiscoveredTelegramChats } = require("../bot/chatDiscovery");
const startTelegramBot = require("../bot");

exports.getChatDiagnostics = (_req, res) => {
  const chats = listDiscoveredTelegramChats();
  const groupId = process.env.TELEGRAM_STUDENT_GROUP_ID || "";
  const channelId = process.env.TELEGRAM_ANNOUNCEMENTS_CHANNEL_ID || "";
  const studentGroup = chats.find(
    (chat) => chat.classification === "student_group",
  );
  const announcementsChannel = chats.find(
    (chat) => chat.classification === "announcements_channel",
  );

  return res.json({
    success: true,
    transport: "long_polling",
    pollingActive: startTelegramBot.isTelegramPollingActive(),
    configured: {
      studentGroup: groupId ? { id: groupId } : null,
      announcementsChannel: channelId ? { id: channelId } : null,
    },
    discoveredChats: chats,
    instructions: {
      studentGroup: groupId
        ? "Group ID is configured. Confirm the matching student_group appears in discoveredChats."
        : studentGroup
          ? "Copy this student_group ID into TELEGRAM_STUDENT_GROUP_ID, then redeploy."
          : "Add the bot to the student group and send a message there while the backend is running. If group privacy is enabled, mention the bot or use a command so it receives an update.",
      announcementsChannel: channelId
        ? "Channel ID is configured. Confirm the matching announcements_channel appears in discoveredChats."
        : announcementsChannel
          ? "Copy this announcements_channel ID into TELEGRAM_ANNOUNCEMENTS_CHANNEL_ID, then redeploy."
          : "Add the bot as an administrator to the announcements channel and publish a channel post while the backend is running.",
    },
  });
};

exports.sendTelegramBroadcast = async (req, res) => {
  const { target, text } = req.body || {};
  const chatId =
    target === "announcements"
      ? process.env.TELEGRAM_ANNOUNCEMENTS_CHANNEL_ID
      : target === "community"
        ? process.env.TELEGRAM_STUDENT_GROUP_ID
        : "";

  if (!chatId || !/^-?\d+$/.test(chatId)) {
    return res.status(400).json({
      success: false,
      message:
        "A valid configured Telegram chat ID is required for this target.",
    });
  }
  if (typeof text !== "string" || !text.trim() || text.trim().length > 4096) {
    return res.status(400).json({
      success: false,
      message: "Message text must contain 1 to 4096 characters.",
    });
  }

  const bot = startTelegramBot.getTelegramBot();
  if (!bot) {
    return res.status(503).json({
      success: false,
      message:
        "Telegram bot is not running. Configure its token and restart the service.",
    });
  }

  try {
    await bot.telegram.sendMessage(chatId, text.trim(), {
      disable_web_page_preview: true,
    });
    return res.json({ success: true, message: "Telegram message sent." });
  } catch {
    return res.status(502).json({
      success: false,
      message:
        "Telegram could not deliver the message. Check the chat ID and bot permissions.",
    });
  }
};
