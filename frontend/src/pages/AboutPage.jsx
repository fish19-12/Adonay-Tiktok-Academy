import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Globe2,
  GraduationCap,
  Lightbulb,
  MapPin,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Video,
} from "lucide-react";

import ceoPhoto from "../assets/images/ceo.jpg";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* ================================================================
          BACKGROUND
      ================================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[#25F4EE]/[0.05] blur-[150px]" />

        <div className="absolute right-[-180px] top-[18%] h-[480px] w-[480px] rounded-full bg-[#FE2C55]/[0.045] blur-[150px]" />

        <div className="absolute bottom-[-220px] left-[30%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.025] blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
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

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        {/* ================================================================
            HERO
        ================================================================= */}

        <section className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          {/* LEFT */}

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#25F4EE]/15 bg-[#25F4EE]/[0.045] px-4 py-2">
              <Sparkles size={14} className="text-[#25F4EE]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#25F4EE]">
                About The Academy
              </span>
            </div>

            <h1 className="mt-7 text-4xl font-black tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Learn to create.
              <span className="block bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
                Learn to grow.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
              Adonay TikTok Academy is a practical learning platform focused on
              TikTok, short-form content, personal branding, and digital growth.
              Our goal is to make content education easier to understand, more
              practical, and more useful in the real world.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#25F4EE]"
              >
                Explore Our Training
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/65 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Get Started
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Small trust row */}

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              <TrustItem icon={GraduationCap} text="Practical Learning" />
              <TrustItem icon={Video} text="Content Focused" />
              <TrustItem icon={Globe2} text="Local & Diaspora" />
            </div>
          </div>

          {/* RIGHT — CEO PHOTO */}

          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-[#25F4EE]/10 via-transparent to-[#FE2C55]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/[0.1] bg-white/[0.025] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
              <div className="relative overflow-hidden rounded-[25px]">
                <img
                  src={ceoPhoto}
                  alt="Adonay - Founder of Adonay TikTok Academy"
                  className="h-[520px] w-full object-cover object-center transition duration-700 hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#25F4EE]">
                      Founder & Academy Lead
                    </p>

                    <h2 className="mt-1 text-xl font-black">Adonay</h2>

                    <p className="mt-1 text-xs text-white/45">
                      Building practical digital skills through content,
                      strategy, and education.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}

            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/10 bg-[#0b0d10]/90 p-4 shadow-2xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25F4EE]/10">
                  <Award size={18} className="text-[#25F4EE]" />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/30">
                    Academy
                  </p>

                  <p className="mt-0.5 text-xs font-bold text-white/80">
                    Learn. Create. Grow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            MISSION
        ================================================================= */}

        <section className="mt-28">
          <div className="grid gap-5 lg:grid-cols-3">
            <MissionCard
              icon={Target}
              number="01"
              title="Our Mission"
              text="To make practical content and digital education accessible to people who want to build stronger skills, brands, businesses, and opportunities online."
            />

            <MissionCard
              icon={Lightbulb}
              number="02"
              title="Our Philosophy"
              text="Information becomes valuable when you know how to apply it. Our learning approach focuses on practical understanding, clear strategy, and real-world execution."
            />

            <MissionCard
              icon={Users}
              number="03"
              title="Our Community"
              text="We are building a learning environment for individuals, professionals, creators, businesses, and future digital leaders from both local and diaspora communities."
            />
          </div>
        </section>

        {/* ================================================================
            ABOUT STORY
        ================================================================= */}

        <section className="mt-28 grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FE2C55]">
              Why We Exist
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Turning digital knowledge into practical skills.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/40">
              Social media has created enormous opportunities for individuals
              and businesses. But having access to a platform does not
              automatically mean knowing how to use it effectively.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/40">
              Adonay TikTok Academy exists to close that gap. Instead of
              overwhelming learners with random information, the academy focuses
              on structured learning, practical strategies, content skills, and
              clear execution.
            </p>

            <div className="mt-7 space-y-3">
              <CheckItem text="Practical and understandable training" />
              <CheckItem text="Content strategy built around real goals" />
              <CheckItem text="Personal branding and digital presence" />
              <CheckItem text="Learning opportunities for local and diaspora students" />
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[30px] border border-white/[0.08] bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <FeatureBox
                  icon={Video}
                  title="Content"
                  text="Learn how to create stronger short-form content."
                />

                <FeatureBox
                  icon={Target}
                  title="Strategy"
                  text="Move from random posting to intentional content."
                />

                <FeatureBox
                  icon={Users}
                  title="Audience"
                  text="Understand how to communicate with the right people."
                />

                <FeatureBox
                  icon={ShieldCheck}
                  title="Confidence"
                  text="Develop practical skills you can continue using."
                />
              </div>

              <div className="mt-6 rounded-2xl border border-[#25F4EE]/10 bg-[#25F4EE]/[0.035] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25F4EE]/10">
                    <Play size={17} className="ml-0.5 text-[#25F4EE]" />
                  </div>

                  <div>
                    <p className="text-sm font-bold">Learn by doing</p>

                    <p className="mt-1 text-xs leading-5 text-white/35">
                      Our approach emphasizes practical exercises,
                      implementation, and real-world content development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            VALUES
        ================================================================= */}

        <section className="mt-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#25F4EE]">
              What We Believe
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Built around practical values.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/40">
              Everything we build is guided by a simple idea: learning should
              lead to action.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ValueCard
              icon={Lightbulb}
              title="Clarity"
              text="We simplify complicated ideas so learners can understand what actually matters."
            />

            <ValueCard
              icon={Target}
              title="Purpose"
              text="Every strategy should connect to a clear personal, professional, or business goal."
            />

            <ValueCard
              icon={Video}
              title="Creativity"
              text="We encourage learners to develop their own voice and create content with intention."
            />

            <ValueCard
              icon={ShieldCheck}
              title="Growth"
              text="The goal is long-term skill development rather than temporary information."
            />
          </div>
        </section>

        {/* ================================================================
            LOCAL + DIASPORA
        ================================================================= */}

        <section className="relative mt-28 overflow-hidden rounded-[32px] border border-white/[0.08] bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-7 sm:p-10 lg:p-12">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#25F4EE]/[0.045] blur-[100px]" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25F4EE]/10">
                  <Globe2 size={21} className="text-[#25F4EE]" />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#25F4EE]">
                    Beyond Borders
                  </p>

                  <h2 className="mt-1 text-xl font-black sm:text-2xl">
                    Built for local & diaspora learners
                  </h2>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40">
                Adonay TikTok Academy is designed with a broader learning
                community in mind. As programs expand, learners from different
                locations will be able to access selected training online or
                through in-person opportunities.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <LocationBadge icon={MapPin} title="Local" text="In-person" />

              <LocationBadge icon={Globe2} title="Diaspora" text="Online" />
            </div>
          </div>
        </section>

        {/* ================================================================
            CTA
        ================================================================= */}

        <section className="relative mt-20 overflow-hidden rounded-[32px] border border-[#25F4EE]/10 bg-gradient-to-br from-[#25F4EE]/[0.055] via-white/[0.025] to-[#FE2C55]/[0.055] p-8 text-center sm:p-12 lg:p-16">
          <div className="absolute left-1/2 top-[-100px] h-64 w-[500px] -translate-x-1/2 rounded-full bg-[#25F4EE]/[0.06] blur-[110px]" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
              <GraduationCap size={24} className="text-[#25F4EE]" />
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-[#25F4EE]">
              Your Next Step
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              Ready to build your digital skills?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/40">
              Explore our available training programs and find the learning
              experience that fits your goals.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#25F4EE]"
              >
                Explore Training
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/65 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Register Now
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ==========================================================================
   TRUST ITEM
   ========================================================================== */

function TrustItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-[#25F4EE]" />

      <span className="text-[10px] font-semibold text-white/35">{text}</span>
    </div>
  );
}

