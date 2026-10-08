const assert = require("node:assert/strict");
const test = require("node:test");
const { ZoomMeetingProvider } = require("./videoProvider");

const credentials = {
  accountId: "account-id",
  clientId: "client-id",
  clientSecret: "client-secret",
};

function createFetchMock(apiResponse) {
  const calls = [];
  const fetch = async (url, options) => {
    calls.push({ url: String(url), options });

    if (String(url).startsWith("https://zoom.us/oauth/token")) {
      return {
        ok: true,
        status: 200,
        json: async () => ({ access_token: "access-token" }),
      };
    }

    return apiResponse;
  };

  return { calls, fetch };
}

test("creates a scheduled Zoom meeting using Server-to-Server OAuth", async () => {
  const { calls, fetch } = createFetchMock({
    ok: true,
    status: 201,
    json: async () => ({
      id: 123456789,
      meeting_number: 987654321,
      join_url: "https://zoom.us/j/987654321",
    }),
  });
  const provider = new ZoomMeetingProvider({ ...credentials, fetch });
  const meeting = await provider.createMeeting({
    title: "Creator workshop",
    scheduledAt: "2026-11-01T12:00:00.000Z",
    durationMinutes: 45,
    timezone: "UTC",
  });

  assert.equal(meeting.externalMeetingId, "123456789");
  assert.equal(meeting.externalMeetingNumber, "987654321");
  assert.equal(meeting.joinUrl, "https://zoom.us/j/987654321");
  assert.equal(calls.length, 2);

  const tokenCall = calls[0];
  const tokenUrl = new URL(tokenCall.url);
  assert.equal(tokenUrl.searchParams.get("grant_type"), "account_credentials");
  assert.equal(tokenUrl.searchParams.get("account_id"), credentials.accountId);
  assert.equal(
    tokenCall.options.headers.Authorization,
    `Basic ${Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString("base64")}`,
  );

  const meetingCall = calls[1];
  assert.equal(meetingCall.url, "https://api.zoom.us/v2/users/me/meetings");
  assert.equal(meetingCall.options.headers.Authorization, "Bearer access-token");
  assert.deepEqual(JSON.parse(meetingCall.options.body), {
    topic: "Creator workshop",
    type: 2,
    start_time: "2026-11-01T12:00:00.000Z",
    duration: 45,
    timezone: "UTC",
  });
});

test("rejects meeting creation when Zoom credentials are missing", async () => {
  const provider = new ZoomMeetingProvider({
    accountId: "",
    clientId: "",
    clientSecret: "",
    fetch: async () => {
      throw new Error("fetch should not be called");
    },
  });

  await assert.rejects(
    provider.createMeeting({ scheduledAt: "2026-11-01T12:00:00.000Z" }),
    /Zoom Server-to-Server OAuth credentials are not configured/,
  );
});

test("updates and deletes existing Zoom meetings", async () => {
  const { calls, fetch } = createFetchMock({
    ok: true,
    status: 204,
    json: async () => null,
  });
  const provider = new ZoomMeetingProvider({ ...credentials, fetch });

  await provider.syncMeeting({
    externalMeetingId: "123456789",
    title: "Updated workshop",
    scheduledAt: "2026-11-02T12:00:00.000Z",
    durationMinutes: 60,
    timezone: "UTC",
  });
  await provider.deleteMeeting("123456789");

  const apiCalls = calls.filter((call) => call.url.startsWith("https://api.zoom.us/"));
  assert.deepEqual(apiCalls.map((call) => call.options.method), ["PATCH", "DELETE"]);
  assert.equal(apiCalls[0].url, "https://api.zoom.us/v2/meetings/123456789");
  assert.equal(apiCalls[1].url, "https://api.zoom.us/v2/meetings/123456789");
});
