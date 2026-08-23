import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Play,
  Quote,
  Sparkles,
  Star,
  Users,
  Video,
  TrendingUp,
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
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    featured: true,
    quote:
      "The training completely changed the way I think about TikTok. I used to see it as entertainment, but now I understand how to use content strategically to build trust and attract potential clients.",
    result: "More confident on camera",
    category: "Real Estate Training",
  },
  {
    id: 2,
    name: "Samuel K.",
    role: "Real Estate Professional",
    location: "Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    featured: false,
    quote:
      "What I liked most was that the training was practical. I didn't just receive information. I learned how to think about content, create ideas, and turn my expertise into videos.",
    result: "Clearer content strategy",
    category: "Real Estate Training",
  },
  {
    id: 3,
    name: "Hana M.",
    role: "Entrepreneur",
    location: "Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    featured: false,
    quote:
      "Before the training, I had many ideas but didn't know what to post. Now I have a much better understanding of how to turn my ideas into useful short-form content.",
    result: "Better content planning",
    category: "Content Strategy",
  },
  {
    id: 4,
    name: "Dawit A.",
    role: "Business Owner",
    location: "Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    featured: false,
    quote:
      "The biggest difference for me was understanding that good TikTok content is not just about going viral. It's about communicating your message clearly and consistently.",
    result: "Stronger personal brand",
    category: "Personal Branding",
  },
  {
    id: 5,
    name: "Rahel S.",
    role: "Digital Creator",
    location: "Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    featured: false,
    quote:
      "I finally understand how to structure a short video from the hook to the call to action. That alone made creating content feel much easier.",
    result: "More effective videos",
    category: "Content Creation",
  },
  {
    id: 6,
    name: "Yonas B.",
    role: "Property Consultant",
    location: "Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    featured: false,
    quote:
      "The training gave me a system instead of random TikTok tips. I now know what kind of content I should create and why I am creating it.",
    result: "A repeatable content system",
    category: "Real Estate Training",
  },
];

/*
|--------------------------------------------------------------------------
| VIDEO TESTIMONIALS
|--------------------------------------------------------------------------
*/

const videoTestimonials = [
  {
    id: 1,
    name: "Student Experience",
    role: "Real Estate Training",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&auto=format&fit=crop&q=85",
    duration: "01:24",
  },
  {
    id: 2,
    name: "Learning Journey",
    role: "Content Strategy",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1000&auto=format&fit=crop&q=85",
    duration: "02:08",
  },
  {
    id: 3,
    name: "Why I Joined",
    role: "TikTok Training",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=85",
    duration: "01:46",
  },
];

/*
|--------------------------------------------------------------------------
| MAIN COMPONENT
|--------------------------------------------------------------------------
*/

