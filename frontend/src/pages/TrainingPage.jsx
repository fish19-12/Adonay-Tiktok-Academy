import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  CheckCircle2,
  Gem,
  ArrowRight,
  Video,
  Camera,
  Film,
  Users,
  Globe,
  Target,
  TrendingUp,
  Award,
  Flame,
  PlayCircle,
} from "lucide-react";

import { Link } from "react-router-dom";
import ceoPhoto from "../assets/images/ceo.jpg";
import adonayPhoto from "../assets/images/jetour.jpg";

export default function TrainingPage() {
  return (
    <section className="relative overflow-hidden bg-[#040816] px-5 py-20 sm:py-24 text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B18] via-[#040816] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15),transparent_40%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ================= HERO ================= */}
        <div className="text-center max-w-5xl mx-auto">
          <motion.div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-5 py-2 backdrop-blur-xl">
            <Sparkles size={14} className="text-cyan-300" />
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-100/80">
              About NAPI Production
            </span>
          </motion.div>

          <motion.h1 className="mt-8 text-3xl sm:text-6xl font-black leading-tight">
            We Don’t Just Create Content
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
              We Build Digital Influence
            </span>
          </motion.h1>

          <p className="mt-6 text-white/60 max-w-3xl mx-auto leading-7">
            NAPI Production is a premium creative media studio specializing in
            cinematic production, photography, branding, and viral social media
            growth strategies for modern brands and influencers.
          </p>

          {/* STATS */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <Stat label="Projects" value="500+" icon={<Video size={18} />} />
            <Stat label="Brands" value="120+" icon={<Globe size={18} />} />
            <Stat label="Clients" value="300+" icon={<Users size={18} />} />
            <Stat label="Growth" value="10x" icon={<TrendingUp size={18} />} />
          </div>
        </div>

        {/* ================= WHO WE ARE (FIXED MOBILE STACK) ================= */}
        <div className="mt-24 grid gap-10 lg:grid-cols-2 items-center">
          {/* IMAGE */}
          <motion.div className="relative w-full max-w-[600px] mx-auto order-1 lg:order-none">
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-cyan-400/20 to-blue-500/10 blur-3xl" />

            <div className="relative rounded-[36px] overflow-hidden border border-white/10 bg-white/[0.04] p-3 backdrop-blur-2xl">
              <img
                src={ceoPhoto}
                className="w-full h-[420px] sm:h-[520px] object-cover rounded-[28px]"
              />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                  Founder & Creative Director
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mt-1">
                  NAPI Production
                </h3>
                <p className="text-sm text-white/60">
                  Cinematography • Branding • Digital Media
                </p>
              </div>
            </div>
          </motion.div>

          {/* TEXT */}
          <div className="order-2 lg:order-none">
            <h2 className="text-3xl sm:text-5xl font-bold">
              Creative Media Experts
            </h2>

            <p className="mt-5 text-white/60 leading-7">
              We help brands, businesses, and influencers turn ideas into
              powerful visual stories that attract attention and build long-term
              audience trust.
            </p>

            <p className="mt-4 text-white/60 leading-7">
              From concept to final production, everything is designed to
              perform across TikTok, Instagram, YouTube, and modern digital
              platforms.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Cinematic Video Production",
                "Professional Photography",
                "Brand Identity Design",
                "Social Media Growth",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <CheckCircle2 size={18} className="text-cyan-300" />
                  <span className="text-sm text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= ADONAY SECTION (MOBILE FIXED) ================= */}
        <div className="mt-28 rounded-[36px] border border-white/10 bg-white/[0.04] p-6 sm:p-10 backdrop-blur-2xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* IMAGE */}
            <div className="relative">
              <img
                src={adonayPhoto}
                className="w-full h-[320px] sm:h-[420px] object-cover rounded-3xl border border-white/10"
              />

              <div className="absolute top-4 left-4 bg-black/60 px-4 py-2 rounded-full text-xs border border-white/10 flex items-center gap-2">
                <Flame className="text-yellow-400" size={14} />
                Top Ethiopian Influencer
              </div>
            </div>

            {/* TEXT */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                <Award className="text-cyan-300" size={16} />
                <span className="text-xs uppercase tracking-[0.2em]">
                  Influencer Collaboration
                </span>
              </div>

              <h2 className="mt-5 text-3xl sm:text-5xl font-bold">
                Powered by Ethiopia’s Top Creator
              </h2>

              <p className="mt-5 text-white/60 leading-7">
                We collaborate with{" "}
                <span className="text-cyan-300 font-semibold">Adonay</span>,
                Ethiopia’s first TikTok creator to reach
                <span className="text-white font-bold"> 6M+ followers</span>.
                His influence helps us deliver viral-level content production.
              </p>

              <div className="mt-5 flex items-center gap-2 text-yellow-400">
                <PlayCircle size={18} />
                Viral Content Strategy Partner
              </div>
            </div>
          </div>
        </div>

        {/* ================= WHAT WE DO ================= */}
        <div className="mt-28 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold">What We Do</h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard icon={<Video />} title="Video Production" />
            <ServiceCard icon={<Camera />} title="Photography" />
            <ServiceCard icon={<Film />} title="Film Making" />
            <ServiceCard icon={<Users />} title="Social Media" />
            <ServiceCard icon={<Globe />} title="Brand Strategy" />
            <ServiceCard icon={<Target />} title="Marketing Strategy" />
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="mt-28 text-center">
          <div className="max-w-4xl mx-auto rounded-[36px] border border-white/10 bg-white/[0.04] p-8 sm:p-12 backdrop-blur-2xl">
            <h3 className="text-3xl sm:text-5xl font-bold">
              Let’s Build Your Brand Story
            </h3>

            <p className="mt-6 text-white/60 max-w-2xl mx-auto">
              Work with NAPI Production to create cinematic content that grows
              your audience and builds a powerful digital identity.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-7 py-4 font-semibold"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= COMPONENTS ================= */

function ServiceCard({ icon, title }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-2xl">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-xl">
      <div className="text-cyan-300 flex justify-center mb-2">{icon}</div>
      <h4 className="text-lg sm:text-xl font-bold">{value}</h4>
      <p className="text-xs text-white/60">{label}</p>
    </div>
  );
}
