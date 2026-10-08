const { createVideoProvider } = require("./videoProvider");

function buildSlug(title) {
  return String(title || "webinar")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "webinar";
}

async function provisionMeeting({ title, scheduledAt, durationMinutes, timezone }) {
  const provider = createVideoProvider("zoom");
  const meeting = await provider.createMeeting({
    title,
    scheduledAt,
    durationMinutes,
    timezone,
  });

  return {
    provider: meeting.provider,
    externalMeetingId: meeting.externalMeetingId,
    externalMeetingNumber: meeting.externalMeetingNumber,
    joinUrl: meeting.joinUrl,
  };
}

function generateUniqueSlug(baseSlug, existingSlugs = []) {
  let candidate = baseSlug;
  let suffix = 1;

  while (existingSlugs.includes(candidate)) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

async function syncMeeting(meeting) {
  return createVideoProvider(meeting.provider).syncMeeting(meeting);
}

async function deleteMeeting(meeting) {
  if (!meeting?.externalMeetingId) return;
  await createVideoProvider(meeting.provider).deleteMeeting(meeting.externalMeetingId);
}

module.exports = {
  buildSlug,
  provisionMeeting,
  syncMeeting,
  deleteMeeting,
  generateUniqueSlug,
};
