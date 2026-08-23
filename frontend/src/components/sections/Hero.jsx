import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";

import heroImage from "../../assets/images/hero.jpg";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#030303]"
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <motion.div style={{ scale, opacity, y }} className="absolute inset-0">
        <img
          src={heroImage}
          alt="Adonay TikTok Academy"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* =====================================================
          DARK OVERLAY
      ===================================================== */}

      <div className="absolute inset-0 bg-black/65" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-[#030303]" />

      {/* =====================================================
          BRAND GLOW
      ===================================================== */}

      <div className="absolute left-[-120px] top-[-120px] h-[360px] w-[360px] rounded-full bg-[#25F4EE]/10 blur-[100px]" />

      <div className="absolute bottom-[-160px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[#FE2C55]/10 blur-[110px]" />

      {/* =====================================================
          SUBTLE GRID
      ===================================================== */}

      <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:90px_90px]" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 flex min-h-screen items-center px-5 py-24 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-4xl">
            {/* =================================================
                BRAND LABEL
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2.5 backdrop-blur-xl"
            >
              <span className="h-2 w-2 rounded-full bg-[#25F4EE] shadow-[0_0_12px_rgba(37,244,238,0.8)]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 sm:text-xs">
                Adonay TikTok Academy
              </span>
            </motion.div>

            {/* =================================================
                MAIN HEADLINE
            ================================================= */}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="mt-7 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[78px]"
            >
              Turn Your Real Estate
              <span className="block">
                Business Into a{" "}
                <span className="bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
                  Digital Brand.
                </span>
              </span>
            </motion.h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.35,
              }}
              className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-lg sm:leading-8"
            >
              Learn how to use TikTok and short-form content to attract more
              clients, showcase properties, build your personal brand, and grow
              your real estate business.
            </motion.p>

            {/* =================================================
                SMALL VALUE POINTS
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
              }}
              className="mt-7 flex flex-wrap gap-x-6 gap-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-white/60 sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25F4EE]" />
                TikTok Marketing
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-white/60 sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FE2C55]" />
                Personal Branding
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-white/60 sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25F4EE]" />
                Real Estate Content
              </div>
            </motion.div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.65,
              }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              {/* PRIMARY REGISTER */}

              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] px-7 py-4 text-sm font-bold text-black shadow-[0_12px_35px_rgba(37,244,238,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(254,44,85,0.2)]"
              >
                Register for the Academy
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* SECONDARY BUTTON */}

              <Link
                to="/about"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-[#25F4EE]/40 hover:bg-white/[0.09]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <Play
                    size={11}
                    className="ml-0.5 fill-current text-[#25F4EE]"
                  />
                </span>
                Discover the Academy
              </Link>
            </motion.div>

            {/* =================================================
                TRUST MESSAGE
            ================================================= */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.9,
              }}
              className="mt-8 flex items-center gap-3 text-xs text-white/40"
            >
              <div className="h-px w-8 bg-gradient-to-r from-[#25F4EE] to-transparent" />

              <span>Learn. Create. Grow. Go Viral.</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM FADE
      ===================================================== */}

      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#030303] to-transparent" />
    </section>
  );
}
