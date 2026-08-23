import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Clock3,
  Globe2,
  GraduationCap,
  Monitor,
  Users,
  UserRound,
  Building2,
  Sparkles,
  MapPin,
  Video,
  CalendarDays,
  ChevronRight,
  ShieldCheck,
  Layers3,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| SERVICES DATA
|--------------------------------------------------------------------------
*/

const services = [
  {
    id: "real-estate",
    status: "available",
    eyebrow: "Available Now",
    title: "Real Estate Agency Training",
    description:
      "A practical TikTok and digital content training program built specifically for real estate agents and agencies who want to attract attention, build trust, and generate more opportunities through short-form content.",
    icon: Building2,
    accent: "cyan",
    available: true,
    audience: "Real estate agents & agencies",
    formats: ["In-person training"],
    features: [
      "TikTok strategy for real estate",
      "Content creation & video strategy",
      "Personal branding for agents",
      "Practical lead-generation techniques",
      "Real estate-focused content systems",
      "Hands-on face-to-face learning",
    ],
    cta: "Register for Training",
    href: "/register",
  },
  {
    id: "tiktok-personal",
    status: "coming",
    eyebrow: "Coming Soon",
    title: "TikTok Personal Training",
    description:
      "One-to-one TikTok training for individuals who want to build their personal brand, create better content, grow their audience, and use TikTok with a clear strategy.",
    icon: UserRound,
    accent: "pink",
    available: false,
    audience: "Individuals & personal brands",
    formats: ["Online", "In-person"],
    features: [
      "Personal TikTok strategy",
      "Profile & personal brand development",
      "Content ideas and planning",
      "Short-form video guidance",
      "Audience growth strategies",
      "Personalized coaching",
    ],
    cta: "Coming Soon",
    href: "#",
  },
  {
    id: "group-coaching",
    status: "coming",
    eyebrow: "Coming Soon",
    title: "Group Coaching",
    description:
      "A collaborative coaching experience for people who want structured guidance, practical training, accountability, and a community of learners working toward stronger digital presence and content skills.",
    icon: Users,
    accent: "purple",
    available: false,
    audience: "Local & diaspora students",
    formats: ["Online", "In-person"],
    features: [
      "Structured group learning",
      "TikTok & content strategy",
      "Live coaching sessions",
      "Practical exercises",
      "Community & accountability",
      "Guidance from strategy to execution",
    ],
    cta: "Coming Soon",
    href: "#",
  },
];

