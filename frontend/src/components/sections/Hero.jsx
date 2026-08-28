import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

import heroImage from "../../assets/images/hero.jpg";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="
        relative
        isolate
        w-full
        min-h-screen
        overflow-hidden
        bg-[#030712]
        text-white
        [contain:layout_paint]
      "
      style={{
        minHeight: "100svh",
      }}
    >
      {/* =====================================================
          HERO IMAGE
          -----------------------------------------------------
          Kept simple for better Safari/iPhone performance.
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0
          overflow-hidden
          bg-[#030712]
        "
      >
        <img
          src={heroImage}
          alt=""
          className="
            block
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
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-black/30
        "
      />

      {/* =====================================================
          LEFT READABILITY GRADIENT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-gradient-to-r
          from-black/80
          via-black/45
          to-transparent
        "
      />

      {/* =====================================================
          MOBILE EXTRA READABILITY
          -----------------------------------------------------
          Helps text remain readable on smaller screens.
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-gradient-to-b
          from-black/20
          via-transparent
          to-[#030712]/70
          sm:hidden
        "
      />

      {/* =====================================================
          BOTTOM GRADIENT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[2]
          h-40
          bg-gradient-to-t
          from-[#030712]
          via-[#030712]/60
          to-transparent
        "
      />

      {/* =====================================================
          BRAND LIGHT
          -----------------------------------------------------
          Disabled on very small screens to reduce Safari
          GPU/compositing pressure.
      ===================================================== */}

      {!shouldReduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            animate={{
              opacity: [0.18, 0.28, 0.18],
              scale: [1, 1.04, 1],
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
              z-[3]
              hidden
              h-72
              w-72
              rounded-full
              bg-[#25F4EE]/10
              blur-[80px]
              sm:block
            "
          />

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: [0.12, 0.22, 0.12],
              scale: [1, 1.05, 1],
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
              z-[3]
              hidden
              h-80
              w-80
              rounded-full
              bg-[#FE2C55]/10
              blur-[90px]
              sm:block
            "
          />
        </>
      )}

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          w-full
          items-center
        "
        style={{
          minHeight: "100svh",
        }}
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
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
              }}
              className="
                inline-flex
                max-w-full
                items-center
                gap-2.5
                rounded-full
                border
                border-white/20
                bg-black/30
                px-3.5
                py-2
                sm:backdrop-blur-md
              "
            >
              <span
                className="
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                  bg-[#25F4EE]
                  shadow-[0_0_10px_rgba(37,244,238,0.7)]
                "
              />

              <span
                className="
                  truncate
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-white/90
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
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: shouldReduceMotion ? 0 : 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-6
                max-w-3xl
                text-[44px]
                font-extrabold
                leading-[0.98]
                tracking-[-0.045em]
                text-white
                xs:text-[48px]
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
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : 0.2,
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
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : 0.32,
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
                  touch-manipulation
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
                  shadow-[0_12px_35px_rgba(0,0,0,0.25)]
                  transition-transform
                  duration-300
                  active:scale-[0.98]
                  sm:w-auto
                  sm:hover:-translate-y-1
                  sm:hover:bg-[#25F4EE]
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
                  touch-manipulation
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-white/20
                  bg-black/30
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  active:scale-[0.98]
                  sm:w-auto
                  sm:backdrop-blur-md
                  sm:hover:border-white/35
                  sm:hover:bg-white/10
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
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? false : { opacity: 1 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.7,
          duration: 0.5,
        }}
        className="
          absolute
          bottom-5
          left-5
          z-20
          flex
          max-w-[70%]
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
            shrink-0
            bg-gradient-to-r
            from-[#25F4EE]
            to-white/20
            sm:w-10
          "
        />

        <span
          className="
            truncate
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
          DESKTOP SCROLL INDICATOR
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
          animate={
            shouldReduceMotion
              ? false
              : {
                  height: [20, 32, 20],
                }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            h-6
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
