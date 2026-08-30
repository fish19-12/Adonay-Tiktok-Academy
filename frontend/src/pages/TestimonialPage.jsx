import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Quote,
  Star,
  Sparkles,
  MapPin,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| TESTIMONIAL DATA
|--------------------------------------------------------------------------
*/

const testimonials = [
  {
    id: 1,
    name: "Mekdes T.",
    role: "Real Estate Agent",
    location: "Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&auto=format&fit=crop&q=85",
    quote:
      "I learned how to use TikTok to build trust, show properties, and present myself more confidently online.",
    result: "More confident on camera",
  },
  {
    id: 2,
    name: "Samuel K.",
    role: "Real Estate Professional",
    location: "Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=85",
    quote:
      "The training gave me a clear way to turn my real estate knowledge into content people actually want to watch.",
    result: "Clearer content strategy",
  },
  {
    id: 3,
    name: "Hana M.",
    role: "Entrepreneur",
    location: "Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=85",
    quote:
      "I stopped wondering what to post. Now I have a simple system for turning my ideas into short videos.",
    result: "Better content planning",
  },
  {
    id: 4,
    name: "Dawit A.",
    role: "Business Owner",
    location: "Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=85",
    quote:
      "I understood that content is not just about going viral. It is about becoming recognizable and trusted.",
    result: "Stronger personal brand",
  },
  {
    id: 5,
    name: "Rahel S.",
    role: "Digital Creator",
    location: "Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&auto=format&fit=crop&q=85",
    quote:
      "The hook, story, and call-to-action framework made creating short videos much easier.",
    result: "Better videos",
  },
  {
    id: 6,
    name: "Yonas B.",
    role: "Property Consultant",
    location: "Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=85",
    quote:
      "Instead of random TikTok tips, I finally have a repeatable system for my real estate content.",
    result: "Repeatable content system",
  },
];

/*
|--------------------------------------------------------------------------
| VIDEO STORIES
|--------------------------------------------------------------------------
*/

const videoTestimonials = [
  {
    id: 1,
    title: "My TikTok Journey",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&auto=format&fit=crop&q=85",
    duration: "01:24",
  },
  {
    id: 2,
    title: "From Ideas to Content",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1000&auto=format&fit=crop&q=85",
    duration: "02:08",
  },
  {
    id: 3,
    title: "Why I Joined",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=85",
    duration: "01:46",
  },
];

/*
|--------------------------------------------------------------------------
| MAIN PAGE
|--------------------------------------------------------------------------
*/