/*
|--------------------------------------------------------------------------
| MAIN COMPONENT
|--------------------------------------------------------------------------
*/

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#050505] py-24 text-white sm:py-28 lg:py-32"
    >
      {/* ================================================================
          BACKGROUND
      ================================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[-160px] h-[420px] w-[420px] rounded-full bg-[#25F4EE]/[0.045] blur-[130px]" />

        <div className="absolute right-[-180px] top-[30%] h-[420px] w-[420px] rounded-full bg-[#FE2C55]/[0.045] blur-[140px]" />

        <div className="absolute bottom-[-220px] left-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.025] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* ================================================================
          CONTENT
      ================================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ==============================================================
            SECTION HEADER
        ============================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#25F4EE]/15 bg-[#25F4EE]/[0.045] px-4 py-2">
            <Sparkles size={14} className="text-[#25F4EE]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#25F4EE]">
              What We Offer
            </span>
          </div>

          <h1 className="mt-7 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Training built for
            <span className="block bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
              real growth.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            From specialized real estate training to personal TikTok coaching
            and future group programs, our services are designed to turn content
            into a practical skill you can actually use.
          </p>
        </div>

        {/* ==============================================================
            AVAILABILITY SUMMARY
        ============================================================== */}

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="grid overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl sm:grid-cols-3">
            <AvailabilityItem
              icon={Check}
              title="Available Now"
              text="Real Estate Agency Training"
              active
            />

            <AvailabilityItem
              icon={Clock3}
              title="Coming Soon"
              text="TikTok Personal Training"
            />

            <AvailabilityItem
              icon={Clock3}
              title="Coming Soon"
              text="Group Coaching"
            />
          </div>
        </div>

        {/* ==============================================================
            SERVICES
        ============================================================== */}

        <div className="mt-16 space-y-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* ==============================================================
            LOCAL + DIASPORA
        ============================================================== */}

        <div className="relative mt-10 overflow-hidden rounded-[30px] border border-white/[0.08] bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-6 sm:p-8 lg:p-10">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#25F4EE]/[0.04] blur-[90px]" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25F4EE]/10">
                  <Globe2 size={21} className="text-[#25F4EE]" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#25F4EE]">
                    Built Beyond Borders
                  </p>

                  <h2 className="mt-1 text-xl font-black sm:text-2xl">
                    For local & diaspora learners
                  </h2>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45">
                Our upcoming personal and group programs are being designed for
                students both locally and in the diaspora. Depending on the
                program and the student's preference, training can be delivered
                online or in person.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <FormatBadge icon={Monitor} label="Online" />

              <FormatBadge icon={MapPin} label="In-person" />
            </div>
          </div>
        </div>

        {/* ==============================================================
            WHY OUR TRAINING
        ============================================================== */}

        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FE2C55]">
              The Approach
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              More than just information.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/40">
              Our goal is to make learning practical, understandable, and useful
              in the real world.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ValueCard
              icon={Layers3}
              number="01"
              title="Practical"
              text="Learn strategies you can actually apply."
            />

            <ValueCard
              icon={GraduationCap}
              number="02"
              title="Structured"
              text="Follow a clear learning path instead of random information."
            />

            <ValueCard
              icon={Video}
              number="03"
              title="Content-focused"
              text="Build stronger content and a more effective digital presence."
            />

            <ValueCard
              icon={ShieldCheck}
              number="04"
              title="Supportive"
              text="Get guidance designed around your goals and level."
            />
          </div>
        </div>

        {/* ==============================================================
            BOTTOM CTA
        ============================================================== */}

        <div className="relative mt-20 overflow-hidden rounded-[32px] border border-[#25F4EE]/10 bg-gradient-to-br from-[#25F4EE]/[0.055] via-white/[0.025] to-[#FE2C55]/[0.055] p-8 text-center sm:p-12 lg:p-16">
          <div className="absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-[#25F4EE]/[0.06] blur-[100px]" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
              <CalendarDays size={24} className="text-[#25F4EE]" />
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-[#25F4EE]">
              Start With What Is Available
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              Ready to develop your skills?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/45">
              Real Estate Agency Training is currently open for registration.
              Our TikTok Personal Training and Group Coaching programs will be
              announced when they are ready.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#25F4EE]"
              >
                Register for Available Training
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Explore the Academy
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| SERVICE CARD
|--------------------------------------------------------------------------
*/

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  const isAvailable = service.available;

  return (
    <article
      className={`group relative overflow-hidden rounded-[30px] border p-6 transition-all duration-500 sm:p-8 lg:p-10 ${
        isAvailable
          ? "border-[#25F4EE]/20 bg-gradient-to-br from-[#25F4EE]/[0.055] via-white/[0.025] to-white/[0.015] shadow-[0_20px_80px_rgba(37,244,238,0.045)]"
          : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.14] hover:bg-white/[0.035]"
      }`}
    >
      {/* Glow */}

      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[100px] ${
          isAvailable ? "bg-[#25F4EE]/[0.07]" : "bg-[#FE2C55]/[0.035]"
        }`}
      />

      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* ============================================================
            LEFT
        ============================================================ */}

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                isAvailable ? "bg-[#25F4EE]/10" : "bg-white/[0.05]"
              }`}
            >
              <Icon
                size={22}
                className={isAvailable ? "text-[#25F4EE]" : "text-white/60"}
              />
            </div>

            <span
              className={`rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] ${
                isAvailable
                  ? "border-[#25F4EE]/20 bg-[#25F4EE]/[0.06] text-[#25F4EE]"
                  : "border-white/10 bg-white/[0.04] text-white/40"
              }`}
            >
              {service.eyebrow}
            </span>

            <span className="ml-auto text-xs font-bold text-white/20">
              0{index + 1}
            </span>
          </div>

          <h2 className="mt-7 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
            {service.title}
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            {service.description}
          </p>

          {/* Audience */}

          <div className="mt-6 flex flex-wrap gap-2">
            <InfoPill icon={Users} text={service.audience} />

            {service.formats.map((format) => (
              <InfoPill
                key={format}
                icon={format === "Online" ? Monitor : MapPin}
                text={format}
              />
            ))}
          </div>

          {/* CTA */}

          <div className="mt-8">
            {isAvailable ? (
              <Link
                to={service.href}
                className="group/button inline-flex items-center gap-2 rounded-xl bg-[#25F4EE] px-5 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-white"
              >
                {service.cta}

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover/button:translate-x-1"
                />
              </Link>
            ) : (
              <span className="inline-flex cursor-default items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-bold text-white/40">
                <Clock3 size={16} />
                {service.cta}
              </span>
            )}
          </div>
        </div>

        {/* ============================================================
            RIGHT — FEATURES
        ============================================================ */}

        <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
                What You'll Learn
              </p>

              <p className="mt-1 text-sm font-bold text-white/80">
                Training highlights
              </p>
            </div>

            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                isAvailable ? "bg-[#25F4EE]/10" : "bg-white/[0.05]"
              }`}
            >
              <GraduationCap
                size={17}
                className={isAvailable ? "text-[#25F4EE]" : "text-white/40"}
              />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    isAvailable ? "bg-[#25F4EE]/10" : "bg-white/[0.05]"
                  }`}
                >
                  <Check
                    size={12}
                    className={isAvailable ? "text-[#25F4EE]" : "text-white/40"}
                  />
                </span>

                <span className="text-sm leading-5 text-white/50">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/*
|--------------------------------------------------------------------------
| AVAILABILITY ITEM
|--------------------------------------------------------------------------
*/

