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
  Play,
  Star,
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
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-br
        from-slate-50
        via-white
        to-cyan-50/50
        py-20
        text-slate-900
        sm:py-24
        lg:py-32
      "
    >
      {/* ================================================================
          BACKGROUND
      ================================================================= */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Cyan glow */}

        <div
          className="
            absolute
            -left-40
            -top-40
            h-[420px]
            w-[420px]
            rounded-full
            bg-cyan-300/20
            blur-3xl
          "
        />

        {/* Pink glow */}

        <div
          className="
            absolute
            -right-40
            top-[30%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-pink-300/20
            blur-3xl
          "
        />

        {/* Violet glow */}

        <div
          className="
            absolute
            bottom-[-180px]
            left-[35%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-violet-300/15
            blur-3xl
          "
        />

        {/* Subtle grid */}

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      {/* ================================================================
          TOP ACCENT
      ================================================================= */}

      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />

      {/* ================================================================
          CONTENT
      ================================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* ================================================================
            HERO HEADER
        ================================================================= */}

        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-200
              bg-white/80
              px-4
              py-2
              shadow-sm
              backdrop-blur-md
            "
          >
            <span
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-cyan-400
                to-violet-500
                text-white
              "
            >
              <Sparkles size={12} />
            </span>

            <span
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.2em]
                text-slate-600
                sm:text-[10px]
              "
            >
              What We Offer
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              mt-7
              text-4xl
              font-black
              leading-[1.03]
              tracking-[-0.05em]
              text-slate-900
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Learn skills that
            <span
              className="
                block
                bg-gradient-to-r
                from-cyan-500
                via-violet-500
                to-pink-500
                bg-clip-text
                text-transparent
              "
            >
              create real growth.
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-slate-500
              sm:text-base
            "
          >
            Practical training designed to help you understand TikTok, create
            stronger content, build your personal brand, and turn your digital
            presence into a valuable skill.
          </p>

          {/* Small tags */}

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <MiniTag icon={Video} text="Content" color="cyan" />

            <MiniTag icon={UserRound} text="Personal Brand" color="violet" />

            <MiniTag icon={Users} text="Community" color="pink" />

            <MiniTag
              icon={GraduationCap}
              text="Practical Learning"
              color="amber"
            />
          </div>
        </div>

        {/* ================================================================
            AVAILABILITY
        ================================================================= */}

        <div className="mx-auto mt-12 max-w-5xl sm:mt-14">
          <div
            className="
              grid
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white/80
              shadow-[0_20px_60px_rgba(15,23,42,0.06)]
              backdrop-blur-xl
              md:grid-cols-3
            "
          >
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

        {/* ================================================================
            SECTION TITLE
        ================================================================= */}

        <div className="mb-7 mt-16 flex items-end justify-between gap-5 sm:mt-20">
          <div>
            <p
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.2em]
                text-violet-500
              "
            >
              Our Programs
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-black
                tracking-tight
                text-slate-900
                sm:text-3xl
              "
            >
              Choose your path.
            </h2>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Star size={14} className="fill-amber-400 text-amber-400" />

            <span className="text-xs font-semibold text-slate-400">
              Practical • Modern • Focused
            </span>
          </div>
        </div>

        {/* ================================================================
            SERVICE CARDS
        ================================================================= */}

        <div className="space-y-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* ================================================================
            LOCAL + DIASPORA
        ================================================================= */}

        <div
          className="
            relative
            mt-8
            overflow-hidden
            rounded-[30px]
            border
            border-slate-200
            bg-white/80
            shadow-[0_20px_60px_rgba(15,23,42,0.06)]
            backdrop-blur-xl
            sm:mt-10
          "
        >
          {/* Decorative gradient */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-cyan-200/30
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -left-20
              h-56
              w-56
              rounded-full
              bg-pink-200/20
              blur-3xl
            "
          />

          <div
            className="
              relative
              grid
              gap-8
              p-6
              sm:p-8
              lg:grid-cols-[1fr_auto]
              lg:items-center
              lg:p-10
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-100
                    to-violet-100
                  "
                >
                  <Globe2 size={21} className="text-cyan-600" />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.2em]
                      text-cyan-600
                    "
                  >
                    Built Beyond Borders
                  </p>

                  <h2
                    className="
                      mt-1
                      text-xl
                      font-black
                      tracking-tight
                      text-slate-900
                      sm:text-2xl
                    "
                  >
                    For local & diaspora learners
                  </h2>
                </div>
              </div>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                Our upcoming personal and group programs are being designed for
                students both locally and in the diaspora. Depending on the
                program and your preference, training can be delivered online or
                in person.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <FormatBadge icon={Monitor} label="Online" color="cyan" />

              <FormatBadge icon={MapPin} label="In-person" color="violet" />
            </div>
          </div>
        </div>

        {/* ================================================================
            APPROACH
        ================================================================= */}

        <div className="mt-20 sm:mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.22em]
                text-pink-500
              "
            >
              The Academy Approach
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-black
                tracking-[-0.03em]
                text-slate-900
                sm:text-4xl
              "
            >
              More than information.
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-cyan-500
                  to-violet-500
                  bg-clip-text
                  text-transparent
                "
              >
                Learn by doing.
              </span>
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-slate-500
              "
            >
              We focus on practical knowledge that can move from the classroom
              directly into the real world.
            </p>
          </div>

          <div
            className="
              mt-10
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <ValueCard
              icon={Layers3}
              number="01"
              title="Practical"
              text="Learn strategies you can actually apply."
              gradient="cyan"
            />

            <ValueCard
              icon={GraduationCap}
              number="02"
              title="Structured"
              text="Follow a clear learning path instead of random information."
              gradient="violet"
            />

            <ValueCard
              icon={Video}
              number="03"
              title="Content-focused"
              text="Build stronger content and a better digital presence."
              gradient="pink"
            />

            <ValueCard
              icon={ShieldCheck}
              number="04"
              title="Supportive"
              text="Get guidance designed around your goals and level."
              gradient="amber"
            />
          </div>
        </div>

        {/* ================================================================
            CTA
        ================================================================= */}

        <div
          className="
            relative
            mt-20
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200
            bg-gradient-to-br
            from-cyan-50
            via-white
            to-pink-50
            px-6
            py-10
            text-center
            shadow-[0_25px_70px_rgba(15,23,42,0.07)]
            sm:mt-24
            sm:px-10
            sm:py-14
            lg:py-16
          "
        >
          {/* Glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-48
              w-96
              -translate-x-1/2
              rounded-full
              bg-cyan-300/20
              blur-3xl
            "
          />

          <div className="relative">
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-cyan-400
                to-violet-500
                text-white
                shadow-lg
                shadow-cyan-200
              "
            >
              <CalendarDays size={24} />
            </div>

            <p
              className="
                mt-6
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.22em]
                text-cyan-600
              "
            >
              Start Your Journey
            </p>

            <h2
              className="
                mx-auto
                mt-3
                max-w-2xl
                text-3xl
                font-black
                leading-tight
                tracking-[-0.035em]
                text-slate-900
                sm:text-4xl
              "
            >
              Ready to turn your skills
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-cyan-500
                  via-violet-500
                  to-pink-500
                  bg-clip-text
                  text-transparent
                "
              >
                into real growth?
              </span>
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-slate-500
              "
            >
              Real Estate Agencys Training is currently open for registration.
              Our TikTok Personal Training and Group Coaching programs will be
              announced when they are ready.
            </p>

            <div
              className="
                mt-8
                flex
                flex-col
                justify-center
                gap-3
                sm:flex-row
              "
            >
              <Link
                to="/register"
                className="
                  group
                  inline-flex
                  min-h-[52px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-violet-500
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-cyan-200/50
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  sm:w-auto
                "
              >
                Register for Available Training
                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <Link
                to="/"
                className="
                  inline-flex
                  min-h-[52px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-7
                  py-3.5
                  text-sm
                  font-semibold
                  text-slate-700
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-violet-200
                  hover:text-violet-600
                  sm:w-auto
                "
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
      className={`
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        bg-white/85
        shadow-[0_18px_55px_rgba(15,23,42,0.055)]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        ${
          isAvailable
            ? "border-cyan-200 hover:border-cyan-300 hover:shadow-[0_25px_70px_rgba(6,182,212,0.10)]"
            : "border-slate-200 hover:border-violet-200 hover:shadow-[0_25px_70px_rgba(139,92,246,0.08)]"
        }
      `}
    >
      {/* Decorative corner */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          blur-3xl
          transition-opacity
          duration-500
          group-hover:opacity-80
          ${isAvailable ? "bg-cyan-200/35" : "bg-violet-200/25"}
        `}
      />

      <div
        className="
          relative
          grid
          gap-8
          p-5
          sm:p-8
          lg:grid-cols-[1.05fr_0.95fr]
          lg:gap-10
          lg:p-10
        "
      >
        {/* ============================================================
            LEFT
        ============================================================ */}

        <div className="min-w-0">
          {/* Top row */}

          <div className="flex items-center gap-3">
            <div
              className={`
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                ${
                  isAvailable
                    ? "bg-cyan-50 text-cyan-600"
                    : "bg-violet-50 text-violet-500"
                }
              `}
            >
              <Icon size={22} />
            </div>

            <span
              className={`
                rounded-full
                border
                px-3
                py-1.5
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.16em]
                ${
                  isAvailable
                    ? "border-cyan-200 bg-cyan-50 text-cyan-600"
                    : "border-violet-200 bg-violet-50 text-violet-500"
                }
              `}
            >
              {service.eyebrow}
            </span>

            <span
              className="
                ml-auto
                text-[10px]
                font-black
                tracking-[0.2em]
                text-slate-200
              "
            >
              0{index + 1}
            </span>
          </div>

          {/* Title */}

          <h2
            className="
              mt-6
              text-2xl
              font-black
              leading-tight
              tracking-[-0.035em]
              text-slate-900
              sm:text-3xl
              lg:text-4xl
            "
          >
            {service.title}
          </h2>

          {/* Description */}

          <p
            className="
              mt-4
              max-w-2xl
              text-sm
              leading-7
              text-slate-500
              sm:text-base
            "
          >
            {service.description}
          </p>

          {/* Information */}

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

          <div className="mt-7">
            {isAvailable ? (
              <Link
                to={service.href}
                className="
                  group/button
                  inline-flex
                  min-h-[50px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-violet-500
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-md
                  shadow-cyan-200/40
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  sm:w-auto
                "
              >
                {service.cta}

                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover/button:translate-x-1
                  "
                />
              </Link>
            ) : (
              <span
                className="
                  inline-flex
                  min-h-[50px]
                  w-full
                  cursor-default
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-slate-400
                  sm:w-auto
                "
              >
                <Clock3 size={16} />
                {service.cta}
              </span>
            )}
          </div>
        </div>

        {/* ============================================================
            RIGHT — FEATURES
        ============================================================ */}

        <div
          className="
            min-w-0
            rounded-2xl
            border
            border-slate-200
            bg-slate-50/80
            p-5
            sm:p-6
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className="
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.18em]
                  text-slate-400
                "
              >
                What You'll Learn
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  font-extrabold
                  text-slate-800
                "
              >
                Training highlights
              </p>
            </div>

            <div
              className={`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                ${
                  isAvailable
                    ? "bg-cyan-100 text-cyan-600"
                    : "bg-violet-100 text-violet-500"
                }
              `}
            >
              <GraduationCap size={18} />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {service.features.map((feature) => (
              <div
                key={feature}
                className="
                  flex
                  min-w-0
                  items-start
                  gap-3
                "
              >
                <span
                  className={`
                    mt-0.5
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${isAvailable ? "bg-cyan-100" : "bg-violet-100"}
                  `}
                >
                  <Check
                    size={12}
                    className={
                      isAvailable ? "text-cyan-600" : "text-violet-500"
                    }
                  />
                </span>

                <span
                  className="
                    text-sm
                    leading-5
                    text-slate-500
                  "
                >
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
      className={`
        flex
        min-w-0
        items-center
        gap-4
        border-b
        border-slate-100
        p-5
        last:border-b-0
        md:border-b-0
        md:border-r
        md:last:border-r-0
        sm:p-6
        ${active ? "bg-gradient-to-br from-cyan-50 to-white" : "bg-white/50"}
      `}
    >
      <div
        className={`
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${
            active ? "bg-cyan-100 text-cyan-600" : "bg-slate-100 text-slate-400"
          }
        `}
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p
          className={`
            text-[9px]
            font-extrabold
            uppercase
            tracking-[0.15em]
            ${active ? "text-cyan-600" : "text-slate-400"}
          `}
        >
          {title}
        </p>

        <p
          className="
            mt-1
            break-words
            text-xs
            font-bold
            text-slate-700
          "
        >
          {text}
        </p>
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
    <span
      className="
        inline-flex
        max-w-full
        min-w-0
        items-center
        gap-2
        rounded-xl
        border
        border-slate-200
        bg-white
        px-3
        py-2
        text-[10px]
        font-bold
        text-slate-500
        shadow-sm
      "
    >
      <Icon size={13} className="shrink-0 text-slate-400" />

      <span className="break-words">{text}</span>
    </span>
  );
}

/*
|--------------------------------------------------------------------------
| MINI TAG
|--------------------------------------------------------------------------
*/

function MiniTag({ icon: Icon, text, color }) {
  const styles = {
    cyan: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    violet: "bg-violet-50 text-violet-700 ring-violet-100",
    pink: "bg-pink-50 text-pink-700 ring-pink-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-3
        py-1.5
        text-[9px]
        font-extrabold
        uppercase
        tracking-[0.1em]
        ring-1
        ${styles[color]}
      `}
    >
      <Icon size={12} />
      {text}
    </span>
  );
}

