async function handleCommunityJoinRequest(
  request,
  bot,
  Registration,
  environment,
) {
  const chatId = String(request?.chat?.id || "");
  const userId = request?.from?.id;
  const studentGroupId = String(environment.TELEGRAM_STUDENT_GROUP_ID || "");
  const announcementsId = String(
    environment.TELEGRAM_ANNOUNCEMENTS_CHANNEL_ID || "",
  );

  if (
    !userId ||
    ![studentGroupId, announcementsId].includes(chatId) ||
    !/^-?\d+$/.test(chatId)
  ) {
    return { result: "not_managed" };
  }

  const registration = await Registration.findOne({
    telegramUserId: userId,
    status: "approved",
    paymentStatus: "approved",
  });
  const inviteKey =
    chatId === studentGroupId ? "studentGroup" : "announcementsChannel";
  const issuedInvite = registration?.communityInvites?.[inviteKey]?.url;
  const requestInvite = request.invite_link?.invite_link;

  if (issuedInvite && requestInvite === issuedInvite) {
    await bot.telegram.approveChatJoinRequest(chatId, userId);
    return { result: "approved" };
  }

  await bot.telegram.declineChatJoinRequest(chatId, userId);
  return { result: "declined" };
}

module.exports = handleCommunityJoinRequest;
