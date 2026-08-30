import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
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

/*
|--------------------------------------------------------------------------
| ABOUT PAGE
|--------------------------------------------------------------------------
| Modern light design matching the Footer:
| - Slate / white foundation
| - Cyan / violet / pink gradients
| - Soft background glows
| - Glass-style cards
| - Fully responsive
| - Strong readable text
|--------------------------------------------------------------------------
*/

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/40 text-slate-900">
      {/* ================================================================
          BACKGROUND
      ================================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Cyan glow */}
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-300/20 blur-[120px]" />

        {/* Pink glow */}
        <div className="absolute -right-40 top-[18%] h-[520px] w-[520px] rounded-full bg-pink-300/15 blur-[130px]" />

        {/* Violet glow */}
        <div className="absolute bottom-[-220px] left-[30%] h-[520px] w-[520px] rounded-full bg-violet-300/15 blur-[130px]" />

        {/* Center soft glow */}
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

      {/* ================================================================
          TOP ACCENT
      ================================================================= */}

      <div className="relative z-20 h-1 w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />

      {/* ================================================================
          PAGE CONTENT
      ================================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {/* ==============================================================
            HERO
        ============================================================== */}

        <section className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          {/* LEFT CONTENT */}

          <div>
            {/* Label */}

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 shadow-sm backdrop-blur-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-white">
                <Sparkles size={12} strokeWidth={2.5} />
              </span>

              <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-slate-600">
                About The Academy
              </span>
            </div>

            {/* Heading */}

            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-6xl xl:text-[68px]">
              Learn with purpose.
              <span className="block bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                Create with confidence.
              </span>
            </h1>

            {/* Description */}

            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Adonay TikTok Academy is a practical learning platform focused on
              TikTok, short-form content, personal branding, and digital growth.
              Our goal is to make digital education easier to understand, more
              practical, and more useful in the real world.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
              We help creators, entrepreneurs, professionals, agents, and
              businesses develop the skills they need to communicate their
              ideas, build their presence, and grow their influence online.
            </p>

            {/* CTA */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_15px_35px_rgba(99,102,241,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(99,102,241,0.25)]"
              >
                Explore Our Training
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
              >
                Get Started
                <ChevronRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Trust */}

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4">
              <TrustItem icon={GraduationCap} text="Practical Learning" />
              <TrustItem icon={Video} text="Content Focused" />
              <TrustItem icon={Globe2} text="Local & Diaspora" />
            </div>
          </div>

          {/* RIGHT — CEO */}

          <div className="relative mx-auto w-full max-w-[500px]">
            {/* Glow */}

            <div className="absolute -inset-6 rounded-[45px] bg-gradient-to-br from-cyan-300/25 via-violet-300/15 to-pink-300/20 blur-3xl" />

            {/* Main card */}

            <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/75 p-3 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-[25px]">
                <img
                  src={ceoPhoto}
                  alt="Adonay - Founder of Adonay TikTok Academy"
                  className="h-[430px] w-full object-cover object-center transition duration-700 hover:scale-[1.025] sm:h-[520px]"
                />

                {/* Image gradient */}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                {/* Founder info */}

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-2xl border border-white/20 bg-white/15 p-4 shadow-xl backdrop-blur-xl">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-cyan-300">
                      Founder & Academy Lead
                    </p>

                    <h2 className="mt-1 text-xl font-black text-white">
                      Adonay
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-white/80">
                      Building practical digital skills through content,
                      strategy, and education.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}

            <div className="absolute -bottom-5 -left-2 hidden rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-violet-100">
                  <Award size={18} className="text-violet-600" />
                </div>

                <div>
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                    Academy
                  </p>

                  <p className="mt-0.5 text-xs font-bold text-slate-800">
                    Learn. Create. Grow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            QUICK STATS
        ============================================================== */}

        <section className="mt-20 sm:mt-24">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard
              icon={GraduationCap}
              number="01"
              title="Learn"
              text="Build practical digital skills."
            />

            <StatCard
              icon={Video}
              number="02"
              title="Create"
              text="Turn ideas into meaningful content."
            />

            <StatCard
              icon={Target}
              number="03"
              title="Grow"
              text="Build visibility, trust, and influence."
            />
          </div>
        </section>

        {/* ==============================================================
            MISSION
        ============================================================== */}

        <section className="mt-24 sm:mt-28">
          <SectionHeading
            eyebrow="What Drives Us"
            title="A learning platform built for action."
            description="We believe digital education should not stop at information. It should help people understand, apply, create, and grow."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
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
              text="We are building a learning environment for individuals, professionals, creators, businesses, and future digital leaders from local and diaspora communities."
            />
          </div>
        </section>

        {/* ==============================================================
            WHY WE EXIST
        ============================================================== */}

        <section className="mt-24 grid items-center gap-10 sm:mt-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* LEFT */}

          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-pink-500">
              Why We Exist
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-900 sm:text-4xl">
              Turning digital knowledge into practical skills.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              Social media has created enormous opportunities for individuals
              and businesses. But having access to a platform does not
              automatically mean knowing how to use it effectively.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600">
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

          {/* RIGHT */}

          <div className="relative">
            <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-br from-cyan-200/30 via-violet-200/20 to-pink-200/20 blur-2xl" />

            <div className="relative rounded-[30px] border border-slate-200 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureBox
                  icon={Video}
                  title="Content"
                  text="Learn how to create stronger short-form content."
                  iconBg="bg-cyan-100"
                  iconColor="text-cyan-600"
                />

                <FeatureBox
                  icon={Target}
                  title="Strategy"
                  text="Move from random posting to intentional content."
                  iconBg="bg-violet-100"
                  iconColor="text-violet-600"
                />

                <FeatureBox
                  icon={Users}
                  title="Audience"
                  text="Understand how to communicate with the right people."
                  iconBg="bg-pink-100"
                  iconColor="text-pink-600"
                />

                <FeatureBox
                  icon={ShieldCheck}
                  title="Confidence"
                  text="Develop practical skills you can continue using."
                  iconBg="bg-amber-100"
                  iconColor="text-amber-600"
                />
              </div>

              <div className="mt-5 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-violet-50 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Play
                      size={17}
                      className="ml-0.5 text-cyan-600"
                      fill="currentColor"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-slate-900">
                      Learn by doing
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Our approach emphasizes practical exercises,
                      implementation, and real-world content development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            VALUES
        ============================================================== */}

        <section className="mt-24 sm:mt-28">
          <SectionHeading
            eyebrow="What We Believe"
            title="Built around practical values."
            description="Everything we build is guided by a simple idea: learning should lead to action."
            centered
          />

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

        {/* ==============================================================
            LOCAL + DIASPORA
        ============================================================== */}

        <section className="relative mt-24 overflow-hidden rounded-[32px] border border-slate-200 bg-white/80 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.07)] backdrop-blur-xl sm:mt-28 sm:p-10 lg:p-12">
          {/* Background decorations */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-200/30 blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-pink-200/25 blur-[90px]" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-violet-100">
                  <Globe2 size={21} className="text-violet-600" />
                </div>

                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-violet-600">
                    Beyond Borders
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                    Built for local & diaspora learners
                  </h2>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
                Adonay TikTok Academy is designed with a broader learning
                community in mind. As programs expand, learners from different
                locations will be able to access selected training online or
                through in-person opportunities.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <LocationBadge
                icon={MapPin}
                title="Local"
                text="In-person"
                color="cyan"
              />

              <LocationBadge
                icon={Globe2}
                title="Diaspora"
                text="Online"
                color="violet"
              />
            </div>
          </div>
        </section>

        {/* ==============================================================
            FINAL CTA
        ============================================================== */}

        <section className="relative mt-20 overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-pink-50 p-8 text-center shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:mt-24 sm:p-12 lg:p-16">
          {/* Glow */}

          <div className="pointer-events-none absolute left-1/2 top-[-120px] h-72 w-[550px] -translate-x-1/2 rounded-full bg-cyan-300/20 blur-[100px]" />

          <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-64 w-64 rounded-full bg-pink-300/20 blur-[90px]" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-violet-100 shadow-sm">
              <GraduationCap size={24} className="text-violet-600" />
            </div>

            <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.24em] text-violet-600">
              Your Next Step
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-5xl">
              Ready to build your digital skills?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Explore our available training programs and find the learning
              experience that fits your goals.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_15px_35px_rgba(99,102,241,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(99,102,241,0.25)]"
              >
                Explore Training
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600"
              >
                Register Now
                <ChevronRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ==========================================================================
   SECTION HEADING