export default function TestimonialPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/40 text-slate-900">
      {/* ================================================================
          GLOBAL DECORATIVE BACKGROUND
      ================================================================= */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Cyan glow */}

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-300/20 blur-3xl" />

        {/* Violet glow */}

        <div className="absolute right-[-180px] top-[25%] h-[520px] w-[520px] rounded-full bg-violet-300/15 blur-3xl" />

        {/* Pink glow */}

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-pink-300/20 blur-3xl" />

        {/* Center soft glow */}

        <div className="absolute left-[40%] top-[45%] h-[420px] w-[420px] rounded-full bg-cyan-200/10 blur-3xl" />

        {/* Subtle grid */}

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ================================================================
          TOP ACCENT
      ================================================================= */}

      <div className="relative z-20 h-1 w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />

      {/* ================================================================
          HERO
      ================================================================= */}

      <section className="relative z-10 px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:px-10 lg:pb-28 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            {/* ========================================================
                LEFT
            ======================================================== */}

            <div className="min-w-0">
              {/* Label */}

              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-3.5 py-2 shadow-sm backdrop-blur-xl">
                <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />

                <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-slate-500">
                  Student Stories
                </span>
              </div>

              {/* Heading */}

              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-900 sm:text-6xl lg:text-[76px]">
                Become the agent
                <span className="block bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                  people remember.
                </span>
              </h1>

              {/* Description */}

              <p className="mt-7 max-w-xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
                See how real estate professionals are using content to become
                more visible, trusted, confident, and memorable online.
              </p>

              {/* CTA */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="
                    group
                    inline-flex
                    min-h-[52px]
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-400
                    via-violet-500
                    to-pink-500
                    px-6
                    py-3.5
                    text-sm
                    font-extrabold
                    text-white
                    shadow-[0_15px_40px_rgba(99,102,241,0.18)]
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_20px_50px_rgba(99,102,241,0.25)]
                    sm:w-auto
                  "
                >
                  Register Now
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>

                <a
                  href="#stories"
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
                    bg-white/80
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    text-slate-700
                    shadow-sm
                    backdrop-blur-xl
                    transition
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-cyan-200
                    hover:bg-cyan-50
                    hover:text-cyan-700
                    sm:w-auto
                  "
                >
                  <Play
                    size={14}
                    fill="currentColor"
                    className="text-cyan-500"
                  />
                  Explore Stories
                </a>
              </div>

              {/* Trust */}

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <div className="flex -space-x-2">
                  {testimonials.slice(0, 4).map((student) => (
                    <img
                      key={student.id}
                      src={student.image}
                      alt=""
                      className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ))}
                </div>

                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        fill="currentColor"
                        className="text-amber-400"
                      />
                    ))}
                  </div>

                  <p className="mt-1 text-[10px] font-medium text-slate-400">
                    Real learning experiences
                  </p>
                </div>
              </div>
            </div>

            {/* ========================================================
                FEATURED TESTIMONIAL
            ======================================================== */}

            <div className="relative min-w-0">
              {/* Glow */}

              <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-cyan-200/30 via-violet-200/20 to-pink-200/30 blur-2xl" />

              <article
                className="
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-slate-200/80
                  bg-white/90
                  p-6
                  shadow-[0_25px_80px_rgba(15,23,42,0.10)]
                  backdrop-blur-xl
                  sm:p-8
                "
              >
                {/* Decorative gradient */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    right-[-80px]
                    top-[-80px]
                    h-48
                    w-48
                    rounded-full
                    bg-cyan-200/40
                    blur-3xl
                  "
                />

                {/* Top */}

                <div className="relative flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-50 to-violet-50 ring-1 ring-cyan-100">
                    <Quote size={19} className="text-cyan-500" />
                  </div>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={13}
                        fill="currentColor"
                        className="text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Featured label */}

                <div className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 ring-1 ring-cyan-100">
                  <CheckCircle2 size={12} className="text-cyan-600" />

                  <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-cyan-700">
                    Featured Experience
                  </span>
                </div>

                {/* Quote */}

                <blockquote className="relative mt-6 text-xl font-bold leading-[1.45] tracking-tight text-slate-800 sm:text-2xl">
                  “{testimonials[0].quote}”
                </blockquote>

                {/* Person */}

                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
                  <img
                    src={testimonials[0].image}
                    alt={testimonials[0].name}
                    className="h-12 w-12 rounded-2xl object-cover shadow-sm ring-2 ring-white"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-slate-900">
                      {testimonials[0].name}
                    </p>

                    <p className="mt-1 text-[11px] font-medium text-slate-400">
                      {testimonials[0].role}
                    </p>
                  </div>

                  <div className="ml-auto rounded-xl bg-gradient-to-br from-cyan-50 to-violet-50 px-3 py-2 ring-1 ring-cyan-100">
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-cyan-600">
                      Result
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-600">
                      {testimonials[0].result}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          DIVIDER
      ================================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      {/* ================================================================
          TESTIMONIALS
      ================================================================= */}

      <section
        id="stories"
        className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          {/* Header */}

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 ring-1 ring-violet-100">
                <MessageCircle size={13} className="text-violet-500" />

                <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-violet-600">
                  Real Experiences
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                What they learned.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Practical skills, stronger content, better confidence, and a
                clearer strategy for building a memorable digital presence.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Star size={14} fill="currentColor" className="text-amber-400" />
              Real student perspectives
            </div>
          </div>

          {/* Cards */}

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(1).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          STATS / TRUST STRIP
      ================================================================= */}

      <section className="relative z-10 px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-[26px] border border-slate-200 bg-white/80 shadow-[0_15px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:grid-cols-3">
            <TrustItem
              number="01"
              title="Practical"
              text="Learn strategies you can apply in the real world."
            />

            <TrustItem
              number="02"
              title="Focused"
              text="Build content around your goals and audience."
            />

            <TrustItem
              number="03"
              title="Actionable"
              text="Turn knowledge into content you can actually create."
            />
          </div>
        </div>
      </section>

      {/* ================================================================
          VIDEO STORIES
      ================================================================= */}

      <section className="relative z-10 border-y border-slate-200 bg-white/60 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1.5 ring-1 ring-pink-100">
                <Play size={12} fill="currentColor" className="text-pink-500" />

                <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-pink-600">
                  Watch
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Hear it from them.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Short stories from learners sharing what they discovered,
                created, and changed through their content journey.
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs font-semibold text-slate-400 sm:flex">
              <Play size={13} fill="currentColor" className="text-cyan-500" />
              Student stories
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {videoTestimonials.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ACADEMY METHOD
      ================================================================= */}

      <section className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            {/* LEFT */}

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-violet-50 ring-1 ring-cyan-100">
                <Sparkles size={20} className="text-violet-500" />
              </div>

              <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.22em] text-cyan-600">
                The Academy Method
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Learn it.
                <br />
                Create it.
                <br />
                Grow with it.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">
                A simple learning approach designed to help real estate
                professionals understand content, create confidently, and build
                a stronger digital presence.
              </p>
            </div>

            {/* RIGHT */}

            <div className="grid gap-4 sm:grid-cols-3">
              <MethodCard
                number="01"
                title="Learn"
                text="Understand what makes short-form content useful, engaging, and relevant."
              />

              <MethodCard
                number="02"
                title="Create"
                text="Turn your real estate knowledge, ideas, and expertise into useful videos."
              />

              <MethodCard
                number="03"
                title="Grow"
                text="Build visibility, trust, confidence, and a recognizable personal brand."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
      ================================================================= */}

      <section className="relative z-10 px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10 lg:pb-32">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-pink-50 px-6 py-14 text-center shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:px-12 sm:py-16">
          {/* Decorative glows */}

          <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-pink-300/20 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
              <Sparkles size={21} className="text-violet-500" />
            </div>

            <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.22em] text-violet-600">
              Your Story Could Be Next
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Build a brand people remember.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
              Start developing your content skills and learn how to turn your
              expertise into a stronger digital presence.
            </p>

            <div className="mt-8">
              <Link
                to="/register"
                className="
                  group
                  inline-flex
                  min-h-[52px]
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-400
                  via-violet-500
                  to-pink-500
                  px-7
                  py-4
                  text-sm
                  font-extrabold
                  text-white
                  shadow-[0_15px_40px_rgba(99,102,241,0.18)]
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_20px_50px_rgba(99,102,241,0.25)]
                  sm:w-auto
                "
              >
                Register Now
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| TESTIMONIAL CARD
|--------------------------------------------------------------------------
*/

