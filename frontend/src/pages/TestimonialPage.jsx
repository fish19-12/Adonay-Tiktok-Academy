import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Quote,
  Star,
  Sparkles,
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
    <main className="relative min-h-screen overflow-hidden bg-[#070809] text-white">
      {/* ================================================================
          ANIMATED BACKGROUND
      ================================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Cyan glow */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#25F4EE]/[0.055] blur-[130px] animate-pulse" />

        {/* Pink glow */}
        <div className="absolute -right-40 top-[25%] h-[500px] w-[500px] rounded-full bg-[#FE2C55]/[0.045] blur-[140px]" />

        {/* Center glow */}
        <div className="absolute bottom-[-250px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#25F4EE]/[0.025] blur-[150px]" />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ================================================================
          HERO
      ================================================================= */}

      <section className="relative z-10 px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
            {/* LEFT CONTENT */}

            <div>
              {/* Small label */}

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25F4EE] shadow-[0_0_12px_#25F4EE]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Student Stories
                </span>
              </div>

              {/* Heading */}

              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[78px]">
                Become the agent
                <span className="block bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
                  people remember.
                </span>
              </h1>

              {/* Description */}

              <p className="mt-7 max-w-lg text-sm leading-7 text-white/45 sm:text-base">
                See how real estate professionals are using content to become
                more visible, trusted, and memorable.
              </p>

              {/* CTA */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] px-6 py-3.5 text-sm font-bold text-black shadow-[0_15px_40px_rgba(37,244,238,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(254,44,85,0.16)]"
                >
                  Register Now
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="#stories"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-6 py-3.5 text-sm font-semibold text-white/70 backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                >
                  <Play size={14} className="fill-current text-[#25F4EE]" />
                  Explore Stories
                </a>
              </div>

              {/* Mini trust */}

              <div className="mt-9 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {testimonials.slice(0, 4).map((student) => (
                    <img
                      key={student.id}
                      src={student.image}
                      alt=""
                      className="h-8 w-8 rounded-full border-2 border-[#070809] object-cover"
                    />
                  ))}
                </div>

                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={11}
                        fill="currentColor"
                        className="text-[#25F4EE]"
                      />
                    ))}
                  </div>

                  <p className="mt-1 text-[10px] text-white/30">
                    Real learning experiences
                  </p>
                </div>
              </div>
            </div>

            {/* FEATURED TESTIMONIAL */}

            <div className="relative">
              {/* Glow */}

              <div className="absolute -inset-8 rounded-[50px] bg-[#25F4EE]/[0.025] blur-3xl" />

              <article className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl transition duration-500 hover:border-white/15 sm:p-9">
                {/* Top line */}

                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25F4EE]/10">
                    <Quote size={18} className="text-[#25F4EE]" />
                  </div>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        fill="currentColor"
                        className="text-[#25F4EE]"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote */}

                <blockquote className="mt-8 text-2xl font-semibold leading-[1.35] tracking-tight text-white/90 sm:text-[28px]">
                  “{testimonials[0].quote}”
                </blockquote>

                {/* Person */}

                <div className="mt-9 flex items-center gap-3 border-t border-white/[0.07] pt-6">
                  <img
                    src={testimonials[0].image}
                    alt={testimonials[0].name}
                    className="h-12 w-12 rounded-2xl object-cover"
                  />

                  <div>
                    <p className="text-sm font-bold">{testimonials[0].name}</p>

                    <p className="mt-1 text-[11px] text-white/35">
                      {testimonials[0].role}
                    </p>
                  </div>

                  <div className="ml-auto hidden rounded-lg bg-[#25F4EE]/[0.07] px-3 py-2 sm:block">
                    <p className="text-[8px] uppercase tracking-[0.15em] text-[#25F4EE]/70">
                      Result
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-white/55">
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
          SIMPLE DIVIDER
      ================================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ================================================================
          TESTIMONIALS
      ================================================================= */}

      <section
        id="stories"
        className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading */}

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#25F4EE]">
                Real Experiences
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                What they learned.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/35">
              Practical skills. Better content. More confidence.
            </p>
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
          VIDEO STORIES
      ================================================================= */}

      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.012] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#FE2C55]">
                Watch
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Hear it from them.
              </h2>
            </div>

            <div className="hidden items-center gap-2 text-xs text-white/30 sm:flex">
              <Play size={13} fill="currentColor" className="text-[#25F4EE]" />
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
          SIMPLE PROCESS
      ================================================================= */}

      <section className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            {/* LEFT */}

            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25F4EE]/10">
                <Sparkles size={19} className="text-[#25F4EE]" />
              </div>

              <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.22em] text-[#25F4EE]">
                The Academy Method
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Learn it.
                <br />
                Create it.
                <br />
                Grow with it.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/35">
                A simple approach built for real estate professionals who want
                to use short-form content with purpose.
              </p>
            </div>

            {/* RIGHT */}

            <div className="grid gap-3 sm:grid-cols-3">
              <MethodCard
                number="01"
                title="Learn"
                text="Understand what makes content work."
              />

              <MethodCard
                number="02"
                title="Create"
                text="Turn your expertise into videos."
              />

              <MethodCard
                number="03"
                title="Grow"
                text="Build visibility and trust."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
      ================================================================= */}

      <section className="relative z-10 px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] px-7 py-14 text-center backdrop-blur-xl sm:px-12 sm:py-16">
          {/* Glow */}

          <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-[#25F4EE]/[0.06] blur-[120px]" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#25F4EE]/20 to-[#FE2C55]/20">
              <Sparkles size={20} className="text-[#25F4EE]" />
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Your story could be next.
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/35">
              Start building a real estate brand people remember.
            </p>

            <div className="mt-8">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] px-7 py-4 text-sm font-bold text-black shadow-[0_15px_40px_rgba(37,244,238,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(254,44,85,0.18)]"
              >
                Register Now
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
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
    <article className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#25F4EE]/20 hover:bg-white/[0.04]">
      {/* Hover glow */}

      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#25F4EE]/[0.025] blur-[70px] transition duration-500 group-hover:bg-[#25F4EE]/[0.06]" />

      <div className="relative">
        {/* Rating */}

        <div className="flex items-center justify-between">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={11}
                fill="currentColor"
                className="text-[#25F4EE]"
              />
            ))}
          </div>

          <Quote size={17} className="text-white/10" />
        </div>

        {/* Quote */}

        <p className="mt-6 text-sm leading-7 text-white/55">
          “{testimonial.quote}”
        </p>

        {/* Person */}

        <div className="mt-7 flex items-center gap-3 border-t border-white/[0.07] pt-5">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-10 w-10 rounded-xl object-cover"
          />

          <div className="min-w-0">
            <p className="text-xs font-bold text-white/90">
              {testimonial.name}
            </p>

            <p className="mt-1 truncate text-[10px] text-white/30">
              {testimonial.role}
            </p>
          </div>
        </div>

        {/* Result */}

        <div className="mt-5 flex items-center justify-between rounded-lg bg-[#25F4EE]/[0.045] px-3 py-2.5">
          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/25">
            Result
          </span>

          <span className="text-[10px] font-semibold text-[#25F4EE]/70">
            {testimonial.result}
          </span>
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
    <article className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={video.image}
          alt={video.title}
          className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
        />

        {/* Dark gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

        {/* Play */}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:border-[#25F4EE]/50 group-hover:bg-[#25F4EE]">
            <Play
              size={18}
              fill="currentColor"
              className="ml-0.5 text-white group-hover:text-black"
            />
          </div>
        </div>

        {/* Bottom */}

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold">{video.title}</p>

            <p className="mt-1 text-[10px] text-white/40">Student experience</p>
          </div>

          <span className="rounded-md bg-black/50 px-2 py-1 text-[9px] font-semibold text-white/65 backdrop-blur-md">
            {video.duration}
          </span>
        </div>
      </div>
    </article>
  );
}

/*
|--------------------------------------------------------------------------
| METHOD CARD
|--------------------------------------------------------------------------
*/

function MethodCard({ number, title, text }) {
  return (
    <div className="group rounded-[22px] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#25F4EE]/15 hover:bg-white/[0.04]">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-black tracking-[0.18em] text-[#25F4EE]/60">
          {number}
        </span>

        <ArrowUpRight
          size={15}
          className="text-white/15 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#25F4EE]"
        />
      </div>

      <h3 className="mt-7 text-base font-black">{title}</h3>

      <p className="mt-2 text-xs leading-6 text-white/35">{text}</p>
    </div>
  );
}
