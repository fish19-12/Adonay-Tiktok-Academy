const discoveredChats = new Map();

function recordTelegramChat(chat, updateType, membershipStatus = null) {
  if (!chat || !["group", "supergroup", "channel"].includes(chat.type)) {
    return null;
  }
  if (typeof chat.id !== "number" && typeof chat.id !== "string") {
    return null;
  }

  const id = String(chat.id);
  const previous = discoveredChats.get(id);
  const now = new Date().toISOString();
  const record = {
    id,
    title: typeof chat.title === "string" ? chat.title : "",
    type: chat.type,
    classification:
      chat.type === "channel" ? "announcements_channel" : "student_group",
    firstSeenAt: previous?.firstSeenAt || now,
    lastSeenAt: now,
    updatesSeen: [...new Set([...(previous?.updatesSeen || []), updateType])],
  };
  if (membershipStatus) record.botMembershipStatus = membershipStatus;
  else if (previous?.botMembershipStatus) {
    record.botMembershipStatus = previous.botMembershipStatus;
  }

  discoveredChats.set(id, record);
  return { ...record, updatesSeen: [...record.updatesSeen] };
}

function listDiscoveredTelegramChats() {
  return [...discoveredChats.values()]
    .map((chat) => ({ ...chat, updatesSeen: [...chat.updatesSeen] }))
    .sort((left, right) => right.lastSeenAt.localeCompare(left.lastSeenAt));
}

module.exports = { recordTelegramChat, listDiscoveredTelegramChats };