function TestimonialCard({ testimonial }) {
  return (
    <article
      className="
        group
        relative
        flex
        min-w-0
        flex-col
        overflow-hidden
        rounded-[26px]
        border
        border-slate-200/80
        bg-white/85
        p-6
        shadow-[0_12px_45px_rgba(15,23,42,0.05)]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-200
        hover:shadow-[0_20px_60px_rgba(15,23,42,0.09)]
      "
    >
      {/* Decorative glow */}

      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-100/70 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative">
        {/* Rating */}

        <div className="flex items-center justify-between">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                fill="currentColor"
                className="text-amber-400"
              />
            ))}
          </div>

          <Quote size={18} className="text-slate-200" />
        </div>

        {/* Quote */}

        <p className="mt-6 break-words text-sm font-medium leading-7 text-slate-600">
          “{testimonial.quote}”
        </p>

        {/* Result */}

        <div className="mt-6 rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-violet-50 p-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="shrink-0 text-cyan-600" />

            <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-cyan-700">
              Result
            </span>
          </div>

          <p className="mt-1 text-xs font-bold text-slate-700">
            {testimonial.result}
          </p>
        </div>

        {/* Person */}

        <div className="mt-6 flex min-w-0 items-center gap-3 border-t border-slate-100 pt-5">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-11 w-11 shrink-0 rounded-xl object-cover shadow-sm"
          />

          <div className="min-w-0 flex-1">
            <p className="break-words text-xs font-extrabold text-slate-900">
              {testimonial.name}
            </p>

            <p className="mt-1 break-words text-[10px] font-medium leading-4 text-slate-400">
              {testimonial.role}
            </p>

            <div className="mt-1 flex items-center gap-1">
              <MapPin size={10} className="shrink-0 text-slate-300" />

              <span className="text-[9px] font-medium text-slate-400">
                {testimonial.location}
              </span>
            </div>
          </div>

          <ArrowUpRight
            size={15}
            className="shrink-0 text-slate-200 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-500"
          />
        </div>
      </div>
    </article>
  );
}