function AvailabilityItem({ icon: Icon, title, text, active = false }) {
  return (
    <div
      className={`flex items-center gap-4 border-white/[0.07] p-5 sm:p-6 ${
        active ? "bg-[#25F4EE]/[0.045]" : ""
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          active ? "bg-[#25F4EE]/10" : "bg-white/[0.04]"
        }`}
      >
        <Icon
          size={17}
          className={active ? "text-[#25F4EE]" : "text-white/35"}
        />
      </div>

      <div>
        <p
          className={`text-[9px] font-bold uppercase tracking-[0.18em] ${
            active ? "text-[#25F4EE]" : "text-white/30"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-xs font-semibold text-white/60">{text}</p>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| INFO PILL
|--------------------------------------------------------------------------
*/

function InfoPill({ icon: Icon, text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/20 px-3 py-2 text-[10px] font-semibold text-white/40">
      <Icon size={13} />
      {text}
    </span>
  );
}

/*
|--------------------------------------------------------------------------
| FORMAT BADGE
|--------------------------------------------------------------------------
*/

function FormatBadge({ icon: Icon, label }) {
  return (
    <div className="flex min-w-[100px] flex-col items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-4">
      <Icon size={18} className="text-[#25F4EE]" />

      <span className="text-[10px] font-bold text-white/50">{label}</span>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| VALUE CARD
|--------------------------------------------------------------------------
*/

function ValueCard({ icon: Icon, number, title, text }) {
  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.04]">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
          <Icon size={18} className="text-[#25F4EE]" />
        </div>

        <span className="text-[10px] font-black tracking-[0.2em] text-white/15">
          {number}
        </span>
      </div>

      <h3 className="mt-5 text-sm font-bold">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-white/35">{text}</p>
    </div>
  );
}
