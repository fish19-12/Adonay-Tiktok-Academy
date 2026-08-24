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

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-white"
    >
      {/* =====================================================
          HERO IMAGE
      ===================================================== */}

      <motion.div
        style={{
          scale: imageScale,
          y: imageY,
        }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Adonay TikTok Academy"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* =====================================================
          IMAGE OVERLAY
      ===================================================== */}

      <div className="absolute inset-0 bg-black/25" />

      {/* Left readability gradient */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/5" />

      {/* Bottom fade */}

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/45 to-transparent" />

      {/* =====================================================
          SUBTLE BRAND LIGHT
      ===================================================== */}

      <motion.div
        animate={{
          opacity: [0.35, 0.55, 0.35],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-[#25F4EE]/15 blur-[110px]"
      />

      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#FE2C55]/10 blur-[120px]"
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="relative z-10 flex min-h-screen items-center"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-28 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            {/* =================================================
                SMALL BRAND LABEL
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-[#25F4EE] shadow-[0_0_12px_rgba(37,244,238,0.8)]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 sm:text-xs">
                TikTok Academy
              </span>
            </motion.div>

            {/* =================================================
                MAIN TITLE
            ================================================= */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-3xl text-[48px] font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[82px]"
            >
              Turn your
              <br />
              <span className="relative">properties</span> into
              <br />
              <span className="bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
                attention.
              </span>
            </motion.h1>

            {/* =================================================
                SHORT DESCRIPTION
            ================================================= */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="mt-6 max-w-md text-sm leading-6 text-white/75 sm:text-base sm:leading-7"
            >
              Learn TikTok content, personal branding, and digital marketing
              built for real estate agents.
            </motion.p>

            {/* =================================================
                CTA
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.45,
              }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              {/* REGISTER */}

              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-white px-7 py-4 text-sm font-bold text-black shadow-[0_15px_45px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(37,244,238,0.2)]"
              >
                {/* Animated gradient */}

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] transition-transform duration-500 group-hover:translate-x-0" />

                <span className="relative z-10">Register Now</span>

                <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={15} />
                </span>
              </Link>

              {/* ABOUT */}

              <Link
                to="/about"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-black/15 px-6 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/10"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <Play size={10} className="ml-0.5 fill-white" />
                </span>
                Discover Academy
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* =====================================================
          SMALL BOTTOM BRAND ELEMENT
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1,
          duration: 0.8,
        }}
        className="absolute bottom-7 left-5 z-20 flex items-center gap-3 sm:left-8 lg:left-12"
      >
        <div className="h-px w-10 bg-gradient-to-r from-[#25F4EE] to-white/20" />

        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50">
          Real Estate × TikTok
        </span>
      </motion.div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.2,
        }}
        className="absolute bottom-7 right-5 z-20 hidden items-center gap-3 sm:right-8 sm:flex lg:right-12"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
          Scroll
        </span>

        <motion.div
          animate={{
            height: [20, 34, 20],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-px bg-gradient-to-b from-[#25F4EE] to-transparent"
        />
      </motion.div>
    </section>
  );
}
