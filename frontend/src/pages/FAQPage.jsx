import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  Clock3,
  Globe2,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  X,
} from "lucide-react";

/* ==========================================================================
   FAQ DATA
   ========================================================================== */

const faqCategories = [
  {
    id: "general",
    label: "General",
  },
  {
    id: "training",
    label: "Training",
  },
  {
    id: "registration",
    label: "Registration",
  },
  {
    id: "delivery",
    label: "Online & In-person",
  },
];

const faqs = [
  {
    id: 1,
    category: "general",
    question: "What is Adonay TikTok Academy?",
    answer:
      "Adonay TikTok Academy is a practical learning platform focused on TikTok, short-form content, personal branding, digital presence, and content strategy. The academy is designed to help individuals and organizations understand how to use content more intentionally and effectively.",
  },
  {
    id: 2,
    category: "general",
    question: "Who is Adonay TikTok Academy for?",
    answer:
      "The academy is designed for individuals, professionals, business owners, creators, personal brands, real estate professionals, and learners who want to improve their TikTok and short-form content skills. Different programs may be designed for different audiences.",
  },
  {
    id: 3,
    category: "general",
    question: "Is the academy only about TikTok?",
    answer:
      "TikTok is an important part of the academy, but the learning goes beyond simply posting videos. Programs can include content strategy, personal branding, audience growth, video creation, digital presence, and practical systems that can be applied across modern social platforms.",
  },
  {
    id: 4,
    category: "training",
    question: "What training is currently available?",
    answer:
      "Real Estate Agency Training is currently available for registration. It is designed specifically for real estate agents and agencies who want to use TikTok and short-form content to build visibility, strengthen their brand, and create more opportunities.",
  },
  {
    id: 5,
    category: "training",
    question: "What will I learn during the training?",
    answer:
      "Depending on the program, training may cover TikTok strategy, content planning, short-form video creation, personal branding, audience growth, content systems, practical lead-generation techniques, and strategies for turning content into a useful business or personal-brand asset.",
  },
  {
    id: 6,
    category: "training",
    question: "Do I need previous TikTok experience?",
    answer:
      "No. Training is designed to be practical and understandable for learners at different levels. Whether you are starting from the beginning or already creating content, the goal is to help you develop a clearer strategy and stronger practical skills.",
  },
  {
    id: 7,
    category: "training",
    question: "Is the training practical or mostly theoretical?",
    answer:
      "The academy focuses strongly on practical learning. The goal is not simply to give you information, but to help you understand how to apply what you learn through content ideas, strategies, exercises, and real-world examples.",
  },
  {
    id: 8,
    category: "registration",
    question: "How do I register for available training?",
    answer:
      "When a program is open, you can use the registration page on this website to submit your information. The available training and registration process are clearly presented so you can start from there.",
  },
  {
    id: 9,
    category: "registration",
    question: "Can I register for a program that is coming soon?",
    answer:
      "Programs marked as Coming Soon are not yet open for registration. Once those programs are ready, their availability and registration details will be announced through the academy.",
  },
  {
    id: 10,
    category: "registration",
    question: "Can businesses or organizations request training?",
    answer:
      "Yes. The academy is designed to support both individual learners and professional audiences. Organizations interested in specialized training can get in touch to discuss their needs and the appropriate training format.",
  },
  {
    id: 11,
    category: "delivery",
    question: "Do you offer online training?",
    answer:
      "Online training is planned for selected programs, particularly personal and group learning opportunities. Availability depends on the specific program.",
  },
  {
    id: 12,
    category: "delivery",
    question: "Do you offer in-person training?",
    answer:
      "Yes. In-person learning is available for selected programs. The currently available Real Estate Agency Training is designed as face-to-face practical training.",
  },
  {
    id: 13,
    category: "delivery",
    question: "Do you train students outside the local area?",
    answer:
      "Yes. Upcoming programs are being designed with both local and diaspora learners in mind. Depending on the program, students may have online or in-person learning options.",
  },
  {
    id: 14,
    category: "delivery",
    question: "Can training be customized for my organization?",
    answer:
      "Training can be discussed around the needs of your organization, audience, and goals. If you are interested in a customized learning experience, contact the academy so the appropriate option can be discussed.",
  },
];

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState(1);
  const [search, setSearch] = useState("");

  const filteredFAQs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;

      if (!normalizedSearch) {
        return matchesCategory;
      }

      const searchableText = `${faq.question} ${faq.answer}`.toLowerCase();

      return matchesCategory && searchableText.includes(normalizedSearch);
    });
  }, [activeCategory, search]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenId(null);
  };

  const clearSearch = () => {
    setSearch("");
    setOpenId(null);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/40 text-slate-900">
      {/* ====================================================================
          BACKGROUND
      ==================================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Cyan glow */}
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-300/20 blur-[120px]" />

        {/* Pink glow */}
        <div className="absolute -right-40 top-[18%] h-[520px] w-[520px] rounded-full bg-pink-300/15 blur-[130px]" />

        {/* Violet glow */}
        <div className="absolute bottom-[-220px] left-[30%] h-[520px] w-[520px] rounded-full bg-violet-300/15 blur-[130px]" />

        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/10 blur-[120px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ====================================================================
          TOP ACCENT
      ==================================================================== */}

      <div className="relative z-20 h-1 w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />

      {/* ====================================================================
          CONTENT
      ==================================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {/* ==================================================================
            HERO
        ================================================================== */}

        <section className="mx-auto max-w-4xl text-center">
          {/* Label */}

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 shadow-sm backdrop-blur-md">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-white">
              <CircleHelp size={13} strokeWidth={2.5} />
            </span>

            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-slate-600">
              Frequently Asked Questions
            </span>
          </div>

          {/* Heading */}

          <h1 className="mt-6 text-4xl font-black leading-[1.03] tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-6xl">
            Everything you need to
            <span className="block bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              know before you start.
            </span>
          </h1>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Find answers about Adonay TikTok Academy, our training programs,
            registration, learning formats, and what you can expect from the
            academy.
          </p>
        </section>

        {/* ==================================================================
            QUICK STATS
        ================================================================== */}

        <section className="mx-auto mt-12 max-w-5xl">
          <div className="grid gap-3 sm:grid-cols-3">
            <QuickStat
              icon={GraduationCap}
              number="01"
              title="Practical Learning"
              text="Focused on skills you can apply."
            />

            <QuickStat
              icon={Globe2}
              number="02"
              title="Local & Diaspora"
              text="Learning designed beyond borders."
            />

            <QuickStat
              icon={ShieldCheck}
              number="03"
              title="Clear Guidance"
              text="Structured learning and support."
            />
          </div>
        </section>

        {/* ==================================================================
            SEARCH
        ================================================================== */}

        <section className="mx-auto mt-12 max-w-4xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <Search size={19} className="text-slate-400" />
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your question..."
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white/85 pl-12 pr-12 text-sm font-medium text-slate-800 shadow-sm outline-none backdrop-blur-xl transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-300 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              aria-label="Search frequently asked questions"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </section>

        {/* ==================================================================
            CATEGORY FILTER
        ================================================================== */}

        <section className="mx-auto mt-6 max-w-4xl">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <CategoryButton
              active={activeCategory === "all"}
              onClick={() => handleCategoryChange("all")}
            >
              All Questions
            </CategoryButton>

            {faqCategories.map((category) => (
              <CategoryButton
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.label}
              </CategoryButton>
            ))}
          </div>
        </section>

        {/* ==================================================================
            FAQ LIST
        ================================================================== */}

        <section className="mx-auto mt-10 max-w-4xl">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-3">
              {filteredFAQs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  index={index}
                  isOpen={openId === faq.id}
                  onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState search={search} onClear={clearSearch} />
          )}
        </section>

        {/* ==================================================================
            CONTACT CTA
        ================================================================== */}

        <section className="relative mx-auto mt-20 max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-pink-50 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:p-12 lg:p-14">
          {/* Decorative glow */}

          <div className="pointer-events-none absolute left-1/2 top-[-110px] h-72 w-[550px] -translate-x-1/2 rounded-full bg-cyan-300/20 blur-[100px]" />

          <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-64 w-64 rounded-full bg-pink-300/20 blur-[90px]" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-violet-100 shadow-sm">
                <MessageCircle size={21} className="text-violet-600" />
              </div>

              <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.22em] text-violet-600">
                Still Have Questions?
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-slate-900 sm:text-3xl">
                Let's talk about your goals.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                If you cannot find the answer you are looking for, reach out and
                get the information you need before choosing your training
                program.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_15px_35px_rgba(99,102,241,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(99,102,241,0.25)]"
              >
                Register for Training
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="mailto:info@adonaytiktokacademy.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
              >
                <Mail size={16} />
                Contact Academy
              </a>
            </div>
          </div>
        </section>

        {/* ==================================================================
            BOTTOM INFORMATION
        ================================================================== */}

        <section className="mx-auto mt-12 max-w-5xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              icon={Monitor}
              title="Online"
              text="Available for selected programs."
            />

            <InfoCard
              icon={MapPin}
              title="In-person"
              text="Face-to-face practical learning."
            />

            <InfoCard
              icon={Users}
              title="Individuals"
              text="Programs for personal growth."
            />

            <InfoCard
              icon={Video}
              title="Content"
              text="TikTok & short-form strategy."
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* ==========================================================================
   FAQ ITEM
   ========================================================================== */

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <article
      className={`group overflow-hidden rounded-2xl border bg-white/80 backdrop-blur-xl transition-all duration-300 ${
        isOpen
          ? "border-cyan-200 shadow-[0_18px_55px_rgba(15,23,42,0.08)]"
          : "border-slate-200 shadow-sm hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-[0_15px_45px_rgba(15,23,42,0.07)]"
      }`}
    >
      {/* Question */}

      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
        aria-expanded={isOpen}
      >
        {/* Number */}

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-black tracking-wider transition-all duration-300 ${
            isOpen
              ? "bg-gradient-to-br from-cyan-100 to-violet-100 text-violet-600"
              : "bg-slate-100 text-slate-400 group-hover:bg-cyan-50 group-hover:text-cyan-600"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}

        <span
          className={`flex-1 pr-2 text-sm font-bold leading-6 transition-colors sm:text-[15px] ${
            isOpen ? "text-slate-900" : "text-slate-700"
          }`}
        >
          {faq.question}
        </span>

        {/* Arrow */}

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
            isOpen
              ? "rotate-180 border-cyan-200 bg-cyan-50 text-cyan-600"
              : "border-slate-200 bg-slate-50 text-slate-400 group-hover:border-cyan-200 group-hover:text-cyan-600"
          }`}
        >
          <ChevronDown size={17} />
        </span>
      </button>

      {/* Answer */}

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-6">
            <div className="ml-0 border-l-2 border-cyan-200 pl-4 sm:ml-[52px]">
              <p className="max-w-3xl text-sm leading-7 text-slate-600">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ==========================================================================
   CATEGORY BUTTON
   ========================================================================== */

function CategoryButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-xl border px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] transition-all duration-300 ${
        active
          ? "border-transparent bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 text-white shadow-[0_8px_25px_rgba(99,102,241,0.18)]"
          : "border-slate-200 bg-white/80 text-slate-500 shadow-sm hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
      }`}
    >
      {children}
    </button>
  );
}