/*
|--------------------------------------------------------------------------
| VIDEO CARD
|--------------------------------------------------------------------------
*/

function VideoCard({ video }) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[26px]
        border
        border-slate-200
        bg-white
        shadow-[0_12px_45px_rgba(15,23,42,0.06)]
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_60px_rgba(15,23,42,0.10)]
      "
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={video.image}
          alt={video.title}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-105
          "
        />

        {/* Image overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

        {/* Play button */}

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-white/50
              bg-white/90
              shadow-xl
              backdrop-blur-md
              transition
              duration-300
              group-hover:scale-110
              group-hover:bg-cyan-400
            "
          >
            <Play
              size={18}
              fill="currentColor"
              className="ml-0.5 text-slate-900"
            />
          </div>
        </div>

        {/* Duration */}

        <span
          className="
            absolute
            right-4
            top-4
            rounded-lg
            border
            border-white/20
            bg-black/40
            px-2.5
            py-1.5
            text-[9px]
            font-bold
            text-white
            backdrop-blur-md
          "
        >
          {video.duration}
        </span>

        {/* Bottom text */}

        <div className="absolute bottom-4 left-4 right-4">
          <p className="break-words text-sm font-extrabold text-white">
            {video.title}
          </p>

          <p className="mt-1 text-[10px] font-medium text-white/65">
            Student experience
          </p>
        </div>
      </div>
    </article>
  );
}

/*
|--------------------------------------------------------------------------
| TRUST ITEM
|--------------------------------------------------------------------------
*/

function TrustItem({ number, title, text }) {
  return (
    <div className="group border-b border-slate-100 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black tracking-[0.2em] text-cyan-500">
          {number}
        </span>

        <ArrowUpRight
          size={15}
          className="text-slate-200 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-500"
        />
      </div>

      <h3 className="mt-5 text-base font-black text-slate-900">{title}</h3>

      <p className="mt-2 text-xs leading-6 text-slate-500">{text}</p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| METHOD CARD
|--------------------------------------------------------------------------
*/

function MethodCard({ number, title, text }) {
  return (
    <div
      className="
        group
        rounded-[24px]
        border
        border-slate-200
        bg-white/85
        p-6
        shadow-[0_10px_35px_rgba(15,23,42,0.04)]
        transition
        duration-300
        hover:-translate-y-1
        hover:border-cyan-200
        hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-black tracking-[0.2em] text-cyan-500">
          {number}
        </span>

        <ArrowUpRight
          size={15}
          className="text-slate-200 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-500"
        />
      </div>

      <h3 className="mt-7 text-base font-black text-slate-900">{title}</h3>

      <p className="mt-2 break-words text-xs leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}
