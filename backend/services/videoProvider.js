class VideoProvider {
  async createMeeting() {
    throw new Error("Video provider must implement createMeeting().");
  }

  async syncMeeting() {
    throw new Error("Video provider must implement syncMeeting().");
  }

  async getJoinUrl() {
    throw new Error("Video provider must implement getJoinUrl().");
  }

  async deleteMeeting() {
    throw new Error("Video provider must implement deleteMeeting().");
  }
}

class ZoomMeetingProvider extends VideoProvider {
  constructor(config = {}) {
    super();
    this.config = {
      accountId: config.accountId || process.env.ZOOM_ACCOUNT_ID,
      clientId: config.clientId || process.env.ZOOM_CLIENT_ID,
      clientSecret: config.clientSecret || process.env.ZOOM_CLIENT_SECRET,
    };
    this.fetch = config.fetch || globalThis.fetch;
  }

  async getAccessToken() {
    const { accountId, clientId, clientSecret } = this.config;
    if (!accountId || !clientId || !clientSecret) {
      throw new Error("Zoom Server-to-Server OAuth credentials are not configured.");
    }

    const tokenUrl = new URL("https://zoom.us/oauth/token");
    tokenUrl.searchParams.set("grant_type", "account_credentials");
    tokenUrl.searchParams.set("account_id", accountId);

    const response = await this.fetch(tokenUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "account_credentials", account_id: accountId }),
    });
    const data = await response.json();

    if (!response.ok || !data.access_token) {
      const reason = data.reason || data.message || data.error_description || "No access token returned.";
      throw new Error(`Zoom OAuth request failed (${response.status}): ${reason}`);
    }

    return data.access_token;
  }

  async request(path, { method = "GET", body } = {}) {
    const accessToken = await this.getAccessToken();
    const response = await this.fetch(`https://api.zoom.us/v2${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const data = response.status === 204 ? null : await response.json();

    if (!response.ok) {
      const reason = data?.message || data?.reason || "Zoom API request failed.";
      throw new Error(`Zoom API request failed (${response.status}): ${reason}`);
    }

    return data;
  }

  async createMeeting({ title, scheduledAt, durationMinutes = 60, timezone = "UTC" } = {}) {
    const startTime = new Date(scheduledAt);
    if (!scheduledAt || Number.isNaN(startTime.getTime())) {
      throw new Error("A valid webinar start time is required to create a Zoom meeting.");
    }

    const data = await this.request("/users/me/meetings", {
      method: "POST",
      body: {
        topic: title || "Live webinar",
        type: 2,
        start_time: startTime.toISOString(),
        duration: Number(durationMinutes),
        timezone,
      },
    });

    if (!data?.id || !data.join_url) {
      throw new Error("Zoom created a meeting but returned incomplete meeting details.");
    }

    return {
      provider: "zoom",
      externalMeetingId: String(data.id),
      externalMeetingNumber: String(data.meeting_number || data.id),
      joinUrl: data.join_url,
      title: title || "Live webinar",
      scheduledAt: startTime,
      durationMinutes: Number(durationMinutes),
      timezone,
    };
  }

  async syncMeeting(meeting) {
    if (!meeting?.externalMeetingId) {
      throw new Error("A Zoom meeting ID is required to update a meeting.");
    }

    const body = {};
    if (meeting.title) body.topic = meeting.title;
    if (meeting.scheduledAt) {
      const startTime = new Date(meeting.scheduledAt);
      if (Number.isNaN(startTime.getTime())) {
        throw new Error("A valid webinar start time is required to update a Zoom meeting.");
      }
      body.start_time = startTime.toISOString();
    }
    if (meeting.durationMinutes) body.duration = Number(meeting.durationMinutes);
    if (meeting.timezone) body.timezone = meeting.timezone;

    await this.request(`/meetings/${encodeURIComponent(meeting.externalMeetingId)}`, {
      method: "PATCH",
      body,
    });

    return { ...meeting, status: "ready", updatedAt: new Date().toISOString() };
  }

  async getJoinUrl(meeting) {
    const joinUrl = meeting?.joinUrl || meeting?.providerDetails?.joinUrl;
    if (!joinUrl) {
      throw new Error("No Zoom join URL is available for this meeting.");
    }
    return joinUrl;
  }

  async deleteMeeting(meeting) {
    const meetingId = typeof meeting === "string" ? meeting : meeting?.externalMeetingId;
    if (!meetingId) {
      throw new Error("A Zoom meeting ID is required to delete a meeting.");
    }

    await this.request(`/meetings/${encodeURIComponent(meetingId)}`, { method: "DELETE" });
  }
}

function createVideoProvider(provider = "zoom", config = {}) {
  if (provider === "zoom") {
    return new ZoomMeetingProvider(config);
  }

  throw new Error(`Unsupported video provider: ${provider}`);
}

module.exports = {
  VideoProvider,
  ZoomMeetingProvider,
  createVideoProvider,
};
