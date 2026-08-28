import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

import heroImage from "../../assets/images/hero.jpg";

export default function Hero() {
  return (
    <section
      className="
        relative
        isolate
        w-full
        min-h-[100svh]
        overflow-hidden
        bg-[#030712]
        text-white
      "
    >
      {/* =====================================================
          HERO IMAGE
      ===================================================== */}

      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Adonay TikTok Academy"
          className="
            h-full
            w-full
            object-cover
            object-center
          "
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* =====================================================
          DARK OVERLAY
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          bg-black/25
        "
      />

      {/* =====================================================
          LEFT GRADIENT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          bg-gradient-to-r
          from-black/80
          via-black/45
          to-black/10
        "
      />

      {/* =====================================================
          BOTTOM GRADIENT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          -z-10
          h-48
          bg-gradient-to-t
          from-[#030712]
          to-transparent
        "
      />

      {/* =====================================================
          CYAN LIGHT
      ===================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-32
          top-1/4
          -z-10
          h-72
          w-72
          rounded-full
          bg-[#25F4EE]/15
          blur-[100px]
        "
      />

      {/* =====================================================
          RED LIGHT
      ===================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          -z-10
          h-80
          w-80
          rounded-full
          bg-[#FE2C55]/10
          blur-[110px]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[100svh]
          w-full
          items-center
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-5
            pb-24
            pt-28
            sm:px-8
            sm:pb-28
            sm:pt-32
            lg:px-12
          "
        >
          <div className="max-w-3xl">
            {/* =================================================
                BRAND LABEL
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
              }}
              className="
                inline-flex
                max-w-full
                items-center
                gap-2.5
                rounded-full
                border
                border-white/20
                bg-black/20
                px-3.5
                py-2
                backdrop-blur-md
              "
            >
              <span
                className="
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                  bg-[#25F4EE]
                  shadow-[0_0_12px_rgba(37,244,238,0.8)]
                "
              />

              <span
                className="
                  truncate
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-white/85
                  sm:text-xs
                "
              >
                TikTok Academy
              </span>
            </motion.div>

            {/* =================================================
                HEADLINE
            ================================================= */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-6
                max-w-3xl
                text-[46px]
                font-extrabold
                leading-[0.98]
                tracking-[-0.045em]
                text-white
                sm:text-6xl
                md:text-7xl
                lg:text-[82px]
              "
            >
              Turn your
              <br />
              <span>properties</span>
              <br />
              into{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-[#25F4EE]
                  via-white
                  to-[#FE2C55]
                  bg-clip-text
                  text-transparent
                "
              >
                attention.
              </span>
            </motion.h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                delay: 0.22,
              }}
              className="
                mt-5
                max-w-md
                text-sm
                leading-6
                text-white/75
                sm:text-base
                sm:leading-7
              "
            >
              TikTok content and personal branding built for real estate agents.
            </motion.p>

            {/* =================================================
                CTA BUTTONS
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
                duration: 0.55,
                delay: 0.34,
              }}
              className="
                mt-7
                flex
                w-full
                flex-col
                gap-3
                sm:w-auto
                sm:flex-row
              "
            >
              {/* REGISTER */}

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
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-black
                  shadow-[0_15px_45px_rgba(0,0,0,0.2)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#25F4EE]
                  sm:w-auto
                "
              >
                <span>Register Now</span>

                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-black/10
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <ArrowRight size={15} />
                </span>
              </Link>

              {/* DISCOVER */}

              <Link
                to="/about"
                className="
                  group
                  inline-flex
                  min-h-[52px]
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-white/20
                  bg-black/20
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-white/35
                  hover:bg-white/10
                  sm:w-auto
                "
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-white/10
                  "
                >
                  <Play size={10} className="ml-0.5 fill-white" />
                </span>

                <span>Discover Academy</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BRAND
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.8,
          duration: 0.6,
        }}
        className="
          absolute
          bottom-5
          left-5
          z-20
          flex
          items-center
          gap-3
          sm:bottom-7
          sm:left-8
          lg:left-12
        "
      >
        <div
          className="
            h-px
            w-8
            bg-gradient-to-r
            from-[#25F4EE]
            to-white/20
            sm:w-10
          "
        />

        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-white/50
            sm:text-[9px]
            sm:tracking-[0.2em]
          "
        >
          Real Estate × TikTok
        </span>
      </motion.div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <div
        className="
          absolute
          bottom-6
          right-5
          z-20
          hidden
          items-center
          gap-3
          sm:flex
          sm:right-8
          lg:right-12
        "
      >
        <span
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.2em]
            text-white/40
          "
        >
          Scroll
        </span>

        <motion.div
          animate={{
            height: [20, 32, 20],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            w-px
            bg-gradient-to-b
            from-[#25F4EE]
            to-transparent
          "
        />
      </div>
    </section>
  );
}
