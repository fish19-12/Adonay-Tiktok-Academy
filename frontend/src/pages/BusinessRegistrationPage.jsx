import { createElement, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  businessType: "",
  tiktokUsername: "",
  tiktokProfileLink: "",
  goals: "",
};

const inputClass =
  "mt-1.5 block min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-200/70";

const programBenefits = [
  {
    icon: BookOpen,
    title: "በቪዲዮ የተመራ ሙሉ ኮርስ",
    description: "ግልጽና ተግባራዊ ትምህርቶች።",
  },
  {
    icon: MessageCircle,
    title: "በሳምንት 3 ጊዜ የቀጥታ ጥያቄና መልስ",
    description: "መልስና ቀጥተኛ ግብረመልስ ያግኙ።",
  },
  {
    icon: Users,
    title: "Community & Challenges",
    description: "ከሌሎች ጋር ይማሩ፣ የተግባር ተግዳሮቶችንም ይቀላቀሉ።",
  },
];

const requestErrorMessages = {
  "Please provide your full name (up to 120 characters).":
    "እባክዎ ሙሉ ስምዎን ያስገቡ (እስከ 120 ፊደላት)።",
  "Please provide a valid phone number.":
    "እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ።",
  "Please provide a valid email address.":
    "እባክዎ ትክክለኛ ኢሜይል አድራሻ ያስገቡ።",
  "Please select a valid business type.":
    "እባክዎ ትክክለኛ የንግድ ዘርፍ ይምረጡ።",
  "Please provide a valid TikTok username.":
    "እባክዎ ትክክለኛ የቲክቶክ መለያ ስም ያስገቡ።",
  "Please provide a valid TikTok profile link.":
    "እባክዎ ትክክለኛ የቲክቶክ ፕሮፋይል አድራሻ ያስገቡ።",
  "Your goals must be 1,000 characters or fewer.":
    "የግብዎ ጽሑፍ ከ1,000 ፊደላት መብለጥ የለበትም።",
};

function Field({ label, name, value, onChange, type = "text", ...props }) {
  return (
    <label className="block text-sm font-semibold text-slate-700" htmlFor={name}>
      {label}
      <input
        className={inputClass}
        id={name}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
        {...props}
      />
    </label>
  );
}

