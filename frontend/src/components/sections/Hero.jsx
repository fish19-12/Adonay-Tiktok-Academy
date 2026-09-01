import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Play, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

/*
===============================================================
 ADONAY CREATOR ACADEMY — MINIMAL HERO
===============================================================

 - Small, clean headline
 - No background image
 - No unnecessary sections
 - Horizontal 16:9 video
 - Real countdown
 - One primary CTA
 - Fully responsive
===============================================================
*/

const WEBINAR_DATE = "2026-09-02T11:00:00-04:00";

const ADONAY_VIDEO_ID = "7592926632487341333";

const VIDEO_URL =
  `https://www.tiktok.com/player/v1/${ADONAY_VIDEO_ID}` +
  `?controls=1` +
  `&description=1` +
  `&music_info=1` +
  `&fullscreen_button=1` +
  `&rel=0`;

/*
===============================================================
 COUNTDOWN
===============================================================
*/

function getRemainingTime() {
  const target = new Date(WEBINAR_DATE).getTime();
  return Math.max(0, target - Date.now());
}

function pad(number) {
  return String(number).padStart(2, "0");
}

/*
===============================================================
 COUNTDOWN ITEM
===============================================================
*/

function CountdownBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="
          flex
          h-12
          w-14
          items-center
          justify-center
          rounded-xl
          border
          border-black/[0.07]
          bg-white
          shadow-[0_3px_12px_rgba(0,0,0,0.04)]
          sm:h-14
          sm:w-16
        "
      >
        <span
          className="
            text-xl
            font-black
            leading-none
            tracking-[-0.04em]
            text-[#111111]
            sm:text-2xl
          "
        >
          {pad(value)}
        </span>
      </div>

      <span
        className="
          mt-1
          text-[7px]
          font-bold
          uppercase
          tracking-[0.14em]
          text-black/35
        "
      >
        {label}
      </span>
    </div>
  );
}

