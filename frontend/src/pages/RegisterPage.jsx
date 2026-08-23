import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../services/api";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarCheck2,
  Check,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Info,
  Link2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";

const TOTAL_SEATS = 300;

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

/*
|--------------------------------------------------------------------------
| MAIN PAGE
|--------------------------------------------------------------------------
*/

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm);

  const [registeredStudents, setRegisteredStudents] = useState(0);

  const [loadingSeats, setLoadingSeats] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [registrationData, setRegistrationData] = useState(null);

  const [error, setError] = useState("");

  const hasTikTokAccount = form.hasTikTok === "yes";

  const remainingSeats = Math.max(TOTAL_SEATS - registeredStudents, 0);

  const seatPercentage = Math.min(
    (registeredStudents / TOTAL_SEATS) * 100,
    100,
  );

  /*
  |--------------------------------------------------------------------------
  | LOAD SEAT COUNT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const loadSeatCount = async () => {
      try {
        const response = await api.get("/registration/stats");

        const count = Number(response?.data?.registeredStudents);

        if (mounted && Number.isFinite(count)) {
          setRegisteredStudents(Math.min(Math.max(count, 0), TOTAL_SEATS));
        }
      } catch (error) {
        console.error("Failed to load registration count:", error);

        if (mounted) {
          setRegisteredStudents(0);
        }
      } finally {
        if (mounted) {
          setLoadingSeats(false);
        }
      }
    };

    loadSeatCount();

    return () => {
      mounted = false;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | UPDATE FIELD
  |--------------------------------------------------------------------------
  */

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | VALIDATION
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

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

    if (remainingSeats <= 0) {
      setError(
        "Registration is currently full. Please check back for the next training intake.",
      );

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

      setRegistrationData(
        data?.registration || {
          ...payload,
          status: "pending",
        },
      );

      /*
      |--------------------------------------------------------------------------
      | Update local count
      |--------------------------------------------------------------------------
      */

      setRegisteredStudents((current) => Math.min(current + 1, TOTAL_SEATS));

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

  /*
  |--------------------------------------------------------------------------
  | SUCCESS
  |--------------------------------------------------------------------------
  */

  if (submitted) {
    return (
      <SuccessScreen
        registration={registrationData}
        registeredStudents={registeredStudents}
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | MAIN
  |--------------------------------------------------------------------------
  */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050506] text-white">
      <Background />

      {/* HEADER */}

      <header className="relative z-10 border-b border-white/[0.06] bg-black/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <BrandMark />

            <div>
              <p className="text-sm font-bold tracking-tight">Adonay</p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
                TikTok Academy
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3.5 py-2 text-xs font-medium text-white/45 transition hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5"
            />

            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* CONTENT */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
        {/* HERO */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#25F4EE]/10 bg-[#25F4EE]/[0.045] px-3.5 py-2">
            <Sparkles size={13} className="text-[#25F4EE]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#25F4EE]/80">
              Academy Registration
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Build your TikTok presence.
            <span className="mt-1 block bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
              Grow your real estate brand.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            Learn practical TikTok growth, content and personal branding
            strategies designed for real estate professionals.
          </p>
        </div>

        {/* SEATS */}

        <div className="mx-auto mt-9 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#25F4EE]/10 bg-[#25F4EE]/[0.06]">
                  <Users size={19} className="text-[#25F4EE]" />
                </div>

                <div>
                  <p className="text-sm font-bold">Limited enrollment</p>

                  <p className="mt-1 text-xs text-white/30">
                    {TOTAL_SEATS} seats available for this training.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:text-right">
                {loadingSeats ? (
                  <div className="flex items-center gap-2 text-xs text-white/35">
                    <Loader2 size={14} className="animate-spin" />
                    Checking seats...
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-2xl font-black tracking-tight">
                        {remainingSeats}
                      </p>

                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                        seats left
                      </p>
                    </div>

                    <div className="hidden h-9 w-px bg-white/[0.08] sm:block" />

                    <div className="hidden sm:block">
                      <p className="text-sm font-bold">{registeredStudents}</p>

                      <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                        registered
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <div className="h-1 overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] transition-all duration-700"
                  style={{
                    width: `${seatPercentage}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[9px] font-medium text-white/20">
                <span>{registeredStudents} people registered</span>

                <span>{TOTAL_SEATS} seats</span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}

        <div className="mx-auto mt-8 grid max-w-6xl gap-7 lg:grid-cols-[0.68fr_1.32fr]">
          {/* LEFT */}

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#25F4EE]/10 bg-[#25F4EE]/[0.06]">
                <GraduationCap size={19} className="text-[#25F4EE]" />
              </div>

              <h2 className="mt-5 text-lg font-bold">What you'll learn</h2>

              <p className="mt-2 text-sm leading-6 text-white/35">
                A practical face-to-face training experience designed for real
                estate professionals.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "TikTok content strategy",
                  "Real estate video ideas",
                  "Personal branding",
                  "Audience growth",
                  "Short-form content",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-white/55"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#25F4EE]/[0.08]">
                      <Check size={11} className="text-[#25F4EE]" />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#25F4EE]"
                />

                <div>
                  <p className="text-sm font-bold">
                    Your information stays private
                  </p>

                  <p className="mt-1.5 text-xs leading-5 text-white/30">
                    Your details are used only for registration and academy
                    communication.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* FORM */}

          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-2xl backdrop-blur-2xl">
            <div className="border-b border-white/[0.06] px-5 py-6 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#25F4EE]">
                    Registration form
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                    Reserve your place
                  </h2>

                  <p className="mt-2 text-sm text-white/30">
                    A few details and you're done.
                  </p>
                </div>

                <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] sm:flex">
                  <CalendarCheck2 size={20} className="text-white/40" />
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              {error && (
                <div
                  role="alert"
                  className="mb-7 flex items-start gap-3 rounded-xl border border-[#FE2C55]/20 bg-[#FE2C55]/[0.06] p-4"
                >
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-[#FE2C55]"
                  />

                  <p className="text-sm leading-6 text-white/65">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* PERSONAL */}

                <FormSection
                  icon={UserRound}
                  title="Personal details"
                  description="How we can reach you"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" required>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                        placeholder="Your full name"
                        autoComplete="name"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Phone number" required>
                      <InputWithIcon icon={Phone}>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(event) =>
                            updateField("phone", event.target.value)
                          }
                          placeholder="+251 9..."
                          autoComplete="tel"
                          className={inputClassWithIcon}
                        />
                      </InputWithIcon>
                    </Field>

                    <div className="sm:col-span-2">
                      <Field label="Email address" required>
                        <InputWithIcon icon={Mail}>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                              updateField("email", event.target.value)
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                            className={inputClassWithIcon}
                          />
                        </InputWithIcon>
                      </Field>
                    </div>
                  </div>
                </FormSection>

                {/* PROFESSIONAL */}

                <FormSection
                  icon={Building2}
                  title="Professional details"
                  description="Tell us about your real estate business"
                >
                  <Field label="Real estate company or agency" required>
                    <input
                      type="text"
                      value={form.realEstateCompany}
                      onChange={(event) =>
                        updateField("realEstateCompany", event.target.value)
                      }
                      placeholder="Company or agency name"
                      className={inputClass}
                    />
                  </Field>
                </FormSection>

                {/* TIKTOK */}

                <FormSection
                  title="TikTok profile"
                  description="Tell us about your current TikTok presence"
                >
                  <Field label="Do you have a TikTok account?" required>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <ChoiceButton
                        active={form.hasTikTok === "yes"}
                        onClick={() => updateField("hasTikTok", "yes")}
                      >
                        <div>
                          <p className="font-semibold text-white">
                            Yes, I have an account
                          </p>

                          <p className="mt-1 text-[11px] font-normal text-white/30">
                            I'll provide my profile
                          </p>
                        </div>
                      </ChoiceButton>

                      <ChoiceButton
                        active={form.hasTikTok === "no"}
                        onClick={() => {
                          setForm((previous) => ({
                            ...previous,
                            hasTikTok: "no",
                            tiktokUsername: "",
                            tiktokProfileLink: "",
                            followers: "",
                          }));

                          setError("");
                        }}
                      >
                        <div>
                          <p className="font-semibold text-white">
                            No, not yet
                          </p>

                          <p className="mt-1 text-[11px] font-normal text-white/30">
                            I'll create one with guidance
                          </p>
                        </div>
                      </ChoiceButton>
                    </div>
                  </Field>

                  {hasTikTokAccount && (
                    <div className="mt-6 space-y-5">
                      <Field label="TikTok username" required>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-white/25">
                            @
                          </span>

                          <input
                            type="text"
                            value={form.tiktokUsername}
                            onChange={(event) =>
                              updateField(
                                "tiktokUsername",
                                event.target.value.replace(/^@/, "").trim(),
                              )
                            }
                            placeholder="yourusername"
                            autoCapitalize="none"
                            autoCorrect="off"
                            className={`${inputClass} pl-10`}
                          />
                        </div>
                      </Field>

                      <Field label="TikTok profile link" required>
                        <InputWithIcon icon={Link2} rightIcon={ExternalLink}>
                          <input
                            type="url"
                            value={form.tiktokProfileLink}
                            onChange={(event) =>
                              updateField(
                                "tiktokProfileLink",
                                event.target.value,
                              )
                            }
                            placeholder="https://www.tiktok.com/@yourusername"
                            className={inputClassWithIcon}
                          />
                        </InputWithIcon>

                        <p className="mt-2 text-[11px] leading-5 text-white/25">
                          Open your TikTok profile → Share Profile → Copy Link.
                        </p>
                      </Field>

                      <Field
                        label="TikTok followers"
                        required
                        hint="Enter the exact number shown on your profile."
                      >
                        <div className="relative">
                          <Users
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                          />

                          <input
                            type="number"
                            inputMode="numeric"
                            min="0"
                            step="1"
                            value={form.followers}
                            onChange={(event) => {
                              const value = event.target.value;

                              if (value === "" || /^\d+$/.test(value)) {
                                updateField("followers", value);
                              }
                            }}
                            placeholder="e.g. 12500"
                            className={`${inputClass} pl-11`}
                          />
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-[11px] text-white/25">
                          <Info size={13} />

                          <span>
                            Example:{" "}
                            <strong className="text-white/45">12,500</strong>
                          </span>
                        </div>
                      </Field>
                    </div>
                  )}

                  {form.hasTikTok === "no" && (
                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#25F4EE]/10 bg-[#25F4EE]/[0.035] p-4">
                      <Info
                        size={17}
                        className="mt-0.5 shrink-0 text-[#25F4EE]"
                      />

                      <p className="text-xs leading-5 text-white/40">
                        No problem. You can register without a TikTok account.
                        We'll help you create and develop one during the
                        training.
                      </p>
                    </div>
                  )}
                </FormSection>

                {/* TRAINING INFO */}

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FE2C55]/10">
                      <MapPin size={17} className="text-[#FE2C55]" />
                    </div>

                    <div>
                      <p className="text-sm font-bold">Face-to-face training</p>

                      <p className="mt-1.5 text-xs leading-5 text-white/30">
                        Confirmed participants will receive the training
                        location and schedule after approval.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SUBMIT */}

                <div>
                  <button
                    type="submit"
                    disabled={submitting || remainingSeats <= 0}
                    className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#25F4EE] to-[#7ffdf9] px-6 py-4 text-sm font-extrabold text-black shadow-[0_10px_35px_rgba(37,244,238,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(37,244,238,0.16)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    <span className="absolute inset-0 bg-white/20 opacity-0 transition group-hover:opacity-100" />

                    <span className="relative flex items-center gap-2.5">
                      {submitting ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          Sending registration...
                        </>
                      ) : remainingSeats <= 0 ? (
                        "Registration is full"
                      ) : (
                        <>
                          Reserve my place
                          <ArrowRight
                            size={17}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </span>
                  </button>

                  <p className="mx-auto mt-4 max-w-lg text-center text-[10px] leading-5 text-white/20">
                    By registering, you confirm that your information is
                    accurate and agree to be contacted about your academy
                    registration.
                  </p>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| SUCCESS SCREEN
|--------------------------------------------------------------------------
*/

function SuccessScreen({ registration, registeredStudents }) {
  const studentName = registration?.name?.trim() || "there";

  const firstName = studentName.split(/\s+/)[0] || studentName;

  const phone = registration?.phone || "";

  const email = registration?.email || "";

  const seatNumber = registeredStudents;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050506] px-4 py-6 text-white sm:px-6 sm:py-10">
      <Background />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-48px)] max-w-2xl items-center justify-center">
        <div className="w-full">
          {/* BRAND */}

          <div className="mb-5 flex justify-center">
            <Link
              to="/"
              className="flex items-center gap-3 opacity-80 transition hover:opacity-100"
            >
              <BrandMark />

              <div className="text-left">
                <p className="text-sm font-bold">Adonay</p>

                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">
                  TikTok Academy
                </p>
              </div>
            </Link>
          </div>

          {/* SUCCESS CARD */}

          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-white/[0.035] shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute left-1/2 top-[-120px] h-[240px] w-[400px] -translate-x-1/2 rounded-full bg-[#25F4EE]/10 blur-[100px]" />

            <div className="relative p-6 sm:p-9">
              {/* ICON */}

              <div className="flex justify-center">
                <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-[22px] border border-[#25F4EE]/20 bg-[#25F4EE]/[0.08] shadow-[0_0_45px_rgba(37,244,238,0.08)]">
                  <CheckCircle2
                    size={37}
                    strokeWidth={2}
                    className="text-[#25F4EE]"
                  />

                  <span className="absolute -right-1 -top-1 text-lg">🎉</span>
                </div>
              </div>

              {/* HEADING */}

              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#25F4EE]/10 bg-[#25F4EE]/[0.045] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25F4EE]" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#25F4EE]">
                    Registration received
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  You're on the list,
                  <span className="block bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
                    {firstName}! 👋
                  </span>
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/35">
                  Your registration has been successfully received. Our team
                  will review it and contact you with the next steps.
                </p>
              </div>

              {/* STATUS */}

              <div className="mt-7 rounded-2xl border border-[#25F4EE]/10 bg-[#25F4EE]/[0.035] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25F4EE]/10">
                    <Sparkles size={18} className="text-[#25F4EE]" />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Your application is under review
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-white/40">
                      Registration is complete, but your place is not yet
                      officially approved. Our team will call you on{" "}
                      <span className="font-semibold text-white/65">
                        {phone}
                      </span>{" "}
                      to confirm your registration.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-4">
                  <Mail size={14} className="shrink-0 text-[#25F4EE]" />

                  <p className="text-[11px] leading-5 text-white/35">
                    A confirmation email has been sent to{" "}
                    <span className="font-semibold text-white/55">{email}</span>
                    .
                  </p>
                </div>
              </div>

              {/* STUDENT SUMMARY */}

              <div className="mt-4 rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05]">
                      <UserRound size={17} className="text-white/60" />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/25">
                        Applicant
                      </p>

                      <p className="mt-0.5 text-sm font-bold">{studentName}</p>
                    </div>
                  </div>

                  <div className="rounded-full border border-[#25F4EE]/10 bg-[#25F4EE]/[0.05] px-3 py-1.5">
                    <span className="text-[9px] font-bold text-[#25F4EE]">
                      #{seatNumber || "—"} registered
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <MiniInfo icon={Phone} value={phone} />

                  <MiniInfo icon={Mail} value={email} />
                </div>
              </div>

              {/* NEXT STEPS */}

              <div className="mt-5">
                <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
                  Your journey
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <StatusItem number="01" label="Registered" active />

                  <StatusItem number="02" label="Team review" />

                  <StatusItem number="03" label="Approved" />
                </div>
              </div>

              {/* BUTTON */}

              <Link
                to="/"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.05] px-5 py-3.5 text-sm font-bold text-white transition-all hover:border-white/[0.15] hover:bg-white/[0.08]"
              >
                Back to Academy
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <p className="mt-5 text-center text-[9px] font-medium uppercase tracking-[0.16em] text-white/15">
                Thank you for choosing Adonay TikTok Academy
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| MINI INFO
|--------------------------------------------------------------------------
*/

function MiniInfo({ icon: Icon, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 rounded-xl bg-white/[0.025] px-3 py-2.5">
      <Icon size={14} className="shrink-0 text-white/25" />

      <span className="truncate text-[11px] text-white/45">{value}</span>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| STATUS ITEM
|--------------------------------------------------------------------------
*/

function StatusItem({ number, label, active = false }) {
  return (
    <div
      className={`rounded-xl border p-3 text-center transition ${
        active
          ? "border-[#25F4EE]/15 bg-[#25F4EE]/[0.045]"
          : "border-white/[0.06] bg-white/[0.02]"
      }`}
    >
      <div
        className={`text-[9px] font-black ${
          active ? "text-[#25F4EE]" : "text-white/20"
        }`}
      >
        {number}
      </div>

      <p
        className={`mt-1 text-[9px] font-semibold ${
          active ? "text-white/65" : "text-white/20"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| BACKGROUND
|--------------------------------------------------------------------------
*/

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[#25F4EE]/[0.045] blur-[140px]" />

      <div className="absolute bottom-[-220px] right-[-180px] h-[520px] w-[520px] rounded-full bg-[#FE2C55]/[0.04] blur-[150px]" />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| BRAND MARK
|--------------------------------------------------------------------------
*/

function BrandMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#25F4EE] to-[#FE2C55] text-black shadow-lg shadow-[#25F4EE]/5">
      <Building2 size={19} />
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| FORM SECTION
|--------------------------------------------------------------------------
*/

function FormSection({ icon: Icon, title, description, children }) {
  return (
    <div>
      <div className="mb-5 flex items-start gap-3">
        {Icon && (
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
            <Icon size={16} className="text-[#25F4EE]" />
          </div>
        )}

        <div>
          <h3 className="text-sm font-bold">{title}</h3>

          <p className="mt-1 text-xs text-white/25">{description}</p>
        </div>
      </div>

      {children}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| FIELD
|--------------------------------------------------------------------------
*/

function Field({ label, required = false, hint, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-xs font-semibold text-white/55">
          {label}

          {required && <span className="ml-1 text-[#FE2C55]">*</span>}
        </label>

        {hint && (
          <span className="hidden text-[10px] text-white/20 sm:block">
            {hint}
          </span>
        )}
      </div>

      {children}

      {hint && (
        <p className="mt-2 text-[10px] leading-4 text-white/20 sm:hidden">
          {hint}
        </p>
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| INPUT WITH ICON
|--------------------------------------------------------------------------
*/

function InputWithIcon({ icon: Icon, rightIcon: RightIcon, children }) {
  return (
    <div className="relative">
      <Icon
        size={16}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/25"
      />

      {children}

      {RightIcon && (
        <RightIcon
          size={15}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/20"
        />
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| CHOICE BUTTON
|--------------------------------------------------------------------------
*/

function ChoiceButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group flex min-h-[68px] items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
        active
          ? "border-[#25F4EE]/25 bg-[#25F4EE]/[0.06] shadow-[0_0_0_1px_rgba(37,244,238,0.03)]"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]"
      }`}
    >
      <span>{children}</span>

      <span
        className={`ml-4 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
          active
            ? "border-[#25F4EE] bg-[#25F4EE] text-black"
            : "border-white/15 text-transparent"
        }`}
      >
        <Check size={11} />
      </span>
    </button>
  );
}

/*
|--------------------------------------------------------------------------
| INPUT STYLES
|--------------------------------------------------------------------------
*/

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-200 hover:border-white/[0.14] focus:border-[#25F4EE]/35 focus:bg-white/[0.04] focus:ring-4 focus:ring-[#25F4EE]/[0.04]";

const inputClassWithIcon =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-3.5 pl-11 pr-11 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-200 hover:border-white/[0.14] focus:border-[#25F4EE]/35 focus:bg-white/[0.04] focus:ring-4 focus:ring-[#25F4EE]/[0.04]";
