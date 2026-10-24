import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  MessageCircle,
  Play,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

/*
===============================================================
 ADONAY CREATOR ACADEMY — MINIMAL HERO
===============================================================

 - Small, clean headline
 - No background image
 - No unnecessary sections
 - Horizontal 16:9 video
 - Direct program access
 - One primary CTA
 - Fully responsive
===============================================================
*/

const VIDEO_URL =
  "https://player.mediadelivery.net/play/773543/88acc664-0a03-4c44-ae49-7a22c07a237d";

const TELEGRAM_URL = "https://t.me/AdonayTiktokAcademyofficialBot";

/*
===============================================================
 HERO
===============================================================
*/

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const [videoOpen, setVideoOpen] = useState(false);
  const [accessSelectorOpen, setAccessSelectorOpen] = useState(false);

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
        if (videoOpen) closeVideo();
        if (accessSelectorOpen) setAccessSelectorOpen(false);
      }
    };

    if (videoOpen || accessSelectorOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [videoOpen, accessSelectorOpen]);

  useEffect(() => {
    if (!accessSelectorOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [accessSelectorOpen]);

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        lang="am"
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-gradient-to-br
          from-slate-50
          via-white
          to-cyan-50/40
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
              bg-cyan-300/[0.12]
              blur-[100px]
            "
          />
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
            pt-32
            text-center
            sm:px-8
            sm:pb-16
            sm:pt-36
            md:pt-36
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
              text-[10px]
              font-black
              tracking-[0.03em]
              text-violet-700
              sm:text-xs
            "
          >
            የአዶናይ የይዘት ፈጠራ ስልጠና
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
              max-w-4xl
              font-sans
              text-[25px]
              font-black
              leading-[1.3]
              tracking-[-0.025em]
              sm:text-[34px]
              sm:leading-[1.35]
              md:text-[42px]
              lg:text-[48px]
            "
          >
            ሰዎች እንዲቆሙ፣ እንዲመለከቱና
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
              እንዲከተሉዎ የሚያደርገውን ምስጢር ይወቁ!
            </span>
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
              max-w-2xl
              text-[13px]
              leading-7
              text-slate-600
              sm:text-[15px]
              sm:leading-7
            "
          >
            ጠንካራ እና ተፅዕኖ ፈጣሪ ይዘት ለመፍጠር የሚያስፈልጉ የትኩረት ሳቢነት፣ የታሪክ
            አነሳስ እና የግል ብራንዲንግ መርሆዎችን ይማሩ።
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
              text-[10px]
              font-bold
              tracking-[0.02em]
              text-slate-500
              sm:text-xs
            "
          >
            6M+ ተከታዮች · 6.5B+ የቪዲዮ እይታዎች
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
                bg-gradient-to-r from-cyan-400 to-violet-500
                sm:w-10
              "
            />

            <span
              className="
                text-[10px]
                font-black
                tracking-[0.02em]
                text-slate-500
                sm:text-xs
              "
            >
                ይህን አስቀድመው ይመልከቱ
            </span>

            <span
              className="
                h-px
                w-7
                bg-gradient-to-r from-violet-500 to-pink-500
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
                  title="የአዶናይ የይዘት ፈጠራ ስልጠና ቪዲዮ"
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
                  loading="lazy"
                />

                {/* VIDEO BUTTON */}

                <button
                  type="button"
                  onClick={openVideo}
                  aria-label="ቪዲዮውን ይክፈቱ"
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
              max-w-3xl
              font-sans
              text-[19px]
              font-black
              leading-[1.5]
              tracking-[-0.02em]
              sm:text-[25px]
              md:text-[30px]
            "
          >
            ቲዎሪ (ጽንሰ-ሐሳብ) አላስተምርም።
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
              እኔ የማስተምረው በራሴ ተግባር ላይ ውዬ ውጤት ያመጣሁበትን መንገድ ብቻ ነው።
            </span>
          </motion.h2>

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
            <button
              type="button"
              onClick={() => setAccessSelectorOpen(true)}
              aria-haspopup="dialog"
              className="
                group
                flex
                min-h-[52px]
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                via-violet-600
                to-pink-500
                px-5
                py-3.5
                text-[13px]
                font-black
                text-white
                shadow-[0_10px_25px_rgba(99,102,241,0.22)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_14px_30px_rgba(99,102,241,0.3)]
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-500
                focus-visible:ring-offset-2
              "
            >
              <span>አሁኑኑ ይጀምሩ</span>

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
            </button>
          </motion.div>

          {/* =================================================
              SMALL TRUST LINE
          ================================================= */}

          <p
            className="
              mt-2
              max-w-md
              text-[10px]
              leading-5
              text-slate-500
            "
          >
            በይዘት ዝግጅት፣ በታዳሚ ዕድገት እና በግል ብራንዲንግ ዙሪያ በተግባር የተመሰረቱ
            ልምዶች።
          </p>
        </div>
      </section>

      {accessSelectorOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setAccessSelectorOpen(false);
            }
          }}
        >
          <section
            lang="am"
            aria-labelledby="access-selector-title"
            aria-modal="true"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white p-5 shadow-[0_30px_100px_rgba(15,23,42,0.28)] sm:p-6"
            role="dialog"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />
            <button
              type="button"
              onClick={() => setAccessSelectorOpen(false)}
              aria-label="የምርጫ ማያውን ዝጋ"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <X size={17} />
            </button>

            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 via-violet-100 to-pink-100 text-violet-700">
              <Sparkles size={18} />
            </span>
            <h2
              className="mt-4 pr-8 text-xl font-black tracking-tight text-slate-900 sm:text-2xl"
              id="access-selector-title"
            >
              የሚፈልጉትን ስልጠና ይምረጡ
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              ከግብዎ ጋር የሚስማማውን የስልጠና ፕሮግራም ይምረጡ።
            </p>

            <div className="mt-5 grid gap-3">
              <a
                className="group flex items-center gap-3 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50/80 to-violet-50/70 p-4 transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_12px_28px_rgba(99,102,241,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                href={TELEGRAM_URL}
                rel="noreferrer"
                target="_blank"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                  <Zap size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-900">
                    የቲክቶክ ዕድገት አባልነት
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                    በቴሌግራም ተቀላቅለው ይጀምሩ።
                  </span>
                </span>
                <MessageCircle
                  className="shrink-0 text-violet-600 transition-transform group-hover:translate-x-0.5"
                  size={17}
                />
              </a>

              <Link
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-[0_12px_28px_rgba(99,102,241,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                onClick={() => setAccessSelectorOpen(false)}
                to="/business-registration"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-pink-100 text-violet-700">
                  <BriefcaseBusiness size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-900">
                    የቲክቶክ ቢዝነስ ማስተርማይንድ
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                    በቢዝነስ ምዝገባ ገጻችን ያመልክቱ።
                  </span>
                </span>
                <ArrowRight
                  className="shrink-0 text-violet-600 transition-transform group-hover:translate-x-0.5"
                  size={17}
                />
              </Link>
            </div>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <Check size={13} className="text-violet-500" />
              ለግብዎ የሚስማማውን ቀጣይ እርምጃ ይምረጡ።
            </p>
          </section>
        </div>
      )}

      {/* =====================================================
          VIDEO MODAL
      ===================================================== */}

      {videoOpen && (
        <div
          lang="am"
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
          aria-label="የአዶናይ ቪዲዮ"
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
            aria-label="ቪዲዮውን ዝጋ"
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
                src={`${VIDEO_URL}?autoplay=true`}
                title="የአዶናይ የይዘት ፈጠራ ስልጠና"
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
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
