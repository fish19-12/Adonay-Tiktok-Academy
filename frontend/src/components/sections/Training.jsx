import { motion } from "framer-motion";
import {
  Film,
  Camera,
  Video,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Megaphone,
  Edit3,
  Clapperboard,
} from "lucide-react";

import { Link } from "react-router-dom";

/* Optional CEO/Founder image */
import ceoPhoto from "../../assets/images/ceo.jpg";

export default function Training() {
  return (
    <section className="relative overflow-hidden bg-[#040816] px-5 py-28 text-white sm:px-8">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#081120] via-[#040816] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_28%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_28%)]" />

      <div className="absolute -top-20 left-[-120px] h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-[-150px] right-[-100px] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HERO */}
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-5 py-3 backdrop-blur-2xl"
          >
            <Sparkles size={15} className="text-cyan-300" />
            <span className="text-xs uppercase tracking-[0.22em] text-cyan-100/80">
              About NAPI Production
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-4xl font-black leading-tight sm:text-6xl xl:text-7xl"
          >
            We Create
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Powerful Visual Stories
            </span>
          </motion.h1>

          <motion.p className="mx-auto mt-7 max-w-3xl text-sm leading-8 text-white/60 sm:text-lg">
            NAPI Production is a creative media and digital marketing company
            specializing in high-quality video production, photography,
            branding, and social media growth strategies for modern brands and
            creators.
          </motion.p>
        </div>

        {/* CEO SECTION */}
        <div className="mt-28 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* IMAGE */}
          <motion.div className="relative">
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-cyan-400/20 to-blue-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-2xl">
              <img
                src={ceoPhoto}
                alt="NAPI Founder"
                className="h-[520px] w-full rounded-[28px] object-cover"
              />

              <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-2xl">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/70">
                  Founder & Creative Director
                </p>
                <h3 className="mt-2 text-2xl font-bold">NAPI Production</h3>
                <p className="mt-2 text-sm text-white/60">
                  Creative storytelling, video production & brand development.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CONTENT */}
          <motion.div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl">
              <Star size={14} className="text-cyan-300" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/70">
                Who We Are
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-bold sm:text-5xl">
              Creative Media Experts
            </h2>

            <p className="mt-7 text-white/60 leading-8">
              NAPI Production delivers professional visual storytelling through
              video production, photography, film-making, and digital marketing
              strategies designed to grow brands and engage audiences.
            </p>

            <p className="mt-5 text-white/60 leading-8">
              We combine creativity, technology, and strategy to produce content
              that inspires, connects, and drives real results.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                "High-Quality Video Production",
                "Creative Photography",
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
          </motion.div>
        </div>

        {/* SERVICES */}
        <div className="mt-32 grid gap-8 lg:grid-cols-2">
          <motion.div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <Film size={30} />
            </div>

            <h3 className="text-3xl font-bold">Full Production Services</h3>

            <p className="mt-6 text-white/60 leading-8">
              We handle complete video production from concept to final
              delivery: commercials, corporate videos, events, music videos,
              documentaries, and more.
            </p>
          </motion.div>

          <motion.div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <Sparkles size={30} />
            </div>

            <h3 className="text-3xl font-bold">Our Mission</h3>

            <p className="mt-6 text-white/60 leading-8">
              To create powerful visual content that inspires, engages, and
              helps businesses grow through modern storytelling and creative
              excellence.
            </p>
          </motion.div>
        </div>

        {/* FEATURES */}
        <div className="mt-32">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold sm:text-5xl">
              Why Choose NAPI Production
            </h2>
            <p className="mt-6 text-white/60">
              We bring creativity, strategy, and professional production
              together.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Feature
              icon={<Camera size={28} />}
              title="Cinematic Quality"
              text="Professional visuals with high-end production standards."
            />
            <Feature
              icon={<Video size={28} />}
              title="Full Editing"
              text="Advanced editing, motion graphics, and post-production."
            />
            <Feature
              icon={<Megaphone size={28} />}
              title="Marketing Focus"
              text="Content designed to grow brands and engagement."
            />
            <Feature
              icon={<Users size={28} />}
              title="Client Collaboration"
              text="We work closely with every client from idea to delivery."
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <div className="mx-auto max-w-5xl rounded-[40px] border border-white/10 bg-white/[0.04] p-10 backdrop-blur-2xl sm:p-14">
            <h3 className="text-3xl font-bold sm:text-5xl">
              Let’s Build Your Brand Story
            </h3>

            <p className="mx-auto mt-6 max-w-2xl text-white/60">
              Start your next project with NAPI Production and bring your vision
              to life.
            </p>

            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-sm font-semibold"
            >
              Get Started
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* FEATURE CARD */
function Feature({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
        {icon}
      </div>

      <h4 className="text-2xl font-bold">{title}</h4>
      <p className="mt-5 text-white/60 leading-7">{text}</p>
    </motion.div>
  );
}