/*
|--------------------------------------------------------------------------
| FORMAT BADGE
|--------------------------------------------------------------------------
*/

function FormatBadge({ icon: Icon, label, color = "cyan" }) {
  const styles = {
    cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
  };

  return (
    <div
      className={`
        flex
        min-h-[82px]
        min-w-0
        flex-1
        flex-col
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        px-4
        py-4
        ${styles[color]}
        sm:min-w-[105px]
        sm:flex-none
      `}
    >
      <Icon size={19} />

      <span
        className="
          text-center
          text-[10px]
          font-extrabold
        "
      >
        {label}
      </span>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| VALUE CARD
|--------------------------------------------------------------------------
*/

function ValueCard({ icon: Icon, number, title, text, gradient }) {
  const iconStyles = {
    cyan: "bg-cyan-50 text-cyan-600",
    violet: "bg-violet-50 text-violet-600",
    pink: "bg-pink-50 text-pink-600",
    amber: "bg-amber-50 text-amber-600",
  };

  const numberStyles = {
    cyan: "text-cyan-200",
    violet: "text-violet-200",
    pink: "text-pink-200",
    amber: "text-amber-200",
  };

  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white/80
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex items-center justify-between">
        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            ${iconStyles[gradient]}
          `}
        >
          <Icon size={18} />
        </div>

        <span
          className={`
            text-[10px]
            font-black
            tracking-[0.2em]
            ${numberStyles[gradient]}
          `}
        >
          {number}
        </span>
      </div>

      <h3
        className="
          mt-5
          text-sm
          font-extrabold
          text-slate-900
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-xs
          leading-5
          text-slate-500
        "
      >
        {text}
      </p>
    </div>
  );
}
