import { createElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Link2,
  Loader2,
  Mail,
  Phone,
  UserRound,
  Users,
  Video,
} from "lucide-react";

/* =========================================================
   STORAGE
   ========================================================= */

const REGISTRATION_STORAGE_KEY = "adonay_tiktok_academy_registration";

/* =========================================================
   REQUEST CONFIG
   ========================================================= */

const REGISTRATION_TIMEOUT = 15000;

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
};

/* =========================================================
   MAIN REGISTER PAGE
   ========================================================= */

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [paymentOptions, setPaymentOptions] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cbe");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [registrationData, setRegistrationData] = useState(null);
  const [error, setError] = useState("");

  /* =======================================================
     RESTORE SAVED REGISTRATION
     ======================================================= */

  useEffect(() => {
    let cancelled = false;

    try {
      const saved = localStorage.getItem(REGISTRATION_STORAGE_KEY);

      if (!saved) return;

      const parsed = JSON.parse(saved);

      if (!cancelled && parsed && typeof parsed === "object") {
        setRegistrationData(parsed);
        setSubmitted(true);
      }
    } catch (restoreError) {
      console.warn("Could not restore registration:", restoreError);
    }

    return () => {
      cancelled = true;
    };
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

  /* =======================================================
     TIKTOK STATE
     ======================================================= */

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
    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();

    if (!name) {
      return "Please enter your full name.";
    }

    if (name.length < 2) {
      return "Please enter your full name.";
    }

    if (!phone) {
      return "Please enter your phone number.";
    }

    if (phone.length < 7) {
      return "Please enter a valid phone number.";
    }

    if (!email) {
      return "Please enter your email address.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!form.hasTikTok) {
      return "Please select whether you have a TikTok account.";
    }

    if (hasTikTokAccount) {
      const username = form.tiktokUsername.trim();

      const profileLink = form.tiktokProfileLink.trim();

      if (!username) {
        return "Please enter your TikTok username.";
      }

      if (!profileLink) {
        return "Please enter your TikTok profile link.";
      }

      if (!/^https?:\/\/(www\.)?tiktok\.com\/@/i.test(profileLink)) {
        return "Please enter a valid TikTok profile link.";
      }

      if (form.followers === "") {
        return "Please enter your TikTok follower count.";
      }

      const followerCount = Number(form.followers);

      if (!Number.isInteger(followerCount) || followerCount < 0) {
        return "Please enter a valid TikTok follower count.";
      }
    }

    return "";
  };

  /* =======================================================
     SUBMIT
     ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    /* Prevent accidental double-click */
    if (submitting) {
      return;
    }

    setError("");

    /* -------------------------------------------------------
       CLIENT VALIDATION
       ------------------------------------------------------- */

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    /* -------------------------------------------------------
       PREPARE DATA ONCE
       ------------------------------------------------------- */

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

      realEstateCompany: "",

      trainingType: "In-person / Face-to-face",
    };

    /* -------------------------------------------------------
       START SUBMISSION IMMEDIATELY
       ------------------------------------------------------- */

    setSubmitting(true);

    /* -------------------------------------------------------
       TIMEOUT CONTROLLER
       ------------------------------------------------------- */

    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, REGISTRATION_TIMEOUT);

    try {
      /*
       * IMPORTANT:
       * Your api service must support the Axios signal option.
       *
       * Axios supports:
       * signal: controller.signal
       */

      const registrationData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          registrationData.append(key, String(value));
        }
      });
      registrationData.append("paymentMethod", paymentMethod);
      registrationData.append("paymentScreenshot", paymentScreenshot);
      const telegramInitData = window.Telegram?.WebApp?.initData;
      if (telegramInitData) {
        registrationData.append("telegramInitData", telegramInitData);
      }

      const response = await api.post("/register", registrationData, {
        signal: controller.signal,

        /*
         * Keep Axios from waiting indefinitely.
         * The AbortController above handles this too.
         */
        timeout: REGISTRATION_TIMEOUT,
      });

      window.clearTimeout(timeoutId);

      const data = response?.data;

      const savedRegistration = data?.registration || {
        ...payload,
        status: "pending",
      };

      /* -----------------------------------------------------
         SAVE SUCCESS IMMEDIATELY
         ----------------------------------------------------- */

      try {
        localStorage.setItem(
          REGISTRATION_STORAGE_KEY,
          JSON.stringify(savedRegistration),
        );
      } catch (storageError) {
        console.warn("Could not save registration locally:", storageError);
      }

      setRegistrationData(savedRegistration);

      /*
       * Show success immediately after server confirms.
       */
      setSubmitted(true);

      /*
       * Do not use smooth scrolling here.
       * Instant scrolling makes the transition feel faster.
       */
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    } catch (submissionError) {
      window.clearTimeout(timeoutId);

      console.error("Registration submission failed:", submissionError);

      /* -----------------------------------------------------
         TIMEOUT / ABORT
         ----------------------------------------------------- */

      if (
        submissionError?.code === "ERR_CANCELED" ||
        submissionError?.name === "CanceledError" ||
        submissionError?.name === "AbortError"
      ) {
        setError(
          "The registration server is taking too long to respond. Please check your internet connection and try again.",
        );

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      /* -----------------------------------------------------
         SERVER ERROR
         ----------------------------------------------------- */

      const serverMessage =
        submissionError?.response?.data?.message ||
        submissionError?.response?.data?.error;

      if (serverMessage) {
        setError(serverMessage);
      } else if (submissionError?.response?.status === 400) {
        setError(
          "Some registration information is invalid. Please check your details and try again.",
        );
      } else if (submissionError?.response?.status === 409) {
        setError("This email or phone number may already be registered.");
      } else if (submissionError?.response?.status >= 500) {
        setError(
          "The registration server is temporarily unavailable. Please try again in a moment.",
        );
      } else if (submissionError?.request && !submissionError?.response) {
        setError(
          "Could not reach the registration server. Please check your internet connection and try again.",
        );
      } else {
        setError("Registration could not be completed. Please try again.");
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  /* =======================================================
     SUCCESS
     ======================================================= */

  if (submitted) {
    return <SuccessScreen registration={registrationData} />;
  }

  /* =======================================================
     FORM PAGE
     ======================================================= */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f7ff] text-[#171a35]">
      <RegistrationBackground />

      {/* ===================================================
          HEADER
          =================================================== */}

      <header className="relative z-20 border-b border-white/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <BrandMark />

            <div className="leading-none">
              <p className="text-sm font-black tracking-tight text-[#171a35]">
                ADONAY
              </p>

              <p className="mt-1 text-[7px] font-black uppercase tracking-[0.2em] text-[#85899b]">
                TikTok /<span className="text-[#e749a0]"> Academy</span>
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="
              group
              inline-flex
              items-center
              gap-1.5
              rounded-xl
              border
              border-[#e2e4ef]
              bg-white
              px-3.5
              py-2.5
              text-[9px]
              font-black
              text-[#70758a]
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:border-[#c9c3ff]
              hover:text-[#5b4dde]
            "
          >
            <ArrowLeft
              size={13}
              strokeWidth={2.5}
              className="transition-transform group-hover:-translate-x-0.5"
            />

            <span className="hidden sm:inline">Back to Home</span>

            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      {/* ===================================================
          REGISTRATION
          =================================================== */}

      <section className="relative z-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* HERO */}

          <div className="mb-7 text-center sm:mb-9">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dedaff] bg-white/85 px-3.5 py-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#6555df] opacity-40" />
                <span className="relative h-2 w-2 rounded-full bg-[#6555df]" />
              </span>

              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#5f51d5] sm:text-[9px]">
                Academy Registration
              </span>

              <Video size={12} className="text-[#18aeca]" />
            </div>

            <h1 className="text-3xl font-black tracking-[-0.055em] text-[#171a35] sm:text-4xl lg:text-5xl">
              Join Adonay TikTok Academy
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-xs leading-5 text-[#858a9d] sm:text-sm">
              Register for training with Adonay TikTok Academy and build
              practical skills in content, audience growth, and personal
              branding.
            </p>
          </div>

          {/* FORM CARD */}

          <div className="relative">
            <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-r from-[#6654e9]/10 via-[#9a4ff1]/10 to-[#12c8e6]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[25px] border border-white bg-white/95 shadow-[0_25px_80px_rgba(55,61,120,0.12)]">
              <div className="h-1.5 bg-gradient-to-r from-[#5547e7] via-[#8c4ff2] to-[#12c8e6]" />

              <div className="p-5 sm:p-8 lg:p-9">
                {/* ERROR */}

                {error && (
                  <div
                    role="alert"
                    className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4"
                  >
                    <AlertCircle
                      size={17}
                      className="mt-0.5 shrink-0 text-red-500"
                    />

                    <p className="text-xs font-semibold leading-5 text-red-600">
                      {error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  {/* =================================================
                      PERSONAL INFORMATION
                      ================================================= */}

                  <div>
                    <SectionHeading
                      number="01"
                      title="Your information"
                      description="Tell us how we can contact you."
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <InputField
                        label="Full name"
                        icon={UserRound}
                        value={form.name}
                        onChange={(value) => updateField("name", value)}
                        placeholder="Your full name"
                        autoComplete="name"
                        required
                      />

                      <InputField
                        label="Phone number"
                        icon={Phone}
                        type="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={(value) => updateField("phone", value)}
                        placeholder="+251 9..."
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="mt-4">
                      <InputField
                        label="Email address"
                        icon={Mail}
                        type="email"
                        inputMode="email"
                        value={form.email}
                        onChange={(value) => updateField("email", value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  {/* =================================================
                      TIKTOK
                      ================================================= */}

                  <div className="border-t border-[#eceef5] pt-7">
                    <SectionHeading
                      number="02"
                      title="TikTok account"
                      description="Tell us about your current TikTok presence."
                    />

                    <div>
                      <label className="mb-3 block text-[9px] font-black uppercase tracking-[0.14em] text-[#686e84]">
                        Do you have a TikTok account?
                      </label>

                      <div className="grid grid-cols-2 gap-3">
                        <ChoiceButton
                          active={form.hasTikTok === "yes"}
                          onClick={() => updateField("hasTikTok", "yes")}
                          title="Yes, I do"
                        />

                        <ChoiceButton
                          active={form.hasTikTok === "no"}
                          onClick={() => updateField("hasTikTok", "no")}
                          title="No, not yet"
                        />
                      </div>
                    </div>

                    {hasTikTokAccount && (
                      <div className="mt-4 space-y-4 rounded-2xl border border-[#e4e0ff] bg-gradient-to-br from-[#faf9ff] to-[#f6fcff] p-4 sm:p-5">
                        <InputField
                          label="TikTok username"
                          icon={UserRound}
                          value={form.tiktokUsername}
                          onChange={(value) =>
                            updateField("tiktokUsername", value)
                          }
                          placeholder="@yourusername"
                          autoComplete="off"
                          required
                        />

                        <InputField
                          label="TikTok profile link"
                          icon={Link2}
                          type="url"
                          inputMode="url"
                          value={form.tiktokProfileLink}
                          onChange={(value) =>
                            updateField("tiktokProfileLink", value)
                          }
                          placeholder="https://www.tiktok.com/@..."
                          autoComplete="url"
                          required
                        />

                        <InputField
                          label="Follower count"
                          icon={Users}
                          type="number"
                          inputMode="numeric"
                          min="0"
                          value={form.followers}
                          onChange={(value) => updateField("followers", value)}
                          placeholder="0"
                          autoComplete="off"
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#eceef5] pt-7">
                    <SectionHeading
                      number="03"
                      title="Payment"
                      description="Pay using CBE or Telebirr, then upload your receipt for Telegram support to review."
                    />

                    {paymentOptions?.configured ? (
                      <div className="space-y-4">
                        <p className="rounded-xl border border-[#e2e4ef] bg-[#fafbfe] p-4 text-sm font-bold text-[#292d43]">
                          Training fee: {paymentOptions.amountEtb} ETB
                        </p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {[
                            ["cbe", paymentOptions.methods.cbe],
                            ["telebirr", paymentOptions.methods.telebirr],
                          ].map(([method, details]) => (
                            <label
                              key={method}
                              className={`cursor-pointer rounded-xl border p-4 transition ${paymentMethod === method ? "border-[#6254dc] bg-[#f8f7ff]" : "border-[#e2e4ef] bg-white"}`}
                            >
                              <span className="flex items-center gap-2 text-xs font-black text-[#292d43]">
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  value={method}
                                  checked={paymentMethod === method}
                                  onChange={() => setPaymentMethod(method)}
                                  className="accent-[#6254dc]"
                                />
                                {details.label}
                              </span>
                              <span className="mt-2 block break-all text-[11px] leading-5 text-[#70758a]">
                                {details.accountName}
                                <br />
                                {details.accountNumber || details.phoneNumber}
                              </span>
                            </label>
                          ))}
                        </div>
                        <label className="block text-[9px] font-black uppercase tracking-[0.14em] text-[#686e84]">
                          Payment screenshot (JPG, PNG, or WEBP)
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            required
                            onChange={(event) =>
                              setPaymentScreenshot(
                                event.target.files?.[0] || null,
                              )
                            }
                            className="mt-2 block min-h-12 w-full rounded-xl border border-[#e0e2eb] bg-[#fafbfe] p-3 text-xs normal-case tracking-normal"
                          />
                        </label>
                        {!paymentOptions.reviewReady && (
                          <p
                            role="status"
                            className="rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800"
                          >
                            {paymentOptions.reviewStatus ===
                            "reviewers_not_configured"
                              ? "Academy support reviewers are not configured yet. Please contact support."
                              : paymentOptions.reviewStatus ===
                                  "bot_not_configured"
                                ? "Academy support is setting up payment review. Please try again later."
                                : "The support bot is reconnecting. This page will retry automatically."}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p
                        role="alert"
                        className="rounded-xl bg-red-50 p-4 text-xs leading-5 text-red-700"
                      >
                        Payment instructions are temporarily unavailable. Please
                        contact academy support.
                      </p>
                    )}
                  </div>

                  {/* =================================================
                      SUBMIT
                      ================================================= */}

                  <div className="border-t border-[#eceef5] pt-6">
                    <div className="mb-4 flex items-start gap-3 rounded-xl bg-[#f8f7ff] p-3.5">
                      <CalendarDays
                        size={15}
                        className="mt-0.5 shrink-0 text-[#6254dc]"
                      />

                      <p className="text-[10px] leading-4 text-[#777c91]">
                        Submit your details to register for training with{" "}
                        <span className="font-black text-[#6254dc]">
                          Adonay TikTok Academy
                        </span>
                        . The academy will review your registration.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={
                        submitting ||
                        !paymentOptions?.configured ||
                        !paymentOptions?.reviewReady ||
                        !paymentScreenshot
                      }
                      aria-busy={submitting}
                      className={`
                        group
                        flex
                        min-h-[52px]
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        px-5
                        text-xs
                        font-black
                        text-white
                        shadow-[0_12px_30px_rgba(91,76,220,0.22)]
                        transition
                        duration-200
                        ${
                          submitting
                            ? "cursor-wait bg-[#7c74c9]"
                            : "bg-gradient-to-r from-[#5547e7] via-[#714be9] to-[#12bfe0] hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(91,76,220,0.28)] active:translate-y-0"
                        }
                      `}
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />

                          <span>Sending registration...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={16} />

                          <span>Complete Registration</span>

                          <ArrowRight
                            size={15}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </button>

                    {submitting && (
                      <p className="mt-3 text-center text-[9px] font-medium text-[#999daf]">
                        Please wait while we securely save your registration...
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-[9px] font-medium text-[#a1a5b5]">
            © 2026 Adonay TikTok Academy
          </p>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SECTION HEADING
   ========================================================= */

function SectionHeading({ number, title, description }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f0eeff] text-[8px] font-black text-[#6254dc]">
        {number}
      </div>

      <div>
        <h2 className="text-sm font-black text-[#292d43]">{title}</h2>

        <p className="mt-1 text-[10px] leading-4 text-[#969aaa]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   INPUT FIELD
   ========================================================= */

function InputField({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min,
  autoComplete = "off",
  inputMode,
}) {
  return (
    <div>
      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.14em] text-[#686e84]">
        {label}
      </label>

      <div className="group relative">
        {createElement(icon, {
          "aria-hidden": true,
          className:
            "pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#a4a8b9] transition-colors group-focus-within:text-[#6555df]",
          strokeWidth: 2,
        })}

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          min={min}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className="
            box-border
            h-12
            w-full
            rounded-xl
            border
            border-[#e0e2eb]
            bg-[#fafbfe]
            py-2.5
            pl-11
            pr-3
            text-xs
            font-medium
            text-[#252941]
            outline-none
            transition
            placeholder:text-[#b0b4c2]
            hover:border-[#d1d4df]
            focus:border-[#7968e8]
            focus:bg-white
            focus:ring-4
            focus:ring-[#7968e8]/[0.07]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   YES / NO BUTTON
   ========================================================= */

function ChoiceButton({ active, onClick, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`
        flex
        h-12
        items-center
        justify-between
        rounded-xl
        border
        px-4
        text-left
        transition
        duration-150
        ${
          active
            ? "border-[#c9c3ff] bg-[#f5f3ff] text-[#5547d9] shadow-sm"
            : "border-[#e0e2eb] bg-[#fafbfe] text-[#555a6e] hover:border-[#d0d3df] hover:bg-white"
        }
      `}
    >
      <span className="text-xs font-bold">{title}</span>

      <span
        className={`
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-full
          border
          transition
          ${
            active
              ? "border-[#6555df] bg-[#6555df] text-white"
              : "border-[#d6d8e2] bg-white text-transparent"
          }
        `}
      >
        <Check size={11} strokeWidth={3} />
      </span>
    </button>
  );
}

/* =========================================================
   SUCCESS SCREEN
   ========================================================= */

function SuccessScreen({ registration }) {
  const firstName = registration?.name?.trim()?.split(/\s+/)[0] || "there";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7ff] text-[#171a35]">
      <RegistrationBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-lg">
          {/* BRAND */}

          <div className="mb-6 flex justify-center">
            <Link to="/" className="group flex items-center gap-3">
              <BrandMark />

              <div className="leading-none">
                <p className="text-sm font-black text-[#171a35]">ADONAY</p>

                <p className="mt-1 text-[7px] font-black uppercase tracking-[0.2em] text-[#85899b]">
                  TikTok /<span className="text-[#e749a0]"> Academy</span>
                </p>
              </div>
            </Link>
          </div>

          {/* SUCCESS CARD */}

          <div className="relative">
            <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-r from-[#6554e9]/10 via-[#a04ff2]/10 to-[#12c8e6]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[26px] border border-white bg-white/95 shadow-[0_30px_90px_rgba(50,55,100,0.12)]">
              <div className="h-1.5 bg-gradient-to-r from-[#5547e7] via-[#8c4ff2] to-[#12c8e6]" />

              <div className="p-6 text-center sm:p-9">
                {/* SUCCESS ICON */}

                <div className="relative mx-auto flex h-[72px] w-[72px] items-center justify-center">
                  <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[#5547e7]/15 to-[#12c8e6]/15 blur-xl" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#5547e7] to-[#12c8e6] text-white shadow-xl shadow-purple-100">
                    <Check size={28} strokeWidth={3} />
                  </div>
                </div>

                {/* STATUS */}

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#d8f2e8] bg-[#f0fcf7] px-3.5 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#20b486]" />

                  <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#188f69]">
                    PAYMENT PROOF SENT FOR REVIEW
                  </span>
                </div>

                <h1 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#171a35] sm:text-3xl">
                  Your application is under review.
                </h1>

                <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#858a9d]">
                  Thank you,{" "}
                  <span className="font-black text-[#5b50cf]">{firstName}</span>
                  . Your registration and payment screenshot have been sent to
                  academy support. We&apos;ll contact you after review.
                </p>

                <div className="mt-6 rounded-2xl border border-[#e2defe] bg-gradient-to-br from-[#f8f6ff] to-[#f2fcff] p-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <CheckCircle2 size={17} className="text-[#6254dc]" />
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[#6254dc]">
                        What happens next
                      </p>

                      <p className="mt-1 text-[11px] font-bold leading-4 text-[#4d5268]">
                        Telegram support is checking your payment
                      </p>

                      <p className="mt-1 text-[9px] leading-4 text-[#8b90a3]">
                        We&apos;ll contact you with relevant training details.
                      </p>
                    </div>
                  </div>
                </div>

                {/* DETAILS */}

                <div className="mt-5 space-y-2 text-left">
                  <DetailRow
                    label="Name"
                    value={registration?.name || "Registered"}
                  />

                  <DetailRow
                    label="Email"
                    value={registration?.email || "Registered"}
                  />
                </div>

                {/* HOME BUTTON */}

                <div className="mt-6">
                  <Link
                    to="/"
                    className="
                      group
                      flex
                      min-h-[52px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-gradient-to-r
                      from-[#5547e7]
                      via-[#714be9]
                      to-[#12bfe0]
                      px-5
                      text-xs
                      font-black
                      text-white
                      shadow-[0_12px_30px_rgba(91,76,220,0.22)]
                      transition
                      duration-200
                      hover:-translate-y-0.5
                      hover:shadow-[0_16px_35px_rgba(91,76,220,0.28)]
                    "
                  >
                    <CalendarDays size={16} />

                    <span>Return to Academy Home</span>

                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                {/* HOME */}

                <Link
                  to="/"
                  className="
                    mt-3
                    flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#e4e5ed]
                    bg-white
                    text-[10px]
                    font-black
                    text-[#666b80]
                    transition
                    hover:border-[#cbc7f5]
                    hover:bg-[#faf9ff]
                    hover:text-[#5b4dde]
                  "
                >
                  <ArrowLeft size={13} />
                  Back to Academy
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-[9px] text-[#a1a5b5]">
            © 2026 Adonay TikTok Academy
          </p>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SUCCESS DETAIL
   ========================================================= */

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#ececf2] bg-[#fafbfe] px-3.5 py-3">
      <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.12em] text-[#a0a4b5]">
        {label}
      </span>

      <span className="min-w-0 truncate text-[10px] font-bold text-[#4d5268]">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   BRAND MARK
   ========================================================= */

function BrandMark() {
  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[13px] bg-gradient-to-br from-[#5547e7] via-[#784ef0] to-[#12c9e7] text-white shadow-lg shadow-purple-100">
      <div className="absolute inset-0 bg-white/10" />

      <span className="relative text-xs font-black">A</span>
    </div>
  );
}

/* =========================================================
   BACKGROUND
   ========================================================= */

function RegistrationBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#8b5cf6]/10 blur-[110px]" />

      <div className="absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-[#22d3ee]/10 blur-[110px]" />

      <div className="absolute bottom-[-220px] left-[10%] h-[500px] w-[500px] rounded-full bg-[#ec4899]/[0.05] blur-[120px]" />

      <div className="absolute inset-0 opacity-[0.025]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(80,70,160,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(80,70,160,.45) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7),rgba(246,247,255,0.15)_55%,transparent_80%)]" />
    </div>
  );
}