========================================================================== */

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-cyan-600">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-900 sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

/* ==========================================================================
   TRUST ITEM
========================================================================== */

function TrustItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-50">
        <Icon size={14} className="text-cyan-600" />
      </div>

      <span className="text-[10px] font-bold text-slate-600">{text}</span>
    </div>
  );
}

/* ==========================================================================
   STAT CARD
========================================================================== */

function StatCard({ icon: Icon, number, title, text }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_15px_40px_rgba(15,23,42,0.07)]">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-violet-100">
          <Icon size={18} className="text-violet-600" />
        </div>

        <span className="text-[9px] font-black tracking-[0.18em] text-slate-300">
          {number}
        </span>
      </div>

      <h3 className="mt-5 text-base font-extrabold text-slate-900">{title}</h3>

      <p className="mt-1.5 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}

/* ==========================================================================
   MISSION CARD
========================================================================== */

function MissionCard({ icon: Icon, number, title, text }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      {/* Hover glow */}

      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-200/30 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-violet-100">
            <Icon size={19} className="text-violet-600" />
          </div>

          <span className="text-[9px] font-black tracking-[0.2em] text-slate-300">
            {number}
          </span>
        </div>

        <h3 className="mt-6 text-lg font-black text-slate-900">{title}</h3>

        <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   CHECK ITEM
========================================================================== */

function CheckItem({ text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-100">
        <CheckCircle2 size={13} className="text-cyan-600" />
      </div>

      <span className="text-sm font-medium leading-6 text-slate-700">
        {text}
      </span>
    </div>
  );
}

/* ==========================================================================
   FEATURE BOX
========================================================================== */

function FeatureBox({
  icon: Icon,
  title,
  text,
  iconBg = "bg-cyan-100",
  iconColor = "text-cyan-600",
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-sm">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
      >
        <Icon size={17} className={iconColor} />
      </div>

      <h3 className="mt-4 text-sm font-extrabold text-slate-900">{title}</h3>

      <p className="mt-2 text-xs leading-6 text-slate-600">{text}</p>
    </div>
  );
}

/* ==========================================================================
   VALUE CARD
========================================================================== */

function ValueCard({ icon: Icon, title, text }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_15px_40px_rgba(15,23,42,0.07)]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-pink-100">
        <Icon size={18} className="text-violet-600" />
      </div>

      <h3 className="mt-5 text-sm font-extrabold text-slate-900">{title}</h3>

      <p className="mt-2 text-xs leading-6 text-slate-600">{text}</p>

      <div className="mt-4 flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 transition group-hover:text-violet-600">
        Our principle
        <ArrowUpRight
          size={12}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   LOCATION BADGE
========================================================================== */

function LocationBadge({ icon: Icon, title, text, color = "cyan" }) {
  const colorStyles =
    color === "violet"
      ? {
          wrapper: "bg-violet-50 border-violet-100",
          icon: "bg-violet-100 text-violet-600",
        }
      : {
          wrapper: "bg-cyan-50 border-cyan-100",
          icon: "bg-cyan-100 text-cyan-600",
        };

  return (
    <div
      className={`flex min-w-[105px] flex-col items-center justify-center rounded-2xl border px-5 py-5 shadow-sm ${colorStyles.wrapper}`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorStyles.icon}`}
      >
        <Icon size={18} />
      </div>

      <p className="mt-3 text-xs font-extrabold text-slate-800">{title}</p>

      <p className="mt-1 text-[9px] font-medium text-slate-500">{text}</p>
    </div>
  );
}