/*
===============================================================
 HERO
===============================================================
*/

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const [timeLeft, setTimeLeft] = useState(getRemainingTime());

  const [videoOpen, setVideoOpen] = useState(false);

  /*
  -------------------------------------------------------------
  COUNTDOWN UPDATE
  -------------------------------------------------------------
  */

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(getRemainingTime());
    };

    updateCountdown();

    const interval = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /*
  -------------------------------------------------------------
  COUNTDOWN VALUES
  -------------------------------------------------------------
  */

  const countdown = useMemo(() => {
    const totalSeconds = Math.floor(timeLeft / 1000);

    return {
      days: Math.floor(totalSeconds / 86400),

      hours: Math.floor((totalSeconds % 86400) / 3600),

      minutes: Math.floor((totalSeconds % 3600) / 60),

      seconds: totalSeconds % 60,

      expired: timeLeft <= 0,
    };
  }, [timeLeft]);

  /*
  -------------------------------------------------------------
  VIDEO MODAL
  -------------------------------------------------------------
  */

  const openVideo = () => {
    setVideoOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideo = () => {
    setVideoOpen(false);
    document.body.style.overflow = "";
  };

  /*
  -------------------------------------------------------------
  ESCAPE KEY
  -------------------------------------------------------------
  */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeVideo();
      }
    };

    if (videoOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [videoOpen]);

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-[#faf8f5]
          text-[#111111]
        "
      >
        {/* ===================================================
            VERY SUBTLE DECORATION
        =================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-[-280px]
              h-[480px]
              w-[480px]
              -translate-x-1/2
              rounded-full
              bg-[#e85f3f]/[0.035]
              blur-[100px]
            "
          />
        </div>

        {/* ===================================================
            TOP BAR
        =================================================== */}

        <div
          className="
            relative
            z-20
            border-b
            border-black/[0.07]
            bg-[#111111]
            px-4
            py-2.5
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              text-center
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#e85f3f]
              "
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-white/60
              "
            >
              Workshop
            </span>

            <span className="text-white/20">·</span>

            <span
              className="
                text-[10px]
                font-semibold
                text-white
                sm:text-[11px]
              "
            >
              September 2nd @ 11:00 AM EDT
            </span>
          </div>
        </div>

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            w-full
            max-w-4xl
            flex-col
            items-center
            px-5
            pb-12
            pt-9
            text-center
            sm:px-8
            sm:pb-16
            sm:pt-12
          "
        >
          {/* =================================================
              LABEL
          ================================================= */}

          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 6,
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
              duration: 0.4,
            }}
            className="
              text-[9px]
              font-black
              uppercase
              tracking-[0.17em]
              text-[#d9573f]
              sm:text-[10px]
            "
          >
            The Adonay Creator Workshop
          </motion.p>

          {/* =================================================
              MAIN HEADLINE

              MUCH SMALLER THAN PREVIOUS VERSION
          ================================================= */}

          <motion.h1
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 10,
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
              duration: 0.55,
              delay: shouldReduceMotion ? 0 : 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-3
              max-w-3xl
              font-serif
              text-[32px]
              font-black
              leading-[1]
              tracking-[-0.04em]
              sm:text-[40px]
              md:text-[46px]
              lg:text-[52px]
            "
          >
            Learn what makes people
            <br />
            <span className="text-[#d9573f]">stop, watch & follow.</span>
          </motion.h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
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
              duration: 0.45,
              delay: shouldReduceMotion ? 0 : 0.12,
            }}
            className="
              mt-4
              max-w-lg
              text-[13px]
              leading-6
              text-black/55
              sm:text-sm
              sm:leading-6
            "
          >
            Learn the attention, storytelling and personal branding principles I
            have tested across millions of viewers.
          </motion.p>

          {/* =================================================
              SIMPLE CREDIBILITY
          ================================================= */}

          <motion.p
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
              duration: 0.4,
              delay: shouldReduceMotion ? 0 : 0.2,
            }}
            className="
              mt-3
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-black/35
              sm:text-[10px]
            "
          >
            6M+ followers · 1.3B+ views
          </motion.p>

          {/* =================================================
              VIDEO LABEL
          ================================================= */}

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
              duration: 0.4,
              delay: shouldReduceMotion ? 0 : 0.25,
            }}
            className="
              mt-7
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-px
                w-7
                bg-black/15
                sm:w-10
              "
            />

            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.16em]
                text-black/35
                sm:text-[9px]
              "
            >
              Watch this first
            </span>

            <span
              className="
                h-px
                w-7
                bg-black/15
                sm:w-10
              "
            />
          </motion.div>

          {/* =================================================
              HORIZONTAL VIDEO
          ================================================= */}

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
              duration: 0.55,
              delay: shouldReduceMotion ? 0 : 0.3,
            }}
            className="
              mt-3
              w-full
            "
          >
            <div
              className="
                overflow-hidden
                rounded-2xl
                bg-black
                shadow-[0_15px_45px_rgba(0,0,0,0.12)]
                sm:rounded-[22px]
              "
            >
              <div
                className="
                  relative
                  aspect-video
                  w-full
                "
              >
                <iframe
                  src={VIDEO_URL}
                  title="Adonay Creator Workshop Video"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    border-0
                  "
                  allow="
                    autoplay;
                    encrypted-media;
                    fullscreen;
                    picture-in-picture
                  "
                  allowFullScreen
                  loading="lazy"
                />

                {/* VIDEO BUTTON */}

                <button
                  type="button"
                  onClick={openVideo}
                  aria-label="Open video"
                  className="
                    absolute
                    bottom-3
                    right-3
                    z-20
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-black/60
                    text-white
                    backdrop-blur-md
                    transition
                    hover:bg-black/80
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-white
                  "
                >
                  <Play size={12} fill="currentColor" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              SHORT MESSAGE
          ================================================= */}

          <motion.h2
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
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
              duration: 0.45,
              delay: shouldReduceMotion ? 0 : 0.38,
            }}
            className="
              mt-7
              max-w-xl
              font-serif
              text-[23px]
              font-black
              leading-[1.08]
              tracking-[-0.035em]
              sm:text-[29px]
              md:text-[34px]
            "
          >
            I don't teach theory.
            <br />
            <span className="text-[#d9573f]">
              I teach what I personally use.
            </span>
          </motion.h2>

          {/* =================================================
              COUNTDOWN
          ================================================= */}

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
              duration: 0.4,
              delay: shouldReduceMotion ? 0 : 0.45,
            }}
            className="mt-6"
          >
            {!countdown.expired ? (
              <>
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                  "
                >
                  <CalendarDays size={11} className="text-[#d9573f]" />

                  <span
                    className="
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                      text-black/35
                    "
                  >
                    Starts in
                  </span>
                </div>

                <div
                  className="
                    mt-2.5
                    flex
                    items-start
                    justify-center
                    gap-1.5
                    sm:gap-2
                  "
                >
                  <CountdownBox value={countdown.days} label="Days" />

                  <span
                    className="
                      mt-3
                      text-lg
                      font-black
                      text-black/15
                    "
                  >
                    :
                  </span>

                  <CountdownBox value={countdown.hours} label="Hours" />

                  <span
                    className="
                      mt-3
                      text-lg
                      font-black
                      text-black/15
                    "
                  >
                    :
                  </span>

                  <CountdownBox value={countdown.minutes} label="Minutes" />

                  <span
                    className="
                      mt-3
                      text-lg
                      font-black
                      text-black/15
                    "
                  >
                    :
                  </span>

                  <CountdownBox value={countdown.seconds} label="Seconds" />
                </div>
              </>
            ) : (
              <p
                className="
                  text-sm
                  font-black
                  text-[#d9573f]
                "
              >
                The workshop is live.
              </p>
            )}
          </motion.div>

          {/* =================================================
              CTA
          ================================================= */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
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
              duration: 0.45,
              delay: shouldReduceMotion ? 0 : 0.52,
            }}
            className="
              mt-6
              w-full
              max-w-[380px]
            "
          >
            <Link
              to="/register"
              className="
                group
                flex
                min-h-[52px]
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-xl
                bg-[#e85f3f]
                px-5
                py-3.5
                text-[13px]
                font-black
                text-white
                shadow-[0_10px_25px_rgba(232,95,63,0.22)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#d95537]
                hover:shadow-[0_14px_30px_rgba(232,95,63,0.28)]
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#e85f3f]
                focus-visible:ring-offset-2
              "
            >
              <span>
                {countdown.expired ? "Get Access Now" : "Reserve My Seat"}
              </span>

              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              >
                <ArrowRight size={13} />
              </span>
            </Link>
          </motion.div>

          {/* =================================================
              SMALL TRUST LINE
          ================================================= */}

          <p
            className="
              mt-2
              max-w-md
              text-[8px]
              leading-4
              text-black/30
            "
          >
            Practical lessons from real-world content, audience growth and
            personal branding.
          </p>
        </div>
      </section>

      {/* =====================================================
          VIDEO MODAL
      ===================================================== */}

      {videoOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/90
            p-4
            backdrop-blur-sm
          "
          role="dialog"
          aria-modal="true"
          aria-label="Adonay video"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeVideo();
            }
          }}
        >
          {/* CLOSE */}

          <button
            type="button"
            onClick={closeVideo}
            aria-label="Close video"
            className="
              absolute
              right-4
              top-4
              z-[110]
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-white/10
              text-white
              backdrop-blur-md
              transition
              hover:bg-white/20
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
            "
          >
            <X size={18} />
          </button>

          {/* HORIZONTAL MODAL VIDEO */}

          <div
            className="
              w-full
              max-w-5xl
              overflow-hidden
              rounded-2xl
              bg-black
            "
          >
            <div className="relative aspect-video">
              <iframe
                src={`${VIDEO_URL}&autoplay=1`}
                title="Adonay Creator Workshop"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  border-0
                "
                allow="
                  autoplay;
                  encrypted-media;
                  fullscreen;
                  picture-in-picture
                "
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
