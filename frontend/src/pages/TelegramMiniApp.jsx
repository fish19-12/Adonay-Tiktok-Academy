import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  GraduationCap,
  House,
  LoaderCircle,
  Mail,
  MessageCircle,
  Search,
  UserRound,
  Video,
  X,
} from "lucide-react";
import api from "../services/api.js";
import logo from "../assets/images/logo.jpg";
import "./TelegramMiniApp.css";

const academyUrl = "https://www.adonaytiktokacademy.com";
const faqItems = [
  {
    question: "What is Adonay TikTok Academy?",
    answer:
      "A practical learning platform focused on TikTok, short-form content, personal branding, digital presence, and content strategy.",
  },
  {
    question: "What training is currently available?",
    answer:
      "Real Estate Agency Training is currently available for registration. Other programs are announced when registration opens.",
  },
  {
    question: "Do I need previous TikTok experience?",
    answer:
      "No. Programs are designed to be practical and understandable for learners at different levels.",
  },
  {
    question: "Is the training online or in person?",
    answer:
      "The format depends on the program. The currently available Real Estate Agency Training is face-to-face; online options are planned for selected programs.",
  },
];

const emptyRegistration = {
  name: "",
  phone: "",
  email: "",
  hasTikTok: "yes",
  tiktokUsername: "",
  tiktokProfileLink: "",
  followers: "",
  trainingType: "In-person / Face-to-face",
};

