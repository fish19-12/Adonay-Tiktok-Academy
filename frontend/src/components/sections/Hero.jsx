import { motion, useScroll, useTransform } from "framer-motion";

import { Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

import { ArrowRight, Play } from "lucide-react";

import heroImage from "../../assets/images/hero.jpg";

export default function Hero() {
  const ref = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | MOBILE DETECTION
  |--------------------------------------------------------------------------
  |
  | Parallax is intentionally disabled on mobile.
  | Mobile browsers constantly resize the viewport because of the
  | address bar, which can make scroll-based transforms feel broken.
  |
  */

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | DESKTOP SCROLL ANIMATION
  |--------------------------------------------------------------------------
  */

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 55]);

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -25]);

  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="
        relative
        isolate
        min-h-[100svh]
        overflow-hidden
        bg-[#030303]
        text-white
      "
    >
      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================= */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          will-change-transform
        "
        style={{
          scale: isMobile ? 1.01 : imageScale,
          y: isMobile ? 0 : imageY,
        }}
      >
        <img
          src={heroImage}
          alt="Adonay TikTok Academy"
          draggable="false"
          className="
            h-full
            w-full
            select-none
            object-cover
            object-[65%_center]
            sm:object-center
          "
        />
      </motion.div>

      {/* =========================================================
          IMAGE DARKENING
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-black/25
        "
      />

      {/* =========================================================
          LEFT GRADIENT
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-gradient-to-r
          from-black/80
          via-black/45
          to-black/10
        "
      />

      {/* =========================================================
          MOBILE EXTRA READABILITY
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-gradient-to-b
          from-black/20
          via-transparent
          to-black/65
          md:hidden
        "
      />

      {/* =========================================================
          BOTTOM FADE
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[2]
          h-40
          bg-gradient-to-t
          from-black/70
          to-transparent
        "
      />

      {/* =========================================================
          CYAN LIGHT
      ========================================================= */}

      <motion.div
        animate={
          isMobile
            ? {
                opacity: 0.28,
                scale: 1,
              }
            : {
                opacity: [0.25, 0.45, 0.25],
                scale: [1, 1.08, 1],
              }
        }
        transition={
          isMobile
            ? undefined
            : {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="
          pointer-events-none
          absolute
          -left-40
          top-[20%]
          z-[2]
          h-72
          w-72
          rounded-full
          bg-[#25F4EE]/15
          blur-[110px]
          sm:h-80
          sm:w-80
        "
      />

      {/* =========================================================
          PINK LIGHT
      ========================================================= */}

      <motion.div
        animate={
          isMobile
            ? {
                opacity: 0.2,
                scale: 1,
              }
            : {
                opacity: [0.15, 0.3, 0.15],
                scale: [1, 1.08, 1],
              }
        }
        transition={
          isMobile
            ? undefined
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-40
          z-[2]
          h-80
          w-80
          rounded-full
          bg-[#FE2C55]/10
          blur-[120px]
          sm:h-96
          sm:w-96
        "
      />

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <motion.div
        className="
          relative
          z-10
          flex
          min-h-[100svh]
          items-center
        "
        style={{
          y: isMobile ? 0 : contentY,
          opacity: isMobile ? 1 : contentOpacity,
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
            sm:py-28
            lg:px-12
            lg:py-32
          "
        >
          <div
            className="
              max-w-3xl
              md:max-w-3xl
            "
          >
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
                items-center
                gap-2.5
                rounded-full
                border
                border-white/15
                bg-black/20
                px-3
                py-2
                backdrop-blur-xl
                sm:px-3.5
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#25F4EE]
                  shadow-[0_0_12px_rgba(37,244,238,0.9)]
                  sm:h-2
                  sm:w-2
                "
              />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white/80
                  sm:text-xs
                "
              >
                Adonay TikTok Academy
              </span>
            </motion.div>

            {/* =================================================
                MAIN TITLE
            ================================================= */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-6
                max-w-3xl
                text-[42px]
                font-extrabold
                leading-[0.98]
                tracking-[-0.045em]
                text-white

                sm:mt-7
                sm:text-6xl

                md:text-7xl

                lg:text-[82px]
              "
            >
              Turn your
              <br />
              <span>properties</span> into
              <br />
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
                delay: 0.28,
              }}
              className="
                mt-5
                max-w-[360px]
                text-[13px]
                leading-6
                text-white/70

                sm:mt-6
                sm:max-w-md
                sm:text-base
                sm:leading-7
              "
            >
              Learn TikTok content, personal branding, and digital marketing
              built for real estate agents.
            </motion.p>

            {/* =================================================
                CTA BUTTONS
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                delay: 0.4,
              }}
              className="
                mt-7
                flex
                flex-col
                gap-3

                sm:mt-8
                sm:flex-row
              "
            >
              {/* REGISTER */}

              <Link
                to="/register"
                className="
                  group
                  relative
                  inline-flex
                  min-h-[52px]
                  w-full
                  items-center
                  justify-center
                  gap-3
                  overflow-hidden
                  rounded-xl
                  bg-white
                  px-6
                  text-sm
                  font-bold
                  text-black
                  shadow-[0_15px_45px_rgba(0,0,0,0.25)]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:shadow-[0_20px_55px_rgba(37,244,238,0.2)]

                  sm:w-auto
                  sm:px-7
                "
              >
                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-[#25F4EE]
                    via-white
                    to-[#FE2C55]
                    transition-transform
                    duration-500
                    group-hover:translate-x-0
                  "
                />

                <span className="relative z-10">Register Now</span>

                <span
                  className="
                    relative
                    z-10
                    flex
                    h-6
                    w-6
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

              {/* ABOUT */}

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
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur-xl
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
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                >
                  <Play size={10} className="ml-0.5 fill-white" />
                </span>
                Discover Academy
              </Link>
            </motion.div>

            {/* =================================================
                MOBILE BRAND MESSAGE
            ================================================= */}

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
                mt-7
                flex
                items-center
                gap-3
                sm:mt-9
              "
            >
              <div
                className="
                  h-px
                  w-8
                  bg-gradient-to-r
                  from-[#25F4EE]
                  to-transparent
                  sm:w-10
                "
              />

              <span
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white/45
                  sm:text-[9px]
                  sm:tracking-[0.2em]
                "
              >
                Real Estate × TikTok
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* =========================================================
          DESKTOP SCROLL INDICATOR
      ========================================================= */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.2,
          duration: 0.8,
        }}
        className="
          absolute
          bottom-7
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
            height: [20, 34, 20],
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
      </motion.div>
    </section>
  );
}