/* ==========================================================================
   QUICK STAT
   ========================================================================== */

function QuickStat({ icon: Icon, number, title, text }) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_15px_40px_rgba(15,23,42,0.07)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-violet-100 transition duration-300 group-hover:scale-105">
        <Icon size={19} className="text-violet-600" />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-black tracking-[0.2em] text-slate-300">
            {number}
          </span>

          <p className="truncate text-xs font-extrabold text-slate-800">
            {title}
          </p>
        </div>

        <p className="mt-1 text-[11px] text-slate-500">{text}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   INFO CARD
   ========================================================================== */

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_15px_40px_rgba(15,23,42,0.07)]">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-100 to-violet-100 transition duration-300 group-hover:scale-105">
        <Icon size={16} className="text-violet-600" />
      </div>

      <h3 className="mt-4 text-xs font-extrabold text-slate-800">{title}</h3>

      <p className="mt-1 text-[11px] leading-5 text-slate-500">{text}</p>
    </div>
  );
}

/* ==========================================================================
   EMPTY STATE
   ========================================================================== */

function EmptyState({ search, onClear }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 px-6 py-14 text-center shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-violet-100">
        <Search size={22} className="text-violet-600" />
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-900">
        No questions found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        We could not find an FAQ matching{" "}
        <span className="font-semibold text-slate-700">"{search}"</span>.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
      >
        Clear Search
      </button>
    </div>
  );
}
