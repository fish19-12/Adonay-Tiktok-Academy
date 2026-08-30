import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  GraduationCap,
  Link2,
  Loader2,
  Mail,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  UserRound,
  Video,
} from "lucide-react";

/* =========================================================
   SEMINAR CONFIGURATION
   ========================================================= */

const SEMINAR_WEEKDAY = 3; // Wednesday
const SEMINAR_HOUR = 19; // 7:00 PM
const SEMINAR_MINUTE = 0;

// Add your actual Zoom / Google Meet / YouTube Live URL here.
const LIVE_SEMINAR_URL = "";

/*
 * IMPORTANT:
 * This key is what makes the student's registration survive
 * navigation and browser refresh.
 */
const REGISTRATION_STORAGE_KEY = "adonay_tiktok_academy_registration";

/* =========================================================
   INITIAL FORM
   ========================================================= */

const initialForm = {
  name: "",
  phone: "",
  email: "",
  hasTikTok: "",
  tiktokUsername: "",
  tiktokProfileLink: "",
  followers: "",
  realEstateCompany: "",
};

/* =========================================================
   SEMINAR DATE HELPERS
   ========================================================= */

function getNextWednesday() {
  const now = new Date();
  const target = new Date(now);

  let daysUntil = (SEMINAR_WEEKDAY - now.getDay() + 7) % 7;

  /*
   * If today is Wednesday but the seminar time
   * has already passed, use next Wednesday.
   */
  if (daysUntil === 0) {
    const seminarToday = new Date(now);

    seminarToday.setHours(SEMINAR_HOUR, SEMINAR_MINUTE, 0, 0);

    if (now >= seminarToday) {
      daysUntil = 7;
    }
  }

  target.setDate(target.getDate() + daysUntil);

  target.setHours(SEMINAR_HOUR, SEMINAR_MINUTE, 0, 0);

  return target;
}

