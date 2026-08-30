import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, CalendarDays, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import heroImage from "../../assets/images/hero.jpg";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  /* ============================================================
     COUNTDOWN
     ------------------------------------------------------------
     CURRENTLY:
     02 Days
     22 Hours
     36 Minutes

     The countdown continues automatically.

     IMPORTANT:
     When you have the REAL webinar date, replace the
     INITIAL_COUNTDOWN logic with a fixed target date.

     Example:

     const targetDate = new Date(
       "2026-09-02T18:00:00"
     ).getTime();

     Then calculate:
     const remaining = Math.max(0, targetDate - Date.now());
  ============================================================ */

  const INITIAL_COUNTDOWN = (2 * 24 * 60 * 60 + 22 * 60 * 60 + 36 * 60) * 1000;

  const [timeLeft, setTimeLeft] = useState(INITIAL_COUNTDOWN);

  useEffect(() => {
    const targetTime = Date.now() + INITIAL_COUNTDOWN;

    const updateCountdown = () => {
      const remaining = Math.max(0, targetTime - Date.now());

      setTimeLeft(remaining);
    };

    updateCountdown();

    const timer = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /* ============================================================
     COUNTDOWN VALUES
  ============================================================ */

  const totalSeconds = Math.floor(timeLeft / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor((totalSeconds % 86400) / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const formatNumber = (number) => String(number).padStart(2, "0");

  return (
    <section
      className="
        relative
        isolate
        min-h-screen
        w-full
        overflow-hidden
        bg-[#030712]
        text-white
        [contain:layout_paint]
      "
      style={{
        minHeight: "100svh",
      }}
    >
      {/* ============================================================
          HERO IMAGE
      ============================================================ */}

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

      {/* ============================================================
          DARK OVERLAY
      ============================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-black/35
        "
      />

      {/* ============================================================
          LEFT READABILITY GRADIENT
      ============================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-gradient-to-r
          from-black/85
          via-black/55
          to-transparent
        "
      />

      {/* ============================================================
          MOBILE READABILITY
      ============================================================ */}

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
          to-[#030712]/85
          sm:hidden
        "
      />

      {/* ============================================================
          BOTTOM GRADIENT
      ============================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[2]
          h-48
          bg-gradient-to-t
          from-[#030712]
          via-[#030712]/70
          to-transparent
        "
      />

      {/* ============================================================
          AMBIENT LIGHT
      ============================================================ */}

      {!shouldReduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            animate={{
              opacity: [0.12, 0.22, 0.12],
              scale: [1, 1.05, 1],
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
              bg-cyan-400/10
              blur-[80px]
              sm:block
            "
          />

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.06, 1],
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
              bg-pink-500/10
              blur-[90px]
              sm:block
            "
          />
        </>
      )}

      {/* ============================================================
          WEBINAR COUNTDOWN
          ------------------------------------------------------------
          SMALL
          CLICKABLE
          PREMIUM
          MOBILE FRIENDLY
      ============================================================ */}

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: -10,
              }
        }
        animate={
          shouldReduceMotion
            ? false
            : {
                opacity: 1,
                y: 0,
              }
        }
        transition={{
          duration: 0.5,
          delay: shouldReduceMotion ? 0 : 0.45,
        }}
        className="
          absolute
          right-4
          top-24
          z-30
          sm:right-8
          sm:top-28
          lg:right-12
          lg:top-28
        "
      >
        <Link
          to="/register"
          aria-label="View upcoming webinar details"
          className="
            group
            block
            touch-manipulation
            rounded-2xl
            outline-none
            focus-visible:ring-2
            focus-visible:ring-cyan-300/80
            focus-visible:ring-offset-2
            focus-visible:ring-offset-black
          "
        >
          <div
            className="
              relative
              w-[156px]
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-black/40
              p-2
              shadow-[0_12px_35px_rgba(0,0,0,0.28)]
              backdrop-blur-xl
              transition-all
              duration-300
              group-hover:border-cyan-300/25
              group-hover:bg-black/50
              group-hover:shadow-[0_16px_45px_rgba(0,0,0,0.35)]
              group-active:scale-[0.98]
              sm:w-[172px]
              sm:p-2.5
              sm:hover:-translate-y-0.5
            "
          >
            {/* ======================================================
                TOP COLOR LINE
            ====================================================== */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-0
                right-0
                top-0
                h-[2px]
                bg-gradient-to-r
                from-cyan-400
                via-violet-500
                to-pink-500
              "
            />

            {/* ======================================================
                SOFT COLOR GLOW
            ====================================================== */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-8
                -top-8
                h-16
                w-16
                rounded-full
                bg-cyan-400/10
                blur-2xl
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-8
                -left-8
                h-16
                w-16
                rounded-full
                bg-pink-500/10
                blur-2xl
              "
            />

            {/* ======================================================
                HEADER
            ====================================================== */}

            <div
              className="
                relative
                mb-1.5
                flex
                items-center
                justify-between
                gap-2
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-1.5
                "
              >
                <span
                  className="
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-400/20
                    to-violet-500/20
                    ring-1
                    ring-white/10
                  "
                >
                  <CalendarDays
                    size={10}
                    className="text-cyan-300"
                    strokeWidth={2.5}
                  />
                </span>

                <div className="min-w-0">
                  <div
                    className="
                      truncate
                      text-[6px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-cyan-300/80
                      sm:text-[7px]
                    "
                  >
                    Upcoming Webinar
                  </div>

                  <div
                    className="
                      mt-0.5
                      truncate
                      text-[5px]
                      font-medium
                      text-white/35
                      sm:text-[6px]
                    "
                  >
                    Don't miss it
                  </div>
                </div>
              </div>

              <Sparkles
                size={11}
                className="
                  shrink-0
                  text-pink-300/70
                  transition-transform
                  duration-300
                  group-hover:rotate-12
                "
              />
            </div>

            {/* ======================================================
                MAIN MESSAGE
            ====================================================== */}

            <div
              className="
                relative
                mb-1.5
                text-center
              "
            >
              <span
                className="
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-white/45
                  sm:text-[8px]
                "
              >
                Webinar starts in
              </span>
            </div>

            {/* ======================================================
                COUNTDOWN
            ====================================================== */}

            <div
              className="
                relative
                flex
                items-center
                justify-center
                gap-0.5
              "
            >
              {/* DAYS */}

              <div
                className="
                  flex
                  min-w-[39px]
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-cyan-300/10
                  bg-cyan-300/[0.045]
                  px-1
                  py-1.5
                  transition-colors
                  duration-300
                  group-hover:border-cyan-300/20
                  sm:min-w-[43px]
                "
              >
                <span
                  className="
                    bg-gradient-to-b
                    from-white
                    to-cyan-200
                    bg-clip-text
                    text-[16px]
                    font-black
                    leading-none
                    tracking-[-0.04em]
                    text-transparent
                    sm:text-[17px]
                  "
                >
                  {formatNumber(days)}
                </span>

                <span
                  className="
                    mt-1
                    text-[5px]
                    font-bold
                    uppercase
                    tracking-[0.13em]
                    text-cyan-300/70
                  "
                >
                  Days
                </span>
              </div>

              {/* SEPARATOR */}

              <span
                aria-hidden="true"
                className="
                  mb-3
                  px-0.5
                  text-[9px]
                  font-bold
                  text-white/20
                "
              >
                :
              </span>

              {/* HOURS */}

              <div
                className="
                  flex
                  min-w-[39px]
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-violet-300/10
                  bg-violet-300/[0.045]
                  px-1
                  py-1.5
                  transition-colors
                  duration-300
                  group-hover:border-violet-300/20
                  sm:min-w-[43px]
                "
              >
                <span
                  className="
                    bg-gradient-to-b
                    from-white
                    to-violet-200
                    bg-clip-text
                    text-[16px]
                    font-black
                    leading-none
                    tracking-[-0.04em]
                    text-transparent
                    sm:text-[17px]
                  "
                >
                  {formatNumber(hours)}
                </span>

                <span
                  className="
                    mt-1
                    text-[5px]
                    font-bold
                    uppercase
                    tracking-[0.13em]
                    text-violet-300/70
                  "
                >
                  Hours
                </span>
              </div>

              {/* SEPARATOR */}

              <span
                aria-hidden="true"
                className="
                  mb-3
                  px-0.5
                  text-[9px]
                  font-bold
                  text-white/20
                "
              >
                :
              </span>

              {/* MINUTES */}

              <div
                className="
                  flex
                  min-w-[39px]
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-pink-300/10
                  bg-pink-300/[0.045]
                  px-1
                  py-1.5
                  transition-colors
                  duration-300
                  group-hover:border-pink-300/20
                  sm:min-w-[43px]
                "
              >
                <span
                  className="
                    bg-gradient-to-b
                    from-white
                    to-pink-200
                    bg-clip-text
                    text-[16px]
                    font-black
                    leading-none
                    tracking-[-0.04em]
                    text-transparent
                    sm:text-[17px]
                  "
                >
                  {formatNumber(minutes)}
                </span>

                <span
                  className="
                    mt-1
                    text-[5px]
                    font-bold
                    uppercase
                    tracking-[0.13em]
                    text-pink-300/70
                  "
                >
                  Minutes
                </span>
              </div>
            </div>

            {/* ======================================================
                CLICKABLE STATUS
            ====================================================== */}

            <div
              className="
                relative
                mt-1.5
                flex
                items-center
                justify-center
                gap-1.5
              "
            >
              <span
                className="
                  relative
                  flex
                  h-1.5
                  w-1.5
                  items-center
                  justify-center
                "
              >
                <span
                  className="
                    absolute
                    h-1.5
                    w-1.5
                    animate-ping
                    rounded-full
                    bg-cyan-400/40
                  "
                />

                <span
                  className="
                    relative
                    h-1
                    w-1
                    rounded-full
                    bg-cyan-400
                    shadow-[0_0_8px_rgba(34,211,238,0.7)]
                  "
                />
              </span>

              <span
                className="
                  text-[5px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-white/40
                  transition-colors
                  duration-300
                  group-hover:text-cyan-200/70
                "
              >
                Tap to view webinar
              </span>

              <ArrowRight
                size={8}
                className="
                  text-white/25
                  transition-all
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:text-cyan-300
                "
              />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}

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
            pb-28
            pt-32
            sm:px-8
            sm:pb-32
            sm:pt-36
            lg:px-12
            lg:pb-28
            lg:pt-32
          "
        >
          <div className="max-w-3xl">
            {/* ======================================================
                BRAND LABEL
            ====================================================== */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 12,
                    }
              }
              animate={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
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
                  bg-cyan-400
                  shadow-[0_0_10px_rgba(34,211,238,0.7)]
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

            {/* ======================================================
                HEADLINE
            ====================================================== */}

            <motion.h1
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              animate={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
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
                  from-cyan-300
                  via-white
                  to-pink-400
                  bg-clip-text
                  text-transparent
                "
              >
                attention.
              </span>
            </motion.h1>

            {/* ======================================================
                DESCRIPTION
            ====================================================== */}

            <motion.p
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 15,
                    }
              }
              animate={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
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
              TikTok content and personal branding built for real estate agents
              who want to turn views into visibility, trust, and growth.
            </motion.p>

            {/* ======================================================
                CTA BUTTONS
            ====================================================== */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 15,
                    }
              }
              animate={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
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
                  sm:hover:bg-cyan-300
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

      {/* ============================================================
          BOTTOM BRAND
      ============================================================ */}

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
              }
        }
        animate={
          shouldReduceMotion
            ? false
            : {
                opacity: 1,
              }
        }
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
            from-cyan-300
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

      {/* ============================================================
          DESKTOP SCROLL INDICATOR
      ============================================================ */}

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
            from-cyan-300
            to-transparent
          "
        />
      </div>
    </section>
  );
}
