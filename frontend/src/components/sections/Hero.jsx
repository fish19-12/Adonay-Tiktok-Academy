import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, Sparkles, Play } from "lucide-react";

import heroImage from "../../assets/images/hero.jpg";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#050816]"
    >
      {/* BACKGROUND IMAGE */}
      <motion.div style={{ scale, opacity, y }} className="absolute inset-0">
        <img
          src={heroImage}
          alt="NAPI Production"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-[#050816]" />

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-5 py-2 backdrop-blur-xl"
          >
            <Sparkles size={14} className="text-cyan-300" />
            <span className="text-xs tracking-[0.25em] uppercase text-white/70">
              NAPI Production Studio
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-4xl sm:text-6xl md:text-7xl font-black leading-tight"
          >
            <span className="text-white">We Create</span>

            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Cinematic Visual Stories
            </span>

            <span className="text-white">That Build Brands</span>
          </motion.h1>

          {/* FEATURE TAGS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {[
              "Cinematic Production",
              "Branding",
              "Social Media Growth",
              "Photography",
            ].map((item, i) => (
              <span
                key={i}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur-xl"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* CTA BUTTONS (ONLY 2 - CLEAN & PREMIUM) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* SERVICES */}
            <Link
              to="/services"
              className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-sm font-semibold text-black shadow-[0_0_35px_rgba(34,211,238,0.3)] transition hover:scale-[1.03]"
            >
              Explore Services
              <ArrowRight
                className="transition group-hover:translate-x-1"
                size={18}
              />
            </Link>

            {/* ABOUT */}
            <Link
              to="/about"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-xl transition hover:border-cyan-400/40 hover:text-cyan-300"
            >
              Who We Are
            </Link>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#050816] to-transparent" />
    </section>
  );
}