function formatDate(value) {
  if (!value) return "Schedule to be announced";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Schedule to be announced";
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function MiniAppRegistration({ course, onClose, identity }) {
  const [form, setForm] = useState(() => ({
    ...emptyRegistration,
    name: identity
      ? [identity.first_name, identity.last_name].filter(Boolean).join(" ")
      : "",
    trainingType: course?.title || emptyRegistration.trainingType,
  }));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [paymentOptions, setPaymentOptions] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cbe");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

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

  const update = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        ...form,
        hasTikTok: form.hasTikTok === "yes",
        followers:
          form.hasTikTok === "yes" ? Number(form.followers) : undefined,
      };
      if (form.hasTikTok !== "yes") {
        delete payload.tiktokUsername;
        delete payload.tiktokProfileLink;
      }
      const registrationData = new FormData();
      Object.entries({ ...payload, paymentMethod }).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          registrationData.append(key, String(value));
        }
      });
      const telegramInitData = window.Telegram?.WebApp?.initData;
      if (telegramInitData) {
        registrationData.append("telegramInitData", telegramInitData);
      }
      registrationData.append("paymentScreenshot", paymentScreenshot);
      const { data } = await api.post("/register", registrationData);
      setSuccess(
        data.message ||
          "Your payment proof is with academy support for review.",
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Registration could not be submitted. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="mini-modal-scrim"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="mini-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-title"
      >
        <div className="mini-modal-heading">
          <div>
            <span className="mini-eyebrow">ACADEMY APPLICATION</span>
            <h2 id="registration-title">Register for training</h2>
          </div>
          <button
            type="button"
            className="mini-icon-button"
            aria-label="Close registration"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="mini-success-panel" role="status">
            <span className="mini-success-icon">
              <Check size={20} />
            </span>
            <h3>Registration received</h3>
            <p>{success}</p>
            <button
              className="mini-button mini-button-primary"
              type="button"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <form className="mini-form" onSubmit={submit}>
            <label>
              Full name
              <input
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={update}
              />
            </label>
            <div className="mini-form-row">
              <label>
                Phone number
                <input
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={update}
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update}
                />
              </label>
            </div>
            <label>
              Do you have a TikTok account?
              <select name="hasTikTok" value={form.hasTikTok} onChange={update}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            {form.hasTikTok === "yes" && (
              <div className="mini-form-row">
                <label>
                  TikTok username
                  <input
                    name="tiktokUsername"
                    autoComplete="off"
                    required
                    value={form.tiktokUsername}
                    onChange={update}
                    placeholder="@username"
                  />
                </label>
                <label>
                  Profile link
                  <input
                    name="tiktokProfileLink"
                    type="url"
                    required
                    value={form.tiktokProfileLink}
                    onChange={update}
                    placeholder="https://tiktok.com/@..."
                  />
                </label>
                <label className="mini-field-full">
                  Follower count
                  <input
                    name="followers"
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={form.followers}
                    onChange={update}
                  />
                </label>
              </div>
            )}
            <section
              className="mini-payment-section"
              aria-labelledby="mini-payment-title"
            >
              <div className="mini-payment-heading">
                <h3 id="mini-payment-title">Payment</h3>
                <strong>{paymentOptions?.amountEtb || "..."} ETB</strong>
              </div>
              {paymentOptions?.configured ? (
                <>
                  <div className="mini-payment-options">
                    {[
                      ["cbe", paymentOptions.methods.cbe],
                      ["telebirr", paymentOptions.methods.telebirr],
                    ].map(([method, details]) => (
                      <label key={method}>
                        <span>
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === method}
                            onChange={() => setPaymentMethod(method)}
                          />
                          {details.label}
                        </span>
                        <small>{details.accountName}</small>
                        <b>{details.accountNumber || details.phoneNumber}</b>
                      </label>
                    ))}
                  </div>
                  <label className="mini-receipt-upload">
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
                  {!paymentOptions.reviewReady && (
                    <p className="mini-form-error" role="status">
                      {paymentOptions.reviewStatus ===
                      "reviewers_not_configured"
                        ? "Academy support reviewers are not configured yet. Please contact support."
                        : paymentOptions.reviewStatus === "bot_not_configured"
                          ? "Academy support is setting up payment review. Please try again later."
                          : paymentOptions.reviewStatus === "polling_conflict"
                            ? "The support bot is already polling from another server. Academy support must stop the duplicate bot process."
                            : paymentOptions.reviewStatus ===
                                "bot_token_invalid"
                              ? "The Telegram bot token configured on the backend is invalid. Academy support must update it in Render."
                              : paymentOptions.reviewStatus ===
                                  "bot_connection_failed"
                                ? "The backend cannot connect to Telegram. Academy support must check the bot logs and network."
                                : "The support bot is reconnecting. This page will retry automatically."}
                    </p>
                  )}
                </>
              ) : (
                <p className="mini-form-error">
                  Payment details are temporarily unavailable. Please contact
                  academy support.
                </p>
              )}
            </section>
            <p className="mini-privacy-note">
              Your receipt will be sent to academy support for review.
              We&apos;ll email you when the review is complete.
            </p>
            {error && (
              <p className="mini-form-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="mini-button mini-button-primary mini-submit"
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
                  <LoaderCircle className="mini-spin" size={17} /> Sending...
                </>
              ) : (
                <>
                  Submit registration <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

function WebinarRegistration({ webinar, identity, onClose }) {
  const [name, setName] = useState(
    identity
      ? [identity.first_name, identity.last_name].filter(Boolean).join(" ")
      : "",
  );
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const submit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "", success: "" });
    try {
      const { data } = await api.post(
        `/webinars/${webinar.slug || webinar._id}/register`,
        { name, email },
      );
      setStatus({
        loading: false,
        error: "",
        success: data.message || "Check your email for the next step.",
      });
    } catch (error) {
      setStatus({
        loading: false,
        error:
          error.response?.data?.message ||
          "Webinar registration could not be completed.",
        success: "",
      });
    }
  };

  return (
    <div
      className="mini-modal-scrim"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="mini-modal mini-modal-compact"
        role="dialog"
        aria-modal="true"
        aria-labelledby="webinar-register-title"
      >
        <div className="mini-modal-heading">
          <div>
            <span className="mini-eyebrow">WEBINAR</span>
            <h2 id="webinar-register-title">Reserve a place</h2>
          </div>
          <button
            type="button"
            className="mini-icon-button"
            aria-label="Close webinar registration"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        {status.success ? (
          <div className="mini-success-panel" role="status">
            <span className="mini-success-icon">
              <Check size={20} />
            </span>
            <p>{status.success}</p>
            <button
              className="mini-button mini-button-primary"
              type="button"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <form className="mini-form" onSubmit={submit}>
            <p className="mini-modal-context">{webinar.title}</p>
            <label>
              Full name
              <input
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label>
              Email address
              <input
                autoComplete="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            {status.error && (
              <p className="mini-form-error" role="alert">
                {status.error}
              </p>
            )}
            <button
              className="mini-button mini-button-primary mini-submit"
              type="submit"
              disabled={status.loading}
            >
              {status.loading ? "Sending..." : "Register for webinar"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

export default function TelegramMiniApp() {
  const [searchParams] = useSearchParams();
  const startScreen =
    searchParams.get("screen") ||
    window.Telegram?.WebApp?.initDataUnsafe?.start_param ||
    "home";
  const initialScreen = startScreen === "register" ? "training" : startScreen;
  const allowedScreens = ["home", "training", "webinars", "faq", "profile"];
  const [screen, setScreen] = useState(
    allowedScreens.includes(initialScreen) ? initialScreen : "home",
  );
  const [identity, setIdentity] = useState(null);
  const [identityStatus, setIdentityStatus] = useState(() => {
    const webApp = window.Telegram?.WebApp;
    return !webApp ? "standalone" : webApp.initData ? "loading" : "unavailable";
  });
  const [trainings, setTrainings] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [registrationCourse, setRegistrationCourse] = useState(null);
  const [registrationOpen, setRegistrationOpen] = useState(
    startScreen === "register",
  );
  const [registrationWebinar, setRegistrationWebinar] = useState(null);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return undefined;
    webApp.ready();
    webApp.expand();
    if (webApp.isVersionAtLeast?.("6.1")) {
      webApp.setHeaderColor?.("#0c1117");
      webApp.setBackgroundColor?.("#090d12");
    }
    if (webApp.isVersionAtLeast?.("7.10")) {
      webApp.setBottomBarColor?.("#0c1117");
    }
    const initData = webApp.initData;
    if (!initData) return undefined;

    api
      .post("/telegram/identity", { initData })
      .then(({ data }) => {
        setIdentity(data.user);
        setIdentityStatus("verified");
      })
      .catch(() => setIdentityStatus("invalid"));
    return undefined;
  }, []);

  useEffect(() => {
    let active = true;
    Promise.allSettled([
      api.get("/telegram/programs"),
      api.get("/training"),
      api.get("/webinars"),
    ])
      .then(([programResult, trainingResult, webinarResult]) => {
        if (!active) return;
        const programData =
          programResult.status === "fulfilled" ? programResult.value.data : [];
        const trainingData =
          trainingResult.status === "fulfilled"
            ? trainingResult.value.data
            : [];
        const webinarData =
          webinarResult.status === "fulfilled" ? webinarResult.value.data : [];
        const academyPrograms = Array.isArray(programData) ? programData : [];
        const existingTrainings = Array.isArray(trainingData)
          ? trainingData
          : trainingData?.trainings || [];
        const knownTitles = new Set(
          academyPrograms.map((program) => program.title.toLowerCase()),
        );
        setTrainings([
          ...academyPrograms,
          ...existingTrainings.filter(
            (training) => !knownTitles.has(training.title.toLowerCase()),
          ),
        ]);
        const publicWebinars = Array.isArray(webinarData) ? webinarData : [];
        setWebinars(
          publicWebinars.filter((item) =>
            ["scheduled", "live"].includes(item.status),
          ),
        );
        setLoadError(
          [programResult, trainingResult, webinarResult].every(
            (result) => result.status === "rejected",
          )
            ? "Academy information could not be loaded. Check your connection and try again."
            : "",
        );
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const filteredTrainings = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return trainings;
    return trainings.filter((item) =>
      `${item.title} ${item.description} ${item.level}`
        .toLowerCase()
        .includes(query),
    );
  }, [search, trainings]);

  const upcomingWebinars = useMemo(
    () =>
      [...webinars].sort(
        (left, right) =>
          new Date(left.scheduledAt || 0) - new Date(right.scheduledAt || 0),
      ),
    [webinars],
  );

  const navItems = [
    { id: "home", label: "Home", icon: <House size={19} /> },
    { id: "training", label: "Training", icon: <GraduationCap size={19} /> },
    { id: "webinars", label: "Webinars", icon: <Video size={19} /> },
    { id: "faq", label: "FAQ", icon: <CircleHelp size={19} /> },
    { id: "profile", label: "Profile", icon: <UserRound size={19} /> },
  ];

  const requestTraining = (training) => {
    setRegistrationCourse(training || null);
    setRegistrationOpen(true);
    setRegistrationWebinar(null);
  };

  return (
    <div className="mini-app-root">
      <header className="mini-topbar">
        <a
          className="mini-brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            setScreen("home");
          }}
        >
          <img src={logo} alt="Adonay TikTok Academy" />
          <span>
            <strong>ADONAY</strong>
            <small>TIKTOK ACADEMY</small>
          </span>
        </a>
        <a
          className="mini-top-link"
          href={`${academyUrl}/about`}
          target="_blank"
          rel="noreferrer"
          aria-label="About Adonay TikTok Academy"
        >
          About <ArrowRight size={14} />
        </a>
      </header>

      <main className="mini-content">
        {identityStatus === "invalid" && (
          <div className="mini-inline-alert" role="status">
            Telegram session could not be verified. Close and reopen the app
            from the academy bot.
          </div>
        )}
        {loadError && (
          <div className="mini-inline-alert" role="alert">
            {loadError}
            <button type="button" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        )}

        {screen === "home" && (
          <>
            <section className="mini-home-hero">
              <div className="mini-home-copy">
                <span className="mini-eyebrow">
                  <i /> PRACTICAL DIGITAL LEARNING
                </span>
                <h1>
                  Learn.
                  <br />
                  <em>Create.</em>
                  <br />
                  Grow.
                </h1>
                <p>
                  {identity?.first_name
                    ? `Welcome back, ${identity.first_name}. `
                    : "Build practical skills through content, strategy, and education. "}
                  Make your digital presence more intentional.
                </p>
                <button
                  type="button"
                  className="mini-button mini-button-primary"
                  onClick={() => setScreen("training")}
                >
                  Explore training <ArrowRight size={17} />
                </button>
              </div>
              <div className="mini-hero-mark" aria-hidden="true">
                <span>A</span>
                <b>01</b>
                <small>
                  CONTENT
                  <br />
                  STRATEGY
                </small>
              </div>
            </section>

            <section className="mini-section-block">
              <div className="mini-section-title">
                <div>
                  <span className="mini-eyebrow">YOUR NEXT MOVE</span>
                  <h2>Training programs</h2>
                </div>
                <button
                  type="button"
                  className="mini-text-link"
                  onClick={() => setScreen("training")}
                >
                  See all <ArrowRight size={15} />
                </button>
              </div>
              {loading ? (
                <LoadingRows />
              ) : trainings.length ? (
                <div className="mini-feature-list">
                  {trainings.slice(0, 2).map((training) => (
                    <TrainingRow
                      key={training._id || training.id || training.title}
                      training={training}
                      onRegister={() => requestTraining(training)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No courses published yet"
                  text="Available programs will appear here when the academy publishes them."
                />
              )}
            </section>

            <section className="mini-next-band">
              <div className="mini-next-icon">
                <CalendarDays size={19} />
              </div>
              <div>
                <span className="mini-eyebrow">LIVE LEARNING</span>
                <h2>Upcoming webinars</h2>
                <p>
                  {upcomingWebinars[0]
                    ? upcomingWebinars[0].title
                    : "New sessions will show here when scheduled."}
                </p>
              </div>
              <button
                type="button"
                className="mini-icon-button mini-next-arrow"
                aria-label="View webinars"
                onClick={() => setScreen("webinars")}
              >
                <ArrowRight size={19} />
              </button>
            </section>

            <section className="mini-about-strip">
              <span>LEARN WITH PURPOSE.</span>
              <span>CREATE WITH CONFIDENCE.</span>
              <a href={`${academyUrl}/about`} target="_blank" rel="noreferrer">
                About the academy <ArrowRight size={14} />
              </a>
            </section>
          </>
        )}

        {screen === "training" && (
          <section className="mini-page-section">
            <div className="mini-page-heading">
              <span className="mini-eyebrow">BUILD YOUR SKILLS</span>
              <h1>Training</h1>
              <p>
                Practical programs for content, personal brand, and digital
                growth.
              </p>
            </div>
            <label className="mini-search">
              <Search size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search programs"
                aria-label="Search training programs"
              />
              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                >
                  <X size={16} />
                </button>
              )}
            </label>
            {loading ? (
              <LoadingRows />
            ) : filteredTrainings.length ? (
              <div className="mini-feature-list">
                {filteredTrainings.map((training) => (
                  <TrainingRow
                    key={training._id || training.id || training.title}
                    training={training}
                    onRegister={() => requestTraining(training)}
                    expanded
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title={
                  search ? "No matching programs" : "No courses published yet"
                }
                text={
                  search
                    ? "Try another search term."
                    : "The academy's available programs will appear here."
                }
              />
            )}
            <a
              className="mini-external-link"
              href={`${academyUrl}/services`}
              target="_blank"
              rel="noreferrer"
            >
              Program details on academy website <ArrowRight size={16} />
            </a>
          </section>
        )}

        {screen === "webinars" && (
          <section className="mini-page-section">
            <div className="mini-page-heading">
              <span className="mini-eyebrow">LEARN TOGETHER</span>
              <h1>Webinars</h1>
              <p>Public live sessions from Adonay TikTok Academy.</p>
            </div>
            {loading ? (
              <LoadingRows />
            ) : upcomingWebinars.length ? (
              <div className="mini-webinar-list">
                {upcomingWebinars.map((webinar) => (
                  <article className="mini-webinar-row" key={webinar._id}>
                    <div className="mini-webinar-date">
                      <span>
                        {webinar.status === "live"
                          ? "LIVE"
                          : webinar.scheduledAt
                            ? new Date(webinar.scheduledAt).toLocaleDateString(
                                undefined,
                                { month: "short" },
                              )
                            : "TBD"}
                      </span>
                      <strong>
                        {webinar.status === "live" ? (
                          <Video size={18} />
                        ) : webinar.scheduledAt ? (
                          new Date(webinar.scheduledAt).getDate()
                        ) : (
                          "-"
                        )}
                      </strong>
                    </div>
                    <div className="mini-webinar-info">
                      <span className="mini-status-label">
                        {webinar.status === "live"
                          ? "HAPPENING NOW"
                          : formatDate(webinar.scheduledAt)}
                      </span>
                      <h2>{webinar.title}</h2>
                      <p>{webinar.description}</p>
                      <button
                        className="mini-button mini-button-quiet"
                        type="button"
                        onClick={() => setRegistrationWebinar(webinar)}
                      >
                        Register <ArrowRight size={15} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No upcoming webinars"
                text="There are no public sessions scheduled right now. Check back for new dates."
              />
            )}
          </section>
        )}

        {screen === "faq" && (
          <section className="mini-page-section">
            <div className="mini-page-heading">
              <span className="mini-eyebrow">A FEW QUICK ANSWERS</span>
              <h1>FAQ</h1>
              <p>What to know before you begin.</p>
            </div>
            <div className="mini-faq-list">
              {faqItems.map((item, index) => (
                <article
                  className={`mini-faq-item${openFaq === index ? " is-open" : ""}`}
                  key={item.question}
                >
                  <button
                    type="button"
                    aria-expanded={openFaq === index}
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  >
                    <span>{item.question}</span>
                    <ChevronDown size={18} />
                  </button>
                  {openFaq === index && <p>{item.answer}</p>}
                </article>
              ))}
            </div>
            <a
              className="mini-support-line"
              href="mailto:info@adonaytiktokacademy.com"
            >
              <Mail size={17} />
              <span>
                Still have a question? <strong>Contact the academy</strong>
              </span>
              <ArrowRight size={15} />
            </a>
          </section>
        )}

        {screen === "profile" && (
          <section className="mini-page-section mini-profile-page">
            <div className="mini-page-heading">
              <span className="mini-eyebrow">YOUR ACADEMY SPACE</span>
              <h1>Profile</h1>
              <p>Account details from your Telegram session.</p>
            </div>
            <div className="mini-profile-summary">
              <div className="mini-profile-avatar">
                {identity?.first_name?.slice(0, 1)?.toUpperCase() || (
                  <UserRound size={22} />
                )}
              </div>
              <div>
                <strong>
                  {identity
                    ? [identity.first_name, identity.last_name]
                        .filter(Boolean)
                        .join(" ")
                    : "Telegram profile"}
                </strong>
                <span>
                  {identityStatus === "verified"
                    ? identity.username
                      ? `@${identity.username}`
                      : "Telegram identity verified"
                    : identityStatus === "standalone"
                      ? "Open inside Telegram to verify your identity"
                      : "Identity not available"}
                </span>
              </div>
              <span
                className={`mini-verify-dot${identityStatus === "verified" ? " is-verified" : ""}`}
                title={
                  identityStatus === "verified"
                    ? "Verified Telegram session"
                    : "Not verified"
                }
              />
            </div>
            <div className="mini-profile-row">
              <span>Registration</span>
              <button type="button" onClick={() => requestTraining(null)}>
                Apply for training <ArrowRight size={15} />
              </button>
            </div>
            <div className="mini-profile-row">
              <span>Payment status</span>
              <span className="mini-not-available">Not connected</span>
            </div>
            <p className="mini-profile-note">
              This app currently supports browsing and registration. Payment
              review and course access are not shown here yet.
            </p>
            <a
              className="mini-support-line"
              href="mailto:info@adonaytiktokacademy.com"
            >
              <MessageCircle size={17} />
              <span>
                Need help? <strong>Contact support</strong>
              </span>
              <ArrowRight size={15} />
            </a>
          </section>
        )}
      </main>

      <nav className="mini-bottom-nav" aria-label="Academy navigation">
        {navItems.map(({ id, label, icon }) => (
          <button
            type="button"
            className={screen === id ? "is-active" : ""}
            key={id}
            onClick={() => setScreen(id)}
            aria-current={screen === id ? "page" : undefined}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {registrationOpen && (
        <MiniAppRegistration
          course={registrationCourse}
          identity={identity}
          onClose={() => setRegistrationOpen(false)}
        />
      )}
      {!registrationOpen && registrationWebinar && (
        <WebinarRegistration
          webinar={registrationWebinar}
          identity={identity}
          onClose={() => setRegistrationWebinar(null)}
        />
      )}
    </div>
  );
}

function TrainingRow({ training, onRegister, expanded = false }) {
  const available = training.status !== "coming_soon";
  return (
    <article className={`mini-training-row${expanded ? " is-expanded" : ""}`}>
      {training.thumbnail ? (
        <img
          className="mini-training-image"
          src={training.thumbnail}
          alt=""
          loading="lazy"
        />
      ) : (
        <div className="mini-training-image mini-training-placeholder">
          <GraduationCap size={24} />
        </div>
      )}
      <div className="mini-training-info">
        <span className="mini-status-label">
          {training.status === "coming_soon"
            ? "COMING SOON"
            : training.status === "available"
              ? "AVAILABLE NOW"
              : training.level || "ACADEMY PROGRAM"}
        </span>
        <h3>{training.title}</h3>
        <p>{training.description}</p>
        {training.audience && (
          <div className="mini-training-meta">
            <span>{training.audience}</span>
          </div>
        )}
        {(training.duration || expanded) && (
          <div className="mini-training-meta">
            {training.duration && (
              <span>
                <Clock3 size={14} />
                {training.duration}
              </span>
            )}
            {training.level && <span>{training.level}</span>}
          </div>
        )}
        <button
          type="button"
          className="mini-button mini-button-quiet"
          onClick={onRegister}
          disabled={!available}
        >
          {available ? "Register interest" : "Coming soon"}
          {available && <ArrowRight size={15} />}
        </button>
      </div>
    </article>
  );
}

function LoadingRows() {
  return (
    <div className="mini-loading-list" aria-label="Loading">
      <span />
      <span />
      <span />
    </div>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="mini-empty-state">
      <span>
        <GraduationCap size={20} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