export default function TestimonialPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* ================================================================
          GLOBAL BACKGROUND
      ================================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[#25F4EE]/[0.045] blur-[150px]" />

        <div className="absolute right-[-180px] top-[18%] h-[500px] w-[500px] rounded-full bg-[#FE2C55]/[0.04] blur-[150px]" />

        <div className="absolute bottom-[10%] left-[35%] h-[450px] w-[450px] rounded-full bg-violet-500/[0.025] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* ================================================================
          HERO
      ================================================================= */}

      <section className="relative z-10 px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            {/* LEFT */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#25F4EE]/15 bg-[#25F4EE]/[0.045] px-4 py-2">
                <Sparkles size={14} className="text-[#25F4EE]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#25F4EE]">
                  Student Stories
                </span>
              </div>

              <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                Real people.
                <span className="block bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
                  Real growth.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
                Discover how students and professionals are using practical
                TikTok training, content strategy, and personal branding to
                build stronger digital skills.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#25F4EE] px-6 py-3.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Start Your Journey
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="#video-stories"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-6 py-3.5 text-sm font-semibold text-white/65 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                >
                  <Play size={15} />
                  Watch Stories
                </a>
              </div>

              {/* TRUST */}

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {testimonials.slice(0, 4).map((student) => (
                      <img
                        key={student.id}
                        src={student.image}
                        alt=""
                        className="h-8 w-8 rounded-full border-2 border-[#050505] object-cover"
                      />
                    ))}
                  </div>

                  <div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={11}
                          fill="currentColor"
                          className="text-[#25F4EE]"
                        />
                      ))}
                    </div>

                    <p className="mt-1 text-[10px] font-semibold text-white/35">
                      Student experiences
                    </p>
                  </div>
                </div>

                <div className="hidden h-8 w-px bg-white/10 sm:block" />

                <div>
                  <p className="text-xl font-black">Practical</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                    Learning approach
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT FEATURED TESTIMONIAL */}

            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-[#25F4EE]/[0.025] blur-3xl" />

              <div className="relative overflow-hidden rounded-[30px] border border-white/[0.09] bg-gradient-to-br from-white/[0.06] to-white/[0.018] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25F4EE]/10">
                      <Quote size={17} className="text-[#25F4EE]" />
                    </div>

                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      Featured Story
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={13}
                        fill="currentColor"
                        className="text-[#25F4EE]"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="mt-8 text-xl font-semibold leading-8 tracking-tight text-white/85 sm:text-2xl">
                  “{testimonials[0].quote}”
                </blockquote>

                <div className="mt-8 flex items-center gap-4 border-t border-white/[0.07] pt-6">
                  <img
                    src={testimonials[0].image}
                    alt={testimonials[0].name}
                    className="h-12 w-12 rounded-2xl object-cover"
                  />

                  <div>
                    <p className="text-sm font-bold">{testimonials[0].name}</p>

                    <p className="mt-1 text-xs text-white/35">
                      {testimonials[0].role} · {testimonials[0].location}
                    </p>
                  </div>

                  <div className="ml-auto hidden rounded-lg border border-[#25F4EE]/10 bg-[#25F4EE]/[0.05] px-3 py-2 sm:block">
                    <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#25F4EE]">
                      Result
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-white/50">
                      {testimonials[0].result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TRUST STATS
      ================================================================= */}

      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-3">
          <Stat
            icon={Users}
            value="Students"
            label="Focused on practical learning"
          />

          <Stat
            icon={TrendingUp}
            value="Growth"
            label="Strategy before random posting"
          />

          <Stat
            icon={CheckCircle2}
            value="Practical"
            label="Skills designed for real use"
          />
        </div>
      </section>

      {/* ================================================================
          TESTIMONIAL GRID
      ================================================================= */}

      <section className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What Students Say"
            title="Experiences that speak for themselves."
            description="Every learner starts from a different place. The goal is the same: understand the strategy, practice the skill, and become more confident creating content."
          />

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

      <section
        id="video-stories"
        className="relative z-10 border-y border-white/[0.06] bg-white/[0.012] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FE2C55]/15 bg-[#FE2C55]/[0.04] px-4 py-2">
                <Video size={13} className="text-[#FE2C55]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#FE2C55]">
                  Video Stories
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                Hear the experience.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/40">
                Short student stories are one of the best ways to understand
                what the learning experience feels like.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-white/30">
              <Play size={14} className="text-[#25F4EE]" />
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
          EXPERIENCE BREAKDOWN
      ================================================================= */}

      <section className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            {/* LEFT */}

            <div className="rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-[#25F4EE]/[0.05] to-white/[0.015] p-7 sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25F4EE]/10">
                <MessageCircle size={21} className="text-[#25F4EE]" />
              </div>

              <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.22em] text-[#25F4EE]">
                The Academy Difference
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                Learning should lead to action.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/40">
                We focus on helping learners understand how content works,
                develop a strategy, and actually apply what they learn.
              </p>

              <Link
                to="/services"
                className="group mt-7 inline-flex items-center gap-2 text-xs font-bold text-white/65 transition hover:text-[#25F4EE]"
              >
                Explore our training
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* RIGHT */}

            <div className="grid gap-4 sm:grid-cols-2">
              <ExperienceCard
                number="01"
                title="Understand"
                text="Learn the fundamentals behind TikTok, content, and personal branding."
              />

              <ExperienceCard
                number="02"
                title="Practice"
                text="Turn concepts into practical exercises instead of simply watching lessons."
              />

              <ExperienceCard
                number="03"
                title="Create"
                text="Build content ideas and systems that fit your goals and audience."
              />

              <ExperienceCard
                number="04"
                title="Improve"
                text="Develop the confidence to keep testing, learning, and improving."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
      ================================================================= */}

      <section className="relative z-10 px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-[#25F4EE]/10 bg-gradient-to-br from-[#25F4EE]/[0.06] via-white/[0.025] to-[#FE2C55]/[0.055] p-8 text-center sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute left-1/2 top-[-100px] h-64 w-[500px] -translate-x-1/2 rounded-full bg-[#25F4EE]/[0.06] blur-[100px]" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
              <Sparkles size={23} className="text-[#25F4EE]" />
            </div>

            <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.25em] text-[#25F4EE]">
              Your Story Could Be Next
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Ready to build your digital skills?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40">
              Start with the training currently available and take the first
              step toward creating better, more strategic content.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-[#25F4EE]"
              >
                Register for Training
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/65 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                View Services
                <ChevronRight size={16} />
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
| SECTION HEADING
|--------------------------------------------------------------------------
*/

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#25F4EE]">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-white/40">{description}</p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| STAT
|--------------------------------------------------------------------------
*/

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-4 border-white/[0.06] p-6 sm:border-r sm:p-7 last:sm:border-r-0">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
        <Icon size={19} className="text-[#25F4EE]" />
      </div>

      <div>
        <p className="text-sm font-black text-white">{value}</p>

        <p className="mt-1 text-[10px] leading-4 text-white/30">{label}</p>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| TESTIMONIAL CARD
|--------------------------------------------------------------------------
*/

function TestimonialCard({ testimonial }) {
  return (
    <article className="group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#25F4EE]/15 hover:bg-white/[0.04]">
      <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-[#25F4EE]/[0.025] blur-[70px] transition duration-500 group-hover:bg-[#25F4EE]/[0.06]" />

      <div className="relative">
        <div className="flex items-center justify-between">
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

          <Quote size={18} className="text-white/10" />
        </div>

        <p className="mt-6 text-sm leading-7 text-white/55">
          “{testimonial.quote}”
        </p>

        <div className="mt-7 flex items-center gap-3 border-t border-white/[0.07] pt-5">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-11 w-11 rounded-xl object-cover"
          />

          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-white/85">
              {testimonial.name}
            </p>

            <p className="mt-1 truncate text-[10px] text-white/30">
              {testimonial.role} · {testimonial.location}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2.5">
          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/25">
            Outcome
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
    <article className="group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.025]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={video.image}
          alt={video.name}
          className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-80"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/10" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/45 backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:border-[#25F4EE]/40 group-hover:bg-[#25F4EE]">
            <Play
              size={19}
              fill="currentColor"
              className="ml-0.5 text-white group-hover:text-black"
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold">{video.name}</p>

            <p className="mt-1 text-[10px] text-white/50">{video.role}</p>
          </div>

          <span className="rounded-md bg-black/50 px-2 py-1 text-[9px] font-bold text-white/70 backdrop-blur-md">
            {video.duration}
          </span>
        </div>
      </div>
    </article>
  );
}

/*
|--------------------------------------------------------------------------
| EXPERIENCE CARD
|--------------------------------------------------------------------------
*/

function ExperienceCard({ number, title, text }) {
  return (
    <div className="group rounded-[22px] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.04]">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-black tracking-[0.2em] text-[#25F4EE]/60">
          {number}
        </span>

        <ArrowUpRight
          size={16}
          className="text-white/15 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#25F4EE]"
        />
      </div>

      <h3 className="mt-6 text-base font-black">{title}</h3>

      <p className="mt-2 text-xs leading-6 text-white/35">{text}</p>
    </div>
  );
}
