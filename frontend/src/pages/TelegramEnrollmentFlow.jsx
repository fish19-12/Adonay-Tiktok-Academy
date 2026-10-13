import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  ExternalLink,
  LoaderCircle,
  MessageCircle,
  Megaphone,
  ShieldCheck,
  Users,
} from "lucide-react";
import api from "../services/api.js";
import logo from "../assets/images/logo.jpg";
import "./TelegramEnrollmentFlow.css";

const VIDEO_URL =
  "https://player.mediadelivery.net/play/773543/88acc664-0a03-4c44-ae49-7a22c07a237d";
const SUPPORT_URL = "https://t.me/Adonaytiktokacademysupport";
const STUDENT_GROUP_URL =
  import.meta.env.VITE_TELEGRAM_STUDENT_GROUP_URL ||
  "https://t.me/+KRece_7cHLZlOTJk";
const ANNOUNCEMENTS_URL =
  import.meta.env.VITE_TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL ||
  "https://t.me/+6m8OBjwrEgUxMzk0";
const emptyForm = {
  name: "",
  phone: "",
  email: "",
  realEstateCompany: "",
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
  const [statusError, setStatusError] = useState(false);
  const [identityError, setIdentityError] = useState(false);
  const [form, setForm] = useState(emptyForm);
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
    if (!statusToken) return undefined;
    let active = true;
    const checkStatus = async () => {
      try {
        const { data } = await api.get(
          `/register/status/${encodeURIComponent(statusToken)}`,
        );
        if (!active) return;
        setRegistrationStatus(data.status);
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
      const { data } = await api.post("/register", payload);
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
            <span className="academy-mini-kicker">YOUR NEXT STEP</span>
            <h1>Apply for training.</h1>
            <p>
              Complete your application for Real Estate Agency Training. The
              academy will review your details.
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
              Real estate company or agency
              <input
                name="realEstateCompany"
                required
                value={form.realEstateCompany}
                onChange={updateForm}
              />
            </label>
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
            <div className="academy-mini-payment-note">
              <ShieldCheck size={18} />
              <p>
                <strong>Payment is not collected in this application.</strong>{" "}
                Telegram requires Stars for digital course purchases inside its
                apps. Do not send a bank transfer or receipt through this
                screen. The academy will share the permitted next steps after
                reviewing your application.
              </p>
            </div>
            {formError && (
              <p className="academy-mini-error" role="alert">
                {formError}
              </p>
            )}
            <button
              className="academy-mini-cta academy-mini-submit"
              type="submit"
              disabled={submitting}
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
            <div className="academy-mini-status-content">
              <span className="academy-mini-status-icon approved">
                <Check size={23} />
              </span>
              <span className="academy-mini-kicker">APPLICATION REVIEW</span>
              <h1>Your application is approved.</h1>
              <p>
                The academy has approved your registration. The next-step
                information will be sent to the email address you provided.
              </p>
              <p className="academy-mini-status-small">
                Course access and payment are not provided by this status
                screen.
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
                Your registration is safely with the academy team. This screen
                will update when the review is complete.
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
              <section
                className="academy-mini-community"
                aria-labelledby="community-title"
              >
                <div className="academy-mini-community-heading">
                  <span className="academy-mini-community-icon">
                    <Users size={17} />
                  </span>
                  <div>
                    <h2 id="community-title">Stay connected while we review</h2>
                    <p>These community spaces are open to you now.</p>
                  </div>
                </div>
                <a
                  className="academy-mini-community-link"
                  href={STUDENT_GROUP_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="academy-mini-community-link-icon">
                    <Users size={17} />
                  </span>
                  <span>
                    <strong>Join Student Community</strong>
                    <small>Meet the academy community on Telegram</small>
                  </span>
                  <ExternalLink size={16} />
                </a>
                <a
                  className="academy-mini-community-link"
                  href={ANNOUNCEMENTS_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="academy-mini-community-link-icon announcements">
                    <Megaphone size={17} />
                  </span>
                  <span>
                    <strong>Follow Academy Updates</strong>
                    <small>Announcements, news, and next steps</small>
                  </span>
                  <ExternalLink size={16} />
                </a>
              </section>
              <p className="academy-mini-status-small">
                You can join the community now. Training access is provided
                separately after your application is approved.
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
