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
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* ====================================================================
          BACKGROUND
      ==================================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[#25F4EE]/[0.045] blur-[150px]" />

        <div className="absolute right-[-200px] top-[20%] h-[520px] w-[520px] rounded-full bg-[#FE2C55]/[0.04] blur-[160px]" />

        <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.025] blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* ====================================================================
          CONTENT
      ==================================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        {/* ==================================================================
            HERO
        ================================================================== */}

        <section className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#25F4EE]/15 bg-[#25F4EE]/[0.045] px-4 py-2">
            <CircleHelp size={14} className="text-[#25F4EE]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#25F4EE]">
              Frequently Asked Questions
            </span>
          </div>

          <h1 className="mt-7 text-4xl font-black tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Everything you need to
            <span className="block bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
              know before you start.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Find answers about Adonay TikTok Academy, our training programs,
            registration, learning formats, and what you can expect from the
            academy.
          </p>
        </section>

        {/* ==================================================================
            QUICK STATS
        ================================================================== */}

        <section className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-3">
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
        </section>

        {/* ==================================================================
            SEARCH
        ================================================================== */}

        <section className="mx-auto mt-12 max-w-4xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <Search size={19} className="text-white/30" />
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your question..."
              className="h-14 w-full rounded-2xl border border-white/[0.09] bg-white/[0.035] pl-12 pr-12 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-white/25 focus:border-[#25F4EE]/30 focus:bg-white/[0.05] focus:ring-4 focus:ring-[#25F4EE]/[0.04]"
              aria-label="Search frequently asked questions"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-white/30 transition hover:bg-white/[0.06] hover:text-white"
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

        <section className="relative mx-auto mt-20 max-w-5xl overflow-hidden rounded-[32px] border border-[#25F4EE]/10 bg-gradient-to-br from-[#25F4EE]/[0.055] via-white/[0.025] to-[#FE2C55]/[0.055] p-8 sm:p-12 lg:p-14">
          <div className="pointer-events-none absolute left-1/2 top-[-100px] h-64 w-[500px] -translate-x-1/2 rounded-full bg-[#25F4EE]/[0.055] blur-[110px]" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                <MessageCircle size={21} className="text-[#25F4EE]" />
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-[#25F4EE]">
                Still Have Questions?
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                Let's talk about your goals.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
                If you cannot find the answer you are looking for, reach out and
                get the information you need before choosing your training
                program.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#25F4EE]"
              >
                Register for Training
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="mailto:info@adonaytiktokacademy.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/65 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
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
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-[#25F4EE]/20 bg-[#25F4EE]/[0.035] shadow-[0_15px_50px_rgba(37,244,238,0.035)]"
          : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.13] hover:bg-white/[0.035]"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
        aria-expanded={isOpen}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-black tracking-wider ${
            isOpen
              ? "bg-[#25F4EE]/10 text-[#25F4EE]"
              : "bg-white/[0.045] text-white/25"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={`flex-1 pr-2 text-sm font-bold leading-6 transition-colors sm:text-[15px] ${
            isOpen ? "text-white" : "text-white/75"
          }`}
        >
          {faq.question}
        </span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
            isOpen
              ? "rotate-180 border-[#25F4EE]/15 bg-[#25F4EE]/10 text-[#25F4EE]"
              : "border-white/[0.07] bg-white/[0.025] text-white/30"
          }`}
        >
          <ChevronDown size={17} />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/[0.06] px-5 pb-6 pt-5 sm:px-6">
            <div className="ml-0 border-l border-[#25F4EE]/15 pl-4 sm:ml-[52px]">
              <p className="max-w-3xl text-sm leading-7 text-white/45">
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
      className={`shrink-0 rounded-xl border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] transition ${
        active
          ? "border-[#25F4EE]/20 bg-[#25F4EE]/10 text-[#25F4EE]"
          : "border-white/[0.07] bg-white/[0.025] text-white/35 hover:border-white/[0.13] hover:bg-white/[0.05] hover:text-white/65"
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
    <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25F4EE]/[0.07]">
        <Icon size={19} className="text-[#25F4EE]" />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-black tracking-[0.2em] text-white/15">
            {number}
          </span>

          <p className="truncate text-xs font-bold text-white/75">{title}</p>
        </div>

        <p className="mt-1 text-[11px] text-white/30">{text}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   INFO CARD
   ========================================================================== */

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04]">
        <Icon size={16} className="text-[#25F4EE]" />
      </div>

      <h3 className="mt-4 text-xs font-bold text-white/70">{title}</h3>

      <p className="mt-1 text-[11px] leading-5 text-white/30">{text}</p>
    </div>
  );
}

/* ==========================================================================
   EMPTY STATE
   ========================================================================== */

function EmptyState({ search, onClear }) {
  return (
    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
        <Search size={22} className="text-white/25" />
      </div>

      <h3 className="mt-5 text-lg font-black">No questions found</h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/35">
        We could not find an FAQ matching{" "}
        <span className="text-white/60">"{search}"</span>.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-bold text-white/60 transition hover:bg-white/[0.07] hover:text-white"
      >
        Clear Search
      </button>
    </div>
  );
}