export default function BusinessRegistrationPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [error, setError] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);
    try {
      await api.post("/business-inquiries", form);
      setSubmittedName(form.name.trim());
      setSubmitted(true);
      setForm(initialForm);
      toast.success("ማመልከቻዎ በተሳካ ሁኔታ ደርሶናል።");
    } catch (requestError) {
      const serverMessage = requestError.response?.data?.message;
      const message =
        (requestError.response?.status === 404
          ? "የምዝገባ አገልግሎቱ በአገልጋዩ ላይ ገና አልተነቃም። እባክዎ በኋላ ይሞክሩ።"
          : requestErrorMessages[serverMessage]) ||
        "ማመልከቻዎን መላክ አልተቻለም። እባክዎ እንደገና ይሞክሩ።";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main lang="am" className="relative isolate min-h-[80vh] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/40 px-4 pb-6 pt-28 text-slate-900 sm:px-6 sm:pb-8 sm:pt-32 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-48 top-0 h-[24rem] w-[24rem] rounded-full bg-cyan-300/20 blur-[100px]" />
        <div className="absolute -right-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-pink-300/15 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#0f172a_1px,transparent_1px),linear-gradient(90deg,#0f172a_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <Link
          className="inline-flex items-center gap-1.5 rounded-lg text-xs font-semibold text-slate-500 transition hover:text-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
          to="/services#programs"
        >
          <ArrowLeft size={14} />
          ወደ አገልግሎቶች
        </Link>

        <header className="mx-auto mt-2 max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur">
            <Sparkles size={13} className="text-violet-600" />
            የቲክቶክ ንግድ ማስተርማይንድ
          </span>
          <h1 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-slate-900 sm:text-3xl">
            ንግድዎን{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              በቲክቶክ ያሳድጉ!
            </span>
          </h1>
          <p className="mx-auto mt-1.5 max-w-xl text-xs leading-5 text-slate-600 sm:text-sm">
            አመኔታ የሚፈጥር እና ደንበኞችን ወደ ንግድዎ የሚስብ የይዘት አቀራረብ ስትራቴጂን
            ይማሩ።
          </p>
          <p className="mx-auto mt-1 text-[10px] font-semibold leading-4 text-violet-700 sm:text-xs">
            ለንግድ ድርጅት ባለቤቶችና ባለሙያዎች የተዘጋጀ የቡድን ስልጠና
          </p>
        </header>

        <section
          aria-label="በንግድ ማስተርማይንድ የሚያገኙት"
          className="mx-auto mt-3 grid max-w-3xl grid-cols-3 gap-2"
        >
          {programBenefits.map(({ icon, title, description }) => (
            <article
              className="flex min-w-0 flex-col items-start rounded-xl border border-slate-200/80 bg-white/80 p-2.5 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:p-3"
              key={title}
              title={description}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-100 via-violet-100 to-pink-100 text-violet-700 sm:h-8 sm:w-8 sm:rounded-xl">
                {createElement(icon, { size: 14 })}
              </span>
              <div className="min-w-0">
                <h2 className="mt-1.5 text-[10px] font-bold leading-4 text-slate-900 sm:text-xs">
                  {title}
                </h2>
                <p className="mt-0.5 hidden text-[10px] leading-4 text-slate-500 sm:block">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-3 max-w-3xl overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-3.5 shadow-[0_20px_60px_rgba(15,23,42,0.09)] backdrop-blur-xl sm:rounded-3xl sm:p-5">
          {submitted ? (
            <div
              aria-live="polite"
              className="flex flex-col items-center justify-center py-8 text-center sm:py-10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-violet-100 text-violet-700">
                <CheckCircle2 size={26} />
              </span>
              <h2 className="mt-4 text-xl font-bold text-slate-900">
                እናመሰግናለን፣ {submittedName}!
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                ማመልከቻዎን ተቀብለናል። ቡድናችን ስለ ንግድ ግቦችዎ ለመወያየትና
                ቀጣዩን የምዝገባ እርምጃ ለማብራራት በስልክ ያነጋግርዎታል።
              </p>
              <Link
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(99,102,241,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(99,102,241,0.25)]"
                to="/services#programs"
              >
                ፕሮግራሞቹን ይመልከቱ
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold text-violet-700">
                    ፈጣን ምዝገባ
                  </p>
                  <h2 className="mt-0.5 text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                    ዛሬውኑ ይጀምሩ
                  </h2>
                </div>
                <p className="max-w-[145px] text-right text-[10px] leading-4 text-slate-500 sm:max-w-none sm:text-xs">
                  አሁን ክፍያ አያስፈልግም · በስልክ እናገኝዎታለን
                </p>
              </div>

              <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
                <div className="grid gap-2.5 sm:grid-cols-3">
                    <Field
                      autoComplete="name"
                      label="ሙሉ ስም *"
                      name="name"
                      onChange={updateField}
                      placeholder="ሙሉ ስምዎን ያስገቡ"
                      required
                      value={form.name}
                    />
                    <Field
                      autoComplete="tel"
                      label="ስልክ ቁጥር *"
                      name="phone"
                      onChange={updateField}
                      placeholder="+251 9..."
                      required
                      type="tel"
                      value={form.phone}
                    />
                    <label
                      className="block text-sm font-semibold text-slate-700"
                      htmlFor="businessType"
                    >
                      የተሰማሩበት ዘርፍ *
                      <select
                        className={inputClass}
                        id="businessType"
                        name="businessType"
                        onChange={updateField}
                        required
                        value={form.businessType}
                      >
                        <option className="bg-white text-slate-900" value="">
                          የተሰማሩበትን ዘርፍ ይምረጡ
                        </option>
                        <option className="bg-white text-slate-900" value="Real Estate Agent">
                          የሪል እስቴት ወኪል
                        </option>
                        <option className="bg-white text-slate-900" value="Personal Trainer">
                         የግል የአካል ብቃት አሰልጣኝ
                        </option>
                        <option className="bg-white text-slate-900" value="Beauty Professional">
                          የውበት ባለሙያ
                        </option>
                        <option className="bg-white text-slate-900" value="Sales Consultant">
                          የሽያጭ አማካሪ
                        </option>
                        <option className="bg-white text-slate-900" value="Event Planner">
                          የዝግጅት አዘጋጅ
                        </option>
                        <option className="bg-white text-slate-900" value="Other Service Business">
                          ሌላ የአገልግሎት ንግድ
                        </option>
                      </select>
                    </label>
                </div>

                <details className="group rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2.5">
                  <summary className="cursor-pointer list-none text-xs font-semibold text-slate-600 marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
                    ኢሜይል፣ የቲክቶክ መለያ ወይም ግብ ያክሉ (አማራጭ)
                    <span className="float-right text-violet-600 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Field
                      autoComplete="email"
                      label="ኢሜይል አድራሻ"
                      name="email"
                      onChange={updateField}
                      placeholder="you@example.com"
                      type="email"
                      value={form.email}
                    />
                    <Field
                      label="የቲክቶክ መለያ ስም"
                      name="tiktokUsername"
                      onChange={updateField}
                      placeholder="@መለያዎ"
                      value={form.tiktokUsername}
                    />
                    <Field
                      label="የቲክቶክ ፕሮፋይል አድራሻ"
                      name="tiktokProfileLink"
                      onChange={updateField}
                      placeholder="https://www.tiktok.com/@you"
                      type="url"
                      value={form.tiktokProfileLink}
                    />
                    <label
                      className="block text-sm font-semibold text-slate-700 sm:col-span-2"
                      htmlFor="goals"
                    >
                      በቲክቶክ ምን ማሳካት ይፈልጋሉ?
                      <textarea
                        className={`${inputClass} min-h-20 resize-y`}
                        id="goals"
                        maxLength={1000}
                        name="goals"
                        onChange={updateField}
                        placeholder="ዋናውን የቲክቶክ ወይም የንግድ ግብዎን ይግለጹ።"
                        rows={2}
                        value={form.goals}
                      />
                    </label>
                  </div>
                  <p className="mt-2 text-[11px] leading-4 text-slate-500">
                    የቲክቶክ መለያ የለዎትም? እነዚህን ባዶ መተው ይችላሉ።
                  </p>
                </details>

                {error && (
                  <p
                    aria-live="assertive"
                    className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                <button
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(99,102,241,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(99,102,241,0.25)] focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={submitting}
                  type="submit"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle className="animate-spin" size={18} />
                      ማመልከቻዎ እየተላከ ነው…
                    </>
                  ) : (
                    <>
                      ለንግድ ማስተርማይንድ ያመልክቱ
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] leading-4 text-slate-500">
                  ቡድናችን ጥያቄዎችዎን ለመመለስና ቀጣዩን የምዝገባ እርምጃ ለማገዝ ያነጋግርዎታል።
                </p>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
