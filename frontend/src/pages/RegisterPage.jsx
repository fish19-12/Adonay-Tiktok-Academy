import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
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
  AlertCircle,
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

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm);

  const [registeredStudents, setRegisteredStudents] = useState(0);
  const [loadingSeats, setLoadingSeats] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState("");

  const hasTikTokAccount = form.hasTikTok === "yes";

  const remainingSeats = Math.max(TOTAL_SEATS - registeredStudents, 0);

  const seatPercentage = Math.min(
    (registeredStudents / TOTAL_SEATS) * 100,
    100,
  );

  /*
  |--------------------------------------------------------------------------
  | LOAD REGISTRATION COUNT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const loadSeatCount = async () => {
      try {
        const response = await fetch("/api/registration/stats", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load registration count.");
        }

        const data = await response.json();

        const count = Number(data?.registeredStudents);

        if (mounted && Number.isFinite(count)) {
          setRegisteredStudents(Math.min(Math.max(count, 0), TOTAL_SEATS));
        }
      } catch {
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
  | UPDATE FORM
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
        email: form.email.trim(),

        hasTikTok: hasTikTokAccount,

        tiktokUsername: hasTikTokAccount ? form.tiktokUsername.trim() : null,

        tiktokProfileLink: hasTikTokAccount
          ? form.tiktokProfileLink.trim()
          : null,

        /*
         * IMPORTANT:
         * Exact follower count is now sent as a NUMBER.
         *
         * Example:
         * 12500
         *
         * Not:
         * "10,001–50,000"
         */
        followers: hasTikTokAccount ? Number(form.followers) : null,

        realEstateCompany: form.realEstateCompany.trim(),

        trainingType: "In-person / Face-to-face",
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Registration could not be completed. Please try again.",
        );
      }

      setRegisteredStudents((current) => Math.min(current + 1, TOTAL_SEATS));

      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (submissionError) {
      setError(
        submissionError?.message || "Something went wrong. Please try again.",
      );

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
  | SUCCESS SCREEN
  |--------------------------------------------------------------------------
  */

  if (submitted) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#070708] text-white">
        <Background />

        <header className="relative z-10 border-b border-white/[0.06]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
            <Link to="/" className="flex items-center gap-3">
              <BrandMark />

              <div>
                <p className="text-sm font-bold tracking-tight">Adonay</p>

                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  TikTok Academy
                </p>
              </div>
            </Link>
          </div>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-3xl items-center px-5 py-12 sm:px-8">
          <div className="w-full rounded-[28px] border border-white/[0.08] bg-white/[0.035] p-7 text-center shadow-2xl backdrop-blur-2xl sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#25F4EE]/20 bg-[#25F4EE]/10">
              <CheckCircle2 size={42} className="text-[#25F4EE]" />
            </div>

            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.3em] text-[#25F4EE]">
              Registration Confirmed
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              You're officially on the list.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
              Thank you for registering for Adonay TikTok Academy. Your
              registration has been received successfully.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <SuccessInfo
                icon={GraduationCap}
                label="Training"
                value="Face-to-face training"
              />

              <SuccessInfo
                icon={Users}
                label="Class Size"
                value={`Limited to ${TOTAL_SEATS} students`}
              />
            </div>

            <Link
              to="/"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#25F4EE]"
            >
              Back to Academy
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | MAIN PAGE
  |--------------------------------------------------------------------------
  */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070708] text-white">
      <Background />

      {/* HEADER */}
      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <BrandMark />

            <div>
              <p className="text-sm font-bold tracking-tight">Adonay</p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                TikTok Academy
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="group flex items-center gap-2 text-xs font-medium text-white/40 transition hover:text-white"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Home
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:py-20">
        {/* HERO */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3.5 py-2 shadow-sm">
            <Sparkles size={13} className="text-[#25F4EE]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
              Academy Registration
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Build your TikTok presence.
            <span className="mt-1 block bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
              Grow your real estate brand.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            Register for Adonay TikTok Academy and learn practical content,
            TikTok growth, and personal branding strategies built for real
            estate professionals.
          </p>
        </div>

        {/* SEAT STATUS */}
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-xl backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25F4EE]/10">
                  <Users size={20} className="text-[#25F4EE]" />
                </div>

                <div>
                  <p className="text-sm font-bold">Limited enrollment</p>

                  <p className="mt-1 text-xs text-white/35">
                    Only {TOTAL_SEATS} places are available for this intake.
                  </p>
                </div>
              </div>

              <div className="sm:text-right">
                {loadingSeats ? (
                  <div className="flex items-center gap-2 text-xs text-white/35">
                    <Loader2 size={14} className="animate-spin" />
                    Checking availability
                  </div>
                ) : (
                  <>
                    <p className="text-2xl font-black tracking-tight">
                      {remainingSeats}
                    </p>

                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25">
                      places remaining
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-5">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] transition-all duration-700"
                  style={{
                    width: `${seatPercentage}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[10px] text-white/25">
                <span>{registeredStudents} registered</span>

                <span>{TOTAL_SEATS} total</span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="mx-auto mt-8 grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          {/* LEFT */}
          <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25F4EE]/10">
                <GraduationCap size={20} className="text-[#25F4EE]" />
              </div>

              <h2 className="mt-5 text-lg font-bold">What you'll learn</h2>

              <p className="mt-2 text-sm leading-6 text-white/40">
                A practical, face-to-face training experience focused on helping
                real estate professionals use TikTok effectively.
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
                    className="flex items-center gap-3 text-sm text-white/60"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#25F4EE]/10">
                      <Check size={11} className="text-[#25F4EE]" />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-[#25F4EE]"
                />

                <div>
                  <p className="text-sm font-bold">
                    Your information is private
                  </p>

                  <p className="mt-1.5 text-xs leading-5 text-white/35">
                    Your information is used only to process your registration
                    and communicate academy details.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* FORM */}
          <section className="rounded-2xl border border-white/[0.08] bg-white/[0.035] shadow-2xl backdrop-blur-2xl">
            <div className="border-b border-white/[0.06] px-5 py-6 sm:px-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#25F4EE]">
                Registration form
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                Reserve your place
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/35">
                Enter your details below. It only takes a few minutes.
              </p>
            </div>

            <div className="p-5 sm:p-8">
              {/* ERROR */}
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
                  description="Your contact information"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" required>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                        placeholder="your full name"
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

                {/* REAL ESTATE */}
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
                  description="Help us understand your current TikTok presence"
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
                            I'll provide my profile details
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
                            I'll create one with your guidance
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

                        <p className="mt-2 text-[11px] leading-5 text-white/30">
                          Open your TikTok profile, tap Share Profile, then
                          choose Copy Link.
                        </p>
                      </Field>

                      {/* EXACT FOLLOWERS */}
                      <Field
                        label="How many followers do you have?"
                        required
                        hint="Enter the exact number shown on your TikTok profile."
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

                              /*
                               * Only allow positive
                               * whole numbers.
                               */
                              if (value === "" || /^\d+$/.test(value)) {
                                updateField("followers", value);
                              }
                            }}
                            placeholder="e.g. 12500"
                            className={`${inputClass} pl-11`}
                          />
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-[11px] text-white/30">
                          <Info size={13} />

                          <span>
                            Enter the exact follower count, for example{" "}
                            <span className="font-semibold text-white/50">
                              12,500
                            </span>
                            .
                          </span>
                        </div>
                      </Field>
                    </div>
                  )}

                  {form.hasTikTok === "no" && (
                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#25F4EE]/10 bg-[#25F4EE]/[0.04] p-4">
                      <Info
                        size={17}
                        className="mt-0.5 shrink-0 text-[#25F4EE]"
                      />

                      <p className="text-xs leading-5 text-white/40">
                        No problem. You can register without a TikTok account.
                        The training will help you create and develop your
                        account.
                      </p>
                    </div>
                  )}
                </FormSection>

                {/* TRAINING */}
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FE2C55]/10">
                      <MapPin size={17} className="text-[#FE2C55]" />
                    </div>

                    <div>
                      <p className="text-sm font-bold">Face-to-face training</p>

                      <p className="mt-1.5 text-xs leading-5 text-white/35">
                        This is an in-person training. Confirmed participants
                        will receive the training location and schedule after
                        registration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SUBMIT */}
                <div>
                  <button
                    type="submit"
                    disabled={submitting || remainingSeats <= 0}
                    className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-4 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#25F4EE] hover:shadow-[0_15px_45px_rgba(37,244,238,0.12)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-white"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        Processing registration...
                      </>
                    ) : remainingSeats <= 0 ? (
                      "Registration is full"
                    ) : (
                      <>
                        Complete registration
                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  <p className="mx-auto mt-4 max-w-lg text-center text-[10px] leading-5 text-white/20">
                    By submitting this form, you confirm that the information
                    provided is accurate and agree to be contacted about your
                    academy registration.
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
| BACKGROUND
|--------------------------------------------------------------------------
*/

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[#25F4EE]/[0.045] blur-[140px]" />

      <div className="absolute bottom-[-220px] right-[-180px] h-[520px] w-[520px] rounded-full bg-[#FE2C55]/[0.04] blur-[150px]" />

      <div
        className="absolute inset-0 opacity-[0.025]"
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
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#25F4EE] to-[#FE2C55] text-black shadow-lg">
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

          <p className="mt-1 text-xs text-white/30">{description}</p>
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
          <span className="hidden text-[10px] text-white/25 sm:block">
            {hint}
          </span>
        )}
      </div>

      {children}

      {hint && (
        <p className="mt-2 text-[10px] leading-4 text-white/25 sm:hidden">
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
          ? "border-[#25F4EE]/30 bg-[#25F4EE]/[0.06] shadow-[0_0_0_1px_rgba(37,244,238,0.05)]"
          : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16] hover:bg-white/[0.04]"
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
| SUCCESS INFO
|--------------------------------------------------------------------------
*/

function SuccessInfo({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4 text-left">
      <div className="flex items-center gap-2.5">
        <Icon size={17} className="text-[#25F4EE]" />

        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold">{value}</p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| SHARED INPUT STYLES
|--------------------------------------------------------------------------
*/

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-200 hover:border-white/[0.14] focus:border-[#25F4EE]/35 focus:bg-white/[0.04] focus:ring-4 focus:ring-[#25F4EE]/[0.04]";

const inputClassWithIcon =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-3.5 pl-11 pr-11 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-200 hover:border-white/[0.14] focus:border-[#25F4EE]/35 focus:bg-white/[0.04] focus:ring-4 focus:ring-[#25F4EE]/[0.04]";
