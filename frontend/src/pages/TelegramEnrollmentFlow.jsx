import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  LoaderCircle,
  MessageCircle,
  Megaphone,
  Users,
  Video,
} from "lucide-react";
import api from "../services/api.js";
import logo from "../assets/images/logo.jpg";
import "./TelegramEnrollmentFlow.css";

const VIDEO_URL =
  "https://player.mediadelivery.net/play/773543/88acc664-0a03-4c44-ae49-7a22c07a237d";
const SUPPORT_URL = "https://t.me/Adonaytiktokacademysupport";
const WEBINAR_DELAY_MS = 7 * 24 * 60 * 60 * 1000;
const emptyForm = {
  name: "",
  phone: "",
  email: "",
  hasTikTok: "yes",
  tiktokUsername: "",
  tiktokProfileLink: "",
  followers: "",
};

function initialStatusToken() {
  try {
    return (
      window.localStorage.getItem("academy-registration-status-token") || ""
    );
  } catch {
    return "";
  }
}

function TelegramEnrollmentFlow() {
  const [statusToken, setStatusToken] = useState(initialStatusToken);
  const [view, setView] = useState(() =>
    initialStatusToken() ? "status" : "home",
  );
  const [registrationStatus, setRegistrationStatus] = useState("pending");
  const [approvedAt, setApprovedAt] = useState(null);
  const [communityInvites, setCommunityInvites] = useState(null);
  const [clock, setClock] = useState(Date.now());
  const [statusError, setStatusError] = useState(false);
  const [identityError, setIdentityError] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [paymentOptions, setPaymentOptions] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cbe");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return undefined;
    webApp.ready();
    webApp.expand();
    if (webApp.isVersionAtLeast?.("6.1")) {
      webApp.setHeaderColor?.("#faf8f5");
      webApp.setBackgroundColor?.("#faf8f5");
    }
    if (!webApp.initData) return undefined;
    api
      .post("/telegram/identity", { initData: webApp.initData })
      .then(({ data }) => {
        setForm((current) => ({
          ...current,
          name: [data.user.first_name, data.user.last_name]
            .filter(Boolean)
            .join(" "),
        }));
      })
      .catch(() => setIdentityError(true));
    return undefined;
  }, []);

  useEffect(() => {
    let active = true;
    const loadPaymentOptions = () => {
      api
        .get("/register/payment-options")
        .then(({ data }) => {
          if (active) setPaymentOptions(data);
        })
        .catch(() => {
          if (active) setPaymentOptions({ configured: false });
        });
    };
    loadPaymentOptions();
    const timer = window.setInterval(loadPaymentOptions, 15000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!statusToken) return undefined;
    let active = true;
    const checkStatus = async () => {
      try {
        const { data } = await api.get(
          `/register/status/${encodeURIComponent(statusToken)}`,
        );
        if (!active) return;
        setRegistrationStatus(data.status);
        if (data.approvedAt) setApprovedAt(data.approvedAt);
        setCommunityInvites(data.communityInvites || null);
        setStatusError(false);
      } catch (error) {
        if (!active) return;
        if (error.response?.status === 404) {
          try {
            window.localStorage.removeItem("academy-registration-status-token");
          } catch {
            // Storage may be unavailable in restricted webviews.
          }
          setStatusToken("");
          setView("home");
          return;
        }
        setStatusError(true);
      }
    };
    checkStatus();
    const timer = window.setInterval(checkStatus, 15000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [statusToken]);

  useEffect(() => {
    if (view !== "status" || registrationStatus !== "approved") {
      return undefined;
    }
    const timer = window.setInterval(() => setClock(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [view, registrationStatus]);

  const webinarTimeRemaining = approvedAt
    ? Math.max(0, new Date(approvedAt).getTime() + WEBINAR_DELAY_MS - clock)
    : WEBINAR_DELAY_MS;
  const webinarCountdown = {
    days: Math.floor(webinarTimeRemaining / 86400000),
    hours: Math.floor((webinarTimeRemaining % 86400000) / 3600000),
    minutes: Math.floor((webinarTimeRemaining % 3600000) / 60000),
    seconds: Math.floor((webinarTimeRemaining % 60000) / 1000),
  };
  const webinarIsOpen = approvedAt && webinarTimeRemaining === 0;

  const updateForm = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submitRegistration = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const payload = {
        ...form,
        hasTikTok: form.hasTikTok === "yes",
        trainingType: "In-person / Face-to-face",
        followers:
          form.hasTikTok === "yes" ? Number(form.followers) : undefined,
      };
      if (form.hasTikTok !== "yes") {
        delete payload.tiktokUsername;
        delete payload.tiktokProfileLink;
      }
      const registrationData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          registrationData.append(key, String(value));
        }
      });
      registrationData.append("paymentMethod", paymentMethod);
      registrationData.append("paymentScreenshot", paymentScreenshot);
      const { data } = await api.post("/register", registrationData);
      if (!data.statusToken)
        throw new Error(
          "Registration was received but status tracking could not be started. Please contact academy support.",
        );
      try {
        window.localStorage.setItem(
          "academy-registration-status-token",
          data.statusToken,
        );
      } catch {
        // The current session can still track status if storage is unavailable.
      }
      setRegistrationStatus("pending");
      setStatusToken(data.statusToken);
      setView("status");
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          error.message ||
          "Registration could not be submitted. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="academy-mini-flow">
      <header className="academy-mini-header">
        <img src={logo} alt="Adonay TikTok Academy" />
        <span>
          <strong>ADONAY</strong>
          <small>TIKTOK / ACADEMY</small>
        </span>
        {view !== "home" && view !== "status" && (
          <button
            type="button"
            onClick={() => setView("home")}
            aria-label="Back to introduction"
          >
            <ArrowLeft size={19} />
          </button>
        )}
      </header>

      {view === "home" && (
        <main className="academy-mini-hero">
          <div className="academy-mini-kicker">
            <i /> THE ADONAY CREATOR WORKSHOP
          </div>
          <h1>
            Learn what makes people
            <br />
            <em>stop, watch &amp; follow.</em>
          </h1>
          <p className="academy-mini-intro">
            Learn the attention, storytelling and personal branding principles
            behind stronger content.
          </p>
          <div className="academy-mini-video-label">
            <span /> WATCH THIS FIRST <span />
          </div>
          <div className="academy-mini-video">
            <iframe
              src={VIDEO_URL}
              title="The Adonay Creator Workshop"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <h2>
            I don't teach theory.
            <br />
            <em>I teach what I personally use.</em>
          </h2>
          <p className="academy-mini-principle">
            Practical lessons in content, audience growth and personal branding.
          </p>
          <button
            className="academy-mini-cta"
            type="button"
            onClick={() => setView("register")}
          >
            Get Access <ArrowRight size={17} />
          </button>
          <p className="academy-mini-footnote">
            Start with your training application. The academy will review it
            before sharing next steps.
          </p>
        </main>
      )}

      {view === "register" && (
        <main className="academy-mini-register">
          <div className="academy-mini-register-heading">
            <span className="academy-mini-kicker">ADONAY TIKTOK ACADEMY</span>
            <h1>Register for the academy.</h1>
            <p>
              Share your details to register for training with Adonay TikTok
              Academy.
            </p>
          </div>
          {identityError && (
            <div className="academy-mini-warning" role="status">
              Telegram identity could not be confirmed. You can still apply
              using your contact details.
            </div>
          )}
          <form onSubmit={submitRegistration}>
            <label>
              Full name
              <input
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={updateForm}
              />
            </label>
            <div className="academy-mini-fields-two">
              <label>
                Phone number
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={updateForm}
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={updateForm}
                />
              </label>
            </div>
            <label>
              Do you have a TikTok account?
              <select
                name="hasTikTok"
                value={form.hasTikTok}
                onChange={updateForm}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            {form.hasTikTok === "yes" && (
              <div className="academy-mini-fields-two">
                <label>
                  TikTok username
                  <input
                    name="tiktokUsername"
                    required
                    value={form.tiktokUsername}
                    onChange={updateForm}
                    placeholder="@username"
                  />
                </label>
                <label>
                  TikTok profile link
                  <input
                    name="tiktokProfileLink"
                    type="url"
                    required
                    value={form.tiktokProfileLink}
                    onChange={updateForm}
                    placeholder="https://tiktok.com/@..."
                  />
                </label>
                <label className="academy-mini-field-full">
                  Follower count
                  <input
                    name="followers"
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={form.followers}
                    onChange={updateForm}
                  />
                </label>
              </div>
            )}
            <section
              className="academy-mini-payment"
              aria-labelledby="payment-title"
            >
              <div>
                <span className="academy-mini-kicker">PAYMENT</span>
                <h2 id="payment-title">
                  {paymentOptions?.amountEtb
                    ? `Training fee: ${paymentOptions.amountEtb} ETB`
                    : "Payment details"}
                </h2>
              </div>
              {paymentOptions?.configured ? (
                <>
                  <div className="academy-mini-payment-methods">
                    {[
                      ["cbe", paymentOptions.methods.cbe],
                      ["telebirr", paymentOptions.methods.telebirr],
                    ].map(([method, details]) => (
                      <label
                        className={`academy-mini-payment-method ${paymentMethod === method ? "selected" : ""}`}
                        key={method}
                      >
                        <span>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={paymentMethod === method}
                            onChange={() => setPaymentMethod(method)}
                          />
                          <strong>{details.label}</strong>
                        </span>
                        <small>{details.accountName}</small>
                        <b>{details.accountNumber || details.phoneNumber}</b>
                      </label>
                    ))}
                  </div>
                  <label className="academy-mini-receipt-label">
                    Payment screenshot (JPG, PNG, or WEBP)
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      required
                      onChange={(event) =>
                        setPaymentScreenshot(event.target.files?.[0] || null)
                      }
                    />
                  </label>
                  <p className="academy-mini-payment-caption">
                    Your screenshot will be sent to academy support for review.
                  </p>
                  {!paymentOptions.reviewReady && (
                    <p className="academy-mini-warning" role="status">
                      {paymentOptions.reviewStatus ===
                      "reviewers_not_configured"
                        ? "Academy support reviewers are not configured yet. Please contact support."
                        : paymentOptions.reviewStatus === "bot_not_configured"
                          ? "Academy support is setting up payment review. Please try again later."
                          : "The support bot is reconnecting. This page will retry automatically."}
                    </p>
                  )}
                </>
              ) : (
                <p className="academy-mini-warning">
                  Payment details are temporarily unavailable. Please contact
                  academy support.
                </p>
              )}
            </section>
            {formError && (
              <p className="academy-mini-error" role="alert">
                {formError}
              </p>
            )}
            <button
              className="academy-mini-cta academy-mini-submit"
              type="submit"
              disabled={
                submitting ||
                !paymentOptions?.configured ||
                !paymentOptions?.reviewReady ||
                !paymentScreenshot
              }
            >
              {submitting ? (
                <>
                  <LoaderCircle className="academy-mini-spin" size={17} />{" "}
                  Sending application
                </>
              ) : (
                <>
                  Submit application <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>
        </main>
      )}

      {view === "status" && (
        <main className="academy-mini-status-page">
          {registrationStatus === "approved" ? (
            <div className="academy-mini-approved-content">
              <div className="academy-mini-approved-topline">
                <span className="academy-mini-status-icon approved">
                  <Check size={22} />
                </span>
                <span className="academy-mini-approved-badge">
                  APPLICATION APPROVED
                </span>
              </div>
              <span className="academy-mini-kicker">
                WELCOME TO THE ACADEMY
              </span>
              <h1>You&apos;re in. Let&apos;s get ready.</h1>
              <p className="academy-mini-approved-intro">
                Your payment is verified and your place is confirmed. Your live
                webinar experience opens in seven days.
              </p>
              <section
                className={`academy-mini-webinar-countdown ${webinarIsOpen ? "is-open" : ""}`}
                aria-live="polite"
              >
                <div className="academy-mini-webinar-heading">
                  <span className="academy-mini-webinar-icon">
                    {webinarIsOpen ? (
                      <Video size={19} />
                    ) : (
                      <CalendarDays size={19} />
                    )}
                  </span>
                  <div>
                    <span className="academy-mini-kicker">
                      {webinarIsOpen ? "LIVE WEBINAR" : "YOUR COUNTDOWN"}
                    </span>
                    <h2>
                      {webinarIsOpen
                        ? "Your webinar is ready"
                        : "Live webinar opens in"}
                    </h2>
                  </div>
                </div>
                {webinarIsOpen ? (
                  <p className="academy-mini-webinar-open-copy">
                    Your seven-day countdown is complete. You can now access the
                    live webinar learning from the Academy App.
                  </p>
                ) : (
                  <div className="academy-mini-countdown-grid">
                    {Object.entries(webinarCountdown).map(([unit, value]) => (
                      <div className="academy-mini-countdown-unit" key={unit}>
                        <strong>{String(value).padStart(2, "0")}</strong>
                        <span>{unit}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="academy-mini-countdown-note">
                  <Clock3 size={14} />
                  <span>Counting down from your approval time</span>
                </div>
              </section>
              <section
                className="academy-mini-community"
                aria-labelledby="community-title"
              >
                <div className="academy-mini-community-heading">
                  <span className="academy-mini-community-icon">
                    <Users size={17} />
                  </span>
                  <div>
                    <h2 id="community-title">Your Academy community</h2>
                    <p>Connect with learners and access course resources</p>
                  </div>
                </div>
                {communityInvites?.studentGroupUrl && (
                  <a
                    className="academy-mini-community-link"
                    href={communityInvites.studentGroupUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="academy-mini-community-link-icon">
                      <Users size={17} />
                    </span>
                    <span>
                      <strong>Join Student Community</strong>
                      <small>Chat and share ideas with other students</small>
                    </span>
                    <ExternalLink size={16} />
                  </a>
                )}
                {communityInvites?.announcementsUrl && (
                  <a
                    className="academy-mini-community-link"
                    href={communityInvites.announcementsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="academy-mini-community-link-icon announcements">
                      <Megaphone size={17} />
                    </span>
                    <span>
                      <strong>Follow Academy Updates</strong>
                      <small>Get learning resources and academy updates</small>
                    </span>
                    <ExternalLink size={16} />
                  </a>
                )}
                {!communityInvites?.studentGroupUrl && (
                  <p className="academy-mini-community-unavailable">
                    {communityInvites?.studentGroupStatus ===
                    "permission_required"
                      ? "The Academy bot needs permission to create an invite for the student group. Please contact support."
                      : communityInvites?.studentGroupStatus ===
                          "not_configured"
                        ? "The student-group button needs its numeric Telegram chat ID configured on the backend. Academy support can find it in Telegram chat diagnostics."
                        : "The student group invite is temporarily unavailable. Please reopen this screen shortly."}
                  </p>
                )}
                {!communityInvites?.announcementsUrl && (
                  <p className="academy-mini-community-unavailable">
                    {communityInvites?.announcementsStatus ===
                    "permission_required"
                      ? "The Academy bot needs permission to create an invite for the learning resources channel. Please contact support."
                      : communityInvites?.announcementsStatus ===
                          "not_configured"
                        ? "The learning-channel button needs its numeric Telegram chat ID configured on the backend. Academy support can find it in Telegram chat diagnostics."
                        : "The learning resources channel invite is temporarily unavailable. Please reopen this screen shortly."}
                  </p>
                )}
              </section>
              <p className="academy-mini-approved-footnote">
                We&apos;ve also sent your approval details to your email.
              </p>
            </div>
          ) : registrationStatus === "rejected" ? (
            <div className="academy-mini-status-content">
              <span className="academy-mini-status-icon rejected">
                <MessageCircle size={22} />
              </span>
              <span className="academy-mini-kicker">APPLICATION REVIEW</span>
              <h1>Please contact the academy.</h1>
              <p>
                The academy could not approve this application. Contact the
                support team to understand the next step.
              </p>
              <a
                className="academy-mini-cta"
                href={SUPPORT_URL}
                target="_blank"
                rel="noreferrer"
              >
                Contact Support <ArrowRight size={17} />
              </a>
            </div>
          ) : (
            <div className="academy-mini-status-content">
              <span className="academy-mini-status-icon pending">
                <Clock3 size={23} />
              </span>
              <span className="academy-mini-kicker">APPLICATION RECEIVED</span>
              <h1>We’re reviewing your application.</h1>
              <p>
                Your payment screenshot has been sent to academy support. This
                screen will update after they verify it.
              </p>
              <div className="academy-mini-review-state">
                <span />
                <div>
                  <strong>Pending academy review</strong>
                  <small>
                    {statusError
                      ? "Connection interrupted. We’ll keep checking."
                      : "Status checks automatically"}
                  </small>
                </div>
                <LoaderCircle size={17} className="academy-mini-spin" />
              </div>
              <p className="academy-mini-status-small">
                Group and channel invitations are available after approval.
              </p>
              <a
                className="academy-mini-support-link"
                href={SUPPORT_URL}
                target="_blank"
                rel="noreferrer"
              >
                Questions? Contact support <ArrowRight size={14} />
              </a>
            </div>
          )}
        </main>
      )}

      <footer className="academy-mini-footer">
        ADONAY TIKTOK ACADEMY <span>·</span> LEARN. CREATE. GROW.
      </footer>
    </div>
  );
}

export default TelegramEnrollmentFlow;