/* ==========================================================================
   MISSION CARD
   ========================================================================== */

function MissionCard({ icon: Icon, number, title, text }) {
  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.04]">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25F4EE]/[0.07]">
          <Icon size={19} className="text-[#25F4EE]" />
        </div>

        <span className="text-[10px] font-black tracking-[0.2em] text-white/15">
          {number}
        </span>
      </div>

      <h3 className="mt-6 text-lg font-black">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-white/35">{text}</p>
    </div>
  );
}

/* ==========================================================================
   CHECK ITEM
   ========================================================================== */

function CheckItem({ text }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#25F4EE]" />

      <span className="text-sm text-white/50">{text}</span>
    </div>
  );
}

/* ==========================================================================
   FEATURE BOX
   ========================================================================== */

function FeatureBox({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.045]">
        <Icon size={17} className="text-[#25F4EE]" />
      </div>

      <h3 className="mt-4 text-sm font-bold">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-white/30">{text}</p>
    </div>
  );
}

/* ==========================================================================
   VALUE CARD
   ========================================================================== */

function ValueCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.04]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
        <Icon size={18} className="text-[#25F4EE]" />
      </div>

      <h3 className="mt-5 text-sm font-bold">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-white/35">{text}</p>
    </div>
  );
}

/* ==========================================================================
   LOCATION BADGE
   ========================================================================== */

function LocationBadge({ icon: Icon, title, text }) {
  return (
    <div className="flex min-w-[110px] flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-black/20 px-5 py-5">
      <Icon size={19} className="text-[#25F4EE]" />

      <p className="mt-2 text-xs font-bold text-white/70">{title}</p>

      <p className="mt-1 text-[9px] text-white/30">{text}</p>
    </div>
  );
}