function getRemaining(target) {
  const difference = target.getTime() - Date.now();

  if (difference <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const totalSeconds = Math.floor(difference / 1000);

  return {
    total: difference,

    days: Math.floor(totalSeconds / 86400),

    hours: Math.floor((totalSeconds % 86400) / 3600),

    minutes: Math.floor((totalSeconds % 3600) / 60),

    seconds: totalSeconds % 60,
  };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

/* =========================================================
   MAIN REGISTER PAGE
   ========================================================= */

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm);

  const [submitting, setSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [registrationData, setRegistrationData] = useState(null);

  const [error, setError] = useState("");

  /*
   * Restore registration when the student returns
   * to this page.
   */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(REGISTRATION_STORAGE_KEY);

      if (!saved) {
        return;
      }

      const parsed = JSON.parse(saved);

      if (parsed && typeof parsed === "object") {
        setRegistrationData(parsed);
        setSubmitted(true);
      }
    } catch (restoreError) {
      console.error("Could not restore registration:", restoreError);
    }
  }, []);

  const hasTikTokAccount = form.hasTikTok === "yes";

  /* =======================================================
     UPDATE FIELD
     ======================================================= */

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /* =======================================================
     VALIDATION
     ======================================================= */

  const validateForm = () => {
    if (!form.name.trim()) {
      return "Please enter your full name.";
    }

    if (!form.phone.trim()) {
      return "Please enter your phone number.";
    }

    if (!form.email.trim()) {
      return "Please enter your email address.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email.trim())) {
      return "Please enter a valid email address.";
    }

    if (!form.realEstateCompany.trim()) {
      return "Please enter your real estate company or agency.";
    }

    if (!form.hasTikTok) {
      return "Please select whether you have a TikTok account.";
    }

    if (hasTikTokAccount) {
      if (!form.tiktokUsername.trim()) {
        return "Please enter your TikTok username.";
      }

      if (!form.tiktokProfileLink.trim()) {
        return "Please enter your TikTok profile link.";
      }

      const followerCount = Number(form.followers);

      if (
        form.followers === "" ||
        !Number.isInteger(followerCount) ||
        followerCount < 0
      ) {
        return "Please enter your exact TikTok follower count.";
      }
    }

    return "";
  };

  /* =======================================================
     SUBMIT
     ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),

        phone: form.phone.trim(),

        email: form.email.trim().toLowerCase(),

        hasTikTok: hasTikTokAccount,

        tiktokUsername: hasTikTokAccount ? form.tiktokUsername.trim() : null,

        tiktokProfileLink: hasTikTokAccount
          ? form.tiktokProfileLink.trim()
          : null,

        followers: hasTikTokAccount ? Number(form.followers) : null,

        realEstateCompany: form.realEstateCompany.trim(),

        trainingType: "In-person / Face-to-face",
      };

      const response = await api.post("/register", payload);

      const data = response?.data;

      const savedRegistration = data?.registration || {
        ...payload,
        status: "pending",
      };

      /*
       * SAVE THE STUDENT REGISTRATION.
       *
       * This is the important part.
       * React state alone disappears when navigating.
       */
      localStorage.setItem(
        REGISTRATION_STORAGE_KEY,
        JSON.stringify(savedRegistration),
      );

      setRegistrationData(savedRegistration);

      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (submissionError) {
      console.error("Registration submission failed:", submissionError);

      const message =
        submissionError?.response?.data?.message ||
        "Registration could not be completed. Please try again.";

      setError(message);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* =======================================================
     SUCCESS SCREEN
     ======================================================= */

  if (submitted) {
    return <SuccessScreen registration={registrationData} />;
  }

  /* =======================================================
     REGISTER FORM
     ======================================================= */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f7ff] text-[#171a35]">
      <PageBackground />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="relative z-20 border-b border-white/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <BrandMark />

            <div className="leading-none">
              <p className="text-sm font-black tracking-tight text-[#171a35]">
                Adonay
              </p>

              <p className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#858ba3]">
                TikTok Academy
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-xl border border-[#e1e4f1] bg-white/80 px-3.5 py-2.5 text-[10px] font-extrabold text-[#747a92] shadow-sm transition hover:-translate-y-0.5 hover:border-[#cfcafc] hover:text-[#5849db]"
          >
            <ArrowLeft
              size={13}
              className="transition-transform group-hover:-translate-x-0.5"
            />

            <span className="hidden sm:inline">Academy Home</span>

            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pt-12">
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="lg:sticky lg:top-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ded9ff] bg-white/80 px-3.5 py-2 shadow-sm">
              <Sparkles size={13} className="text-[#6856e9]" />

              <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#6254d5]">
                Academy Registration
              </span>
            </div>

            <h1 className="mt-5 max-w-xl text-4xl font-black leading-[1.02] tracking-[-0.055em] text-[#171a35] sm:text-5xl">
              Start your
              <span className="block bg-gradient-to-r from-[#5547e7] via-[#874ff4] to-[#12bddd] bg-clip-text text-transparent">
                TikTok journey.
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-6 text-[#7c8299]">
              Register for Adonay TikTok Academy and get access to the weekly
              live training session.
            </p>

            {/* LIVE SEMINAR PREVIEW */}

            <SeminarPreview />
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <div className="relative">
            <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-r from-[#6654e9]/10 via-[#a451f3]/10 to-[#10c8e3]/10 blur-xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-white bg-white/95 shadow-[0_25px_80px_rgba(55,61,120,0.12)]">
              <div className="h-1.5 bg-gradient-to-r from-[#5547e7] via-[#8b4ff2] to-[#12c8e6]" />

              <div className="p-5 sm:p-7 lg:p-8">
                {/* FORM HEADER */}

                <div className="mb-7">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#999eb2]">
                    Step 1
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#191c35]">
                    Create your registration
                  </h2>

                  <p className="mt-1.5 text-xs leading-5 text-[#8a8fa4]">
                    Enter your details below. It only takes a minute.
                  </p>
                </div>

                {/* ERROR */}

                {error && (
                  <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">
                    <AlertCircle
                      size={17}
                      className="mt-0.5 shrink-0 text-red-500"
                    />

                    <p className="text-xs font-semibold leading-5 text-red-600">
                      {error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* BASIC INFORMATION */}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField
                      label="Full name"
                      icon={UserRound}
                      value={form.name}
                      onChange={(value) => updateField("name", value)}
                      placeholder="Your full name"
                      required
                    />

                    <InputField
                      label="Phone number"
                      icon={Phone}
                      type="tel"
                      value={form.phone}
                      onChange={(value) => updateField("phone", value)}
                      placeholder="+251 ..."
                      required
                    />
                  </div>

                  <InputField
                    label="Email address"
                    icon={Mail}
                    type="email"
                    value={form.email}
                    onChange={(value) => updateField("email", value)}
                    placeholder="you@example.com"
                    required
                  />

                  <InputField
                    label="Real estate company / agency"
                    icon={Building2}
                    value={form.realEstateCompany}
                    onChange={(value) =>
                      updateField("realEstateCompany", value)
                    }
                    placeholder="Company or agency name"
                    required
                  />

                  {/* TIKTOK */}

                  <div>
                    <label className="mb-2.5 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#656b82]">
                      Do you have a TikTok account?
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <ChoiceButton
                        active={form.hasTikTok === "yes"}
                        onClick={() => updateField("hasTikTok", "yes")}
                        title="Yes"
                        description="I have TikTok"
                      />

                      <ChoiceButton
                        active={form.hasTikTok === "no"}
                        onClick={() => updateField("hasTikTok", "no")}
                        title="No"
                        description="I don't have TikTok"
                      />
                    </div>
                  </div>

                  {/* TIKTOK DETAILS */}

                  {hasTikTokAccount && (
                    <div className="space-y-5 rounded-2xl border border-[#e5e2ff] bg-[#faf9ff] p-4 sm:p-5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ece9ff]">
                          <Sparkles size={14} className="text-[#6254dc]" />
                        </div>

                        <div>
                          <p className="text-[10px] font-black text-[#45495f]">
                            TikTok profile
                          </p>

                          <p className="text-[9px] text-[#979caf]">
                            Tell us about your current account
                          </p>
                        </div>
                      </div>

                      <InputField
                        label="TikTok username"
                        icon={UserRound}
                        value={form.tiktokUsername}
                        onChange={(value) =>
                          updateField("tiktokUsername", value)
                        }
                        placeholder="@yourusername"
                        required
                      />

                      <InputField
                        label="TikTok profile link"
                        icon={Link2}
                        type="url"
                        value={form.tiktokProfileLink}
                        onChange={(value) =>
                          updateField("tiktokProfileLink", value)
                        }
                        placeholder="https://www.tiktok.com/@..."
                        required
                      />

                      <InputField
                        label="Follower count"
                        icon={UsersIcon}
                        type="number"
                        min="0"
                        value={form.followers}
                        onChange={(value) => updateField("followers", value)}
                        placeholder="0"
                        required
                      />
                    </div>
                  )}

                  {/* AGREEMENT */}

                  <div className="flex items-start gap-3 rounded-2xl border border-[#e7e9f2] bg-[#fafbfe] p-4">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#ece9ff]">
                      <ShieldCheck size={13} className="text-[#6052dc]" />
                    </div>

                    <p className="text-[10px] leading-5 text-[#858a9f]">
                      By submitting this form, you confirm that your information
                      is accurate and agree to be contacted about your academy
                      registration.
                    </p>
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#5547e7] via-[#704ce9] to-[#8250ee] px-5 py-4 text-xs font-black text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Completing registration...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        Complete Registration
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[9px] font-medium text-[#a2a6b8]">
                    After registration, your weekly Wednesday seminar countdown
                    will remain available on this page.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SUCCESS SCREEN
   ========================================================= */

function SuccessScreen({ registration }) {
  const firstName = registration?.name?.trim()?.split(/\s+/)[0] || "there";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7ff] px-4 py-6 text-[#171a35] sm:px-6 sm:py-8">
      <PageBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-48px)] max-w-[1000px] items-center justify-center">
        <div className="w-full">
          {/* BRAND */}

          <div className="mb-6 flex justify-center">
            <Link to="/" className="group flex items-center gap-3">
              <BrandMark />

              <div className="leading-none">
                <p className="text-sm font-black text-[#171a35]">Adonay</p>

                <p className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#8b90a4]">
                  TikTok Academy
                </p>
              </div>
            </Link>
          </div>

          {/* SUCCESS CARD */}

          <div className="relative overflow-hidden rounded-[30px] border border-white bg-white/95 shadow-[0_30px_100px_rgba(55,61,120,0.14)] backdrop-blur-xl">
            <div className="h-1.5 bg-gradient-to-r from-[#5547e7] via-[#9250f5] to-[#10c9e7]" />

            <div className="p-5 sm:p-8 lg:p-10">
              {/* SUCCESS HEADER */}

              <div className="text-center">
                <div className="relative mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-gradient-to-br from-[#5547e7] to-[#16c9df] text-white shadow-xl shadow-purple-100">
                  <Check size={32} strokeWidth={3} />

                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f3aa35] text-white shadow-sm">
                    <Sparkles size={10} />
                  </span>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#e9fbf5] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#20b486]" />

                  <span className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#188e69]">
                    Registration successful
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-black tracking-[-0.05em] text-[#171a35] sm:text-4xl">
                  Welcome, {firstName}! 🎉
                </h1>

                <p className="mx-auto mt-3 max-w-xl text-xs leading-5 text-[#80869b] sm:text-sm">
                  You're registered for the Adonay TikTok Academy live seminar.
                  Your next Wednesday session is shown below.
                </p>
              </div>

              {/* COUNTDOWN */}

              <RegisteredCountdown />

              {/* STUDENT DETAILS */}

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <DetailItem
                  icon={UserRound}
                  label="Student"
                  value={registration?.name || "Registered student"}
                />

                <DetailItem
                  icon={Mail}
                  label="Email"
                  value={registration?.email || "Email registered"}
                />
              </div>

              {/* ACTIONS */}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/seminar-countdown"
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5547e7] to-[#7950ee] px-5 py-3.5 text-[10px] font-black text-white shadow-lg shadow-purple-100 transition hover:-translate-y-0.5"
                >
                  <Clock3 size={14} />
                  Open Full Countdown
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#e2e5ef] bg-white px-5 py-3.5 text-[10px] font-black text-[#70768b] transition hover:border-[#cfcafc] hover:text-[#5547e7]"
                >
                  <ArrowLeft size={13} />
                  Academy Home
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-[9px] font-bold text-[#a0a5b8]">
            Keep this page saved — your Wednesday live seminar countdown is
            always available here.
          </p>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   REGISTERED COUNTDOWN
   ========================================================= */

function RegisteredCountdown() {
  const [targetDate, setTargetDate] = useState(getNextWednesday);

  const [remaining, setRemaining] = useState(() => getRemaining(targetDate));

  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const update = () => {
      const next = getRemaining(targetDate);

      setRemaining(next);

      if (next.total <= 0) {
        setIsLive(true);
      }
    };

    update();

    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    if (!isLive) return;

    /*
     * Keep the seminar in the live state for 60 seconds,
     * then prepare the next Wednesday.
     */
    const timer = setTimeout(() => {
      const next = getNextWednesday();

      setTargetDate(next);
      setRemaining(getRemaining(next));
      setIsLive(false);
    }, 60000);

    return () => clearTimeout(timer);
  }, [isLive]);

  const dateText = useMemo(
    () =>
      targetDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    [targetDate],
  );

  const timeText = useMemo(
    () =>
      targetDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    [targetDate],
  );

  return (
    <div className="relative mt-8 overflow-hidden rounded-[25px] border border-[#e2e0ff] bg-gradient-to-br from-[#f8f7ff] via-white to-[#effcff] p-5 sm:p-6">
      {/* Decorative glow */}

      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#8b5cf6]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#22d3ee]/10 blur-3xl" />

      <div className="relative">
        {/* SESSION INFO */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8e5ff] to-[#e4f9ff]">
              <CalendarDays size={19} className="text-[#5d50df]" />
            </div>

            <div>
              <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#9b9fb1]">
                Your next live session
              </p>

              <p className="mt-1 text-xs font-black text-[#34384f] sm:text-sm">
                {dateText}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#dce8f8] bg-white px-3 py-2">
            <Clock3 size={13} className="text-[#159bc1]" />

            <span className="text-[9px] font-extrabold text-[#5d667c]">
              {timeText}
            </span>
          </div>
        </div>

        {/* COUNTDOWN */}

        {isLive ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5547e7] to-[#12c8df] text-white shadow-lg shadow-purple-100">
              <Play size={21} fill="currentColor" className="ml-0.5" />
            </div>

            <h2 className="mt-4 text-xl font-black text-[#191c35]">
              Your seminar is live!
            </h2>

            <p className="mt-2 text-xs text-[#858a9e]">
              Join the live academy session now.
            </p>

            {LIVE_SEMINAR_URL && (
              <a
                href={LIVE_SEMINAR_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5547e7] px-5 py-3 text-[10px] font-black text-white"
              >
                <Play size={13} fill="currentColor" />
                Join Live
              </a>
            )}
          </div>
        ) : (
          <>
            <p className="mt-7 text-center text-[8px] font-extrabold uppercase tracking-[0.27em] text-[#a0a4b6]">
              Countdown to your live class
            </p>

            <div className="mt-4 grid grid-cols-4 gap-2.5 sm:gap-3.5">
              <CountdownBox value={remaining.days} label="Days" tone="purple" />

              <CountdownBox value={remaining.hours} label="Hours" tone="blue" />

              <CountdownBox
                value={remaining.minutes}
                label="Minutes"
                tone="cyan"
              />

              <CountdownBox
                value={remaining.seconds}
                label="Seconds"
                tone="orange"
              />
            </div>
          </>
        )}

        {/* LIVE ACCESS */}

        <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#e9e9f4] pt-4">
          <Video size={13} className="text-[#6254dc]" />

          <span className="text-[9px] font-bold text-[#83889c]">
            Live online training • Every Wednesday
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SEMINAR PREVIEW
   ========================================================= */

function SeminarPreview() {
  const targetDate = getNextWednesday();

  const dateText = targetDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const timeText = targetDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="mt-7 max-w-[500px] overflow-hidden rounded-[23px] border border-white bg-white/85 shadow-lg shadow-indigo-100/40 backdrop-blur-xl">
      <div className="h-1 bg-gradient-to-r from-[#5547e7] via-[#9350f4] to-[#10c8e5]" />

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#efedff]">
              <Video size={17} className="text-[#5b4de0]" />
            </div>

            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#9a9eb0]">
                Weekly live seminar
              </p>

              <p className="mt-1 text-xs font-black text-[#34384d]">
                {dateText}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-[#a0a4b6]">
              Time
            </p>

            <p className="mt-1 text-[10px] font-black text-[#159bbd]">
              {timeText}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#f6f4ff] to-[#f1fcff] px-3 py-2.5">
          <CheckCircle2 size={14} className="text-[#22a984]" />

          <span className="text-[9px] font-bold text-[#73788d]">
            Registration includes access to the live Wednesday session.
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COUNTDOWN BOX
   ========================================================= */

function CountdownBox({ value, label, tone }) {
  const themes = {
    purple: {
      box: "border-[#dfdcff] bg-gradient-to-b from-[#f4f2ff] to-white",
      number: "text-[#5b4dde]",
      line: "bg-[#6654e9]",
    },

    blue: {
      box: "border-[#d7eaff] bg-gradient-to-b from-[#f1f8ff] to-white",
      number: "text-[#2688d4]",
      line: "bg-[#329ff0]",
    },

    cyan: {
      box: "border-[#d3f1f5] bg-gradient-to-b from-[#effcff] to-white",
      number: "text-[#119bb5]",
      line: "bg-[#17bfd8]",
    },

    orange: {
      box: "border-[#f8e4ca] bg-gradient-to-b from-[#fff8ee] to-white",
      number: "text-[#db8b28]",
      line: "bg-[#f1a13a]",
    },
  };

  const theme = themes[tone] || themes.purple;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border px-2 py-4 text-center shadow-sm sm:py-5 ${theme.box}`}
    >
      <div
        className={`absolute left-1/2 top-0 h-1 w-8 -translate-x-1/2 rounded-b-full ${theme.line}`}
      />

      <div
        className={`text-2xl font-black tracking-[-0.07em] sm:text-4xl lg:text-5xl ${theme.number}`}
      >
        {pad(value)}
      </div>

      <p className="mt-1 text-[7px] font-extrabold uppercase tracking-[0.15em] text-[#999dae] sm:text-[8px]">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   INPUT FIELD
   ========================================================= */

function InputField({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min,
}) {
  return (
    <div>
      <label className="mb-2 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#686e84]">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a4a8b9]"
        />

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          min={min}
          className="w-full rounded-xl border border-[#e1e4ef] bg-[#fbfcff] py-3.5 pl-10 pr-4 text-sm font-medium text-[#252941] outline-none transition placeholder:text-[#b1b5c4] hover:border-[#d0d3e4] focus:border-[#7968e8] focus:bg-white focus:ring-4 focus:ring-[#7968e8]/[0.08]"
        />
      </div>
    </div>
  );
}

/* =========================================================
   CHOICE BUTTON
   ========================================================= */

function ChoiceButton({ active, onClick, title, description }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-xl border p-3.5 text-left transition ${
        active
          ? "border-[#cfc9ff] bg-[#f5f3ff] shadow-sm"
          : "border-[#e1e4ef] bg-[#fbfcff] hover:border-[#d1d4e3] hover:bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`text-xs font-black ${
              active ? "text-[#5547d9]" : "text-[#44495e]"
            }`}
          >
            {title}
          </p>

          <p className="mt-1 text-[9px] font-medium text-[#999dae]">
            {description}
          </p>
        </div>

        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
            active
              ? "border-[#6857e2] bg-[#6857e2] text-white"
              : "border-[#d5d8e4] bg-white text-transparent"
          }`}
        >
          <Check size={11} />
        </span>
      </div>
    </button>
  );
}

/* =========================================================
   DETAIL ITEM
   ========================================================= */

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#e7e9f2] bg-[#fafbfe] p-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#efedff]">
        <Icon size={15} className="text-[#6254dc]" />
      </div>

      <div className="min-w-0">
        <p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-[#a0a4b5]">
          {label}
        </p>

        <p className="mt-1 truncate text-[10px] font-black text-[#4c5064]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   USERS ICON
   ========================================================= */

function UsersIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/* =========================================================
   BRAND MARK
   ========================================================= */

function BrandMark() {
  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[13px] bg-gradient-to-br from-[#5547e7] via-[#784ef0] to-[#12c9e7] text-white shadow-lg shadow-purple-100 transition group-hover:scale-105">
      <div className="absolute inset-0 bg-white/10" />

      <GraduationCap size={20} strokeWidth={2.5} className="relative" />
    </div>
  );
}

/* =========================================================
   PAGE BACKGROUND
   ========================================================= */

function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#8b5cf6]/10 blur-[130px]" />

      <div className="absolute -right-40 top-20 h-[460px] w-[460px] rounded-full bg-[#22d3ee]/10 blur-[130px]" />

      <div className="absolute bottom-[-220px] left-[15%] h-[500px] w-[500px] rounded-full bg-[#ec4899]/[0.06] blur-[140px]" />

      <div className="absolute bottom-[-180px] right-[10%] h-[400px] w-[400px] rounded-full bg-[#f59e0b]/[0.06] blur-[130px]" />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(80,70,160,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(80,70,160,.45) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.65),rgba(246,247,255,0.15)_55%,transparent_80%)]" />
    </div>
  );
}
