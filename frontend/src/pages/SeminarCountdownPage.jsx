import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Play,
  Sparkles,
  Video,
} from "lucide-react";

/* =========================================================
   SEMINAR CONFIGURATION
   ========================================================= */

/*
  Wednesday = 3
  7:00 PM

  Change these values when your actual webinar time changes.
*/

const SEMINAR_WEEKDAY = 3;
const SEMINAR_HOUR = 19;
const SEMINAR_MINUTE = 0;

/*
  Add your real live webinar URL here.

  Example:

  const LIVE_SEMINAR_URL =
    "https://meet.google.com/xxxxx";
*/

const LIVE_SEMINAR_URL = "";

/* =========================================================
   DATE HELPERS
   ========================================================= */

function getNextWednesday() {
  const now = new Date();
  const target = new Date(now);

  let daysUntil = (SEMINAR_WEEKDAY - now.getDay() + 7) % 7;

  if (daysUntil === 0) {
    const seminarToday = new Date(now);

    seminarToday.setHours(SEMINAR_HOUR, SEMINAR_MINUTE, 0, 0);

    if (now >= seminarToday) {
      daysUntil = 7;
    }
  }

  target.setDate(target.getDate() + daysUntil);

  target.setHours(SEMINAR_HOUR, SEMINAR_MINUTE, 0, 0);

  return target;
}

function getRemaining(target) {
  const difference = target.getTime() - Date.now();

  if (difference <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const totalSeconds = Math.floor(difference / 1000);

  return {
    total: difference,

    days: Math.floor(totalSeconds / 86400),

    hours: Math.floor((totalSeconds % 86400) / 3600),

    minutes: Math.floor((totalSeconds % 3600) / 60),

    seconds: totalSeconds % 60,
  };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

/* =========================================================
   PAGE
   ========================================================= */

export default function SeminarCountdownPage() {
  const [targetDate, setTargetDate] = useState(getNextWednesday);

  const [remaining, setRemaining] = useState(() => getRemaining(targetDate));

  const [isLive, setIsLive] = useState(false);

  /* =======================================================
     CLOCK
     ======================================================= */

  useEffect(() => {
    const update = () => {
      const next = getRemaining(targetDate);

      setRemaining(next);

      if (next.total <= 0) {
        setIsLive(true);
      }
    };

    update();

    const timer = window.setInterval(update, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  /* =======================================================
     AFTER WEBINAR
     ======================================================= */

  useEffect(() => {
    if (!isLive) return;

    const timer = window.setTimeout(() => {
      const next = getNextWednesday();

      setTargetDate(next);

      setRemaining(getRemaining(next));

      setIsLive(false);
    }, 60000);

    return () => window.clearTimeout(timer);
  }, [isLive]);

  /* =======================================================
     DISPLAY DATA
     ======================================================= */

  const dateText = useMemo(
    () =>
      targetDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    [targetDate],
  );

  const timeText = useMemo(
    () =>
      targetDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    [targetDate],
  );

  /* =======================================================
     COUNTDOWN MESSAGE
     ======================================================= */

  const countdownMessage = useMemo(() => {
    if (remaining.days > 0) {
      return `The live webinar is ${remaining.days} ${
        remaining.days === 1 ? "day" : "days"
      } away`;
    }

    if (remaining.hours > 0) {
      return `The live webinar starts in ${remaining.hours} ${
        remaining.hours === 1 ? "hour" : "hours"
      }`;
    }

    if (remaining.minutes > 0) {
      return `The live webinar starts in ${remaining.minutes} ${
        remaining.minutes === 1 ? "minute" : "minutes"
      }`;
    }

    return "The live webinar starts very soon";
  }, [remaining]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7ff] text-[#171a35]">
      <Background />

      {/* ===================================================
          HEADER
          =================================================== */}

      <header className="relative z-20 border-b border-white/80 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <BrandMark />

            <div className="leading-none">
              <p className="text-sm font-black tracking-tight text-[#171a35]">
                ADONAY
              </p>

              <p className="mt-1 text-[7px] font-black uppercase tracking-[0.2em] text-[#858ba3]">
                TikTok /<span className="text-[#e749a0]"> Academy</span>
              </p>
            </div>
          </Link>

          <Link
            to="/register"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#e1e4f1]
              bg-white
              px-3.5
              py-2.5
              text-[9px]
              font-black
              text-[#747a92]
              shadow-sm
              transition-all
              hover:-translate-y-0.5
              hover:border-[#cfcafc]
              hover:text-[#5849db]
            "
          >
            <ArrowLeft
              size={13}
              className="transition-transform group-hover:-translate-x-0.5"
            />

            <span className="hidden sm:inline">Registration</span>

            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      {/* ===================================================
          MAIN
          =================================================== */}

      <section className="relative z-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* =================================================
              HERO
              ================================================= */}

          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dedaff] bg-white/85 px-3.5 py-2 shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#6555df] opacity-40" />
                <span className="relative h-2 w-2 rounded-full bg-[#6555df]" />
              </span>

              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#6254d5] sm:text-[9px]">
                Registered Live Webinar
              </span>

              <Sparkles size={12} className="text-[#efa22d]" />
            </div>

            <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.06em] text-[#171a35] sm:text-5xl lg:text-6xl">
              Your webinar is
              <span className="ml-2 bg-gradient-to-r from-[#5547e7] via-[#8a4ff3] to-[#12bfdc] bg-clip-text text-transparent">
                almost here.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-[#7f859a] sm:text-sm">
              You&apos;re registered for the Adonay TikTok Academy live
              training. Here&apos;s your countdown to the next session.
            </p>
          </div>

          {/* =================================================
              WEBINAR CARD
              ================================================= */}

          <div className="relative mt-8 sm:mt-10">
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-[#6254e9]/15 via-[#a34ff4]/10 to-[#12c8e4]/15 blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-white bg-white/95 shadow-[0_30px_100px_rgba(55,61,120,0.14)] backdrop-blur-xl">
              {/* TOP ACCENT */}

              <div className="h-1.5 bg-gradient-to-r from-[#5547e7] via-[#9350f4] to-[#11c9e6]" />

              <div className="p-5 sm:p-8 lg:p-10">
                {/* =================================================
                    WEBINAR INFO
                    ================================================= */}

                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoCard
                    icon={<CalendarDays size={19} />}
                    label="Webinar date"
                    value={dateText}
                    tone="purple"
                  />

                  <InfoCard
                    icon={<Clock3 size={19} />}
                    label="Starting time"
                    value={timeText}
                    tone="blue"
                  />
                </div>

                {/* =================================================
                    DIVIDER
                    ================================================= */}

                <div className="my-7 h-px bg-[#eceef5]" />

                {/* =================================================
                    COUNTDOWN
                    ================================================= */}

                {isLive ? (
                  <LiveState />
                ) : (
                  <div className="text-center">
                    {/* MESSAGE */}

                    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e2defe] bg-gradient-to-r from-[#f6f3ff] via-[#faf7ff] to-[#effcff] px-4 py-2.5 shadow-sm">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6856e9] shadow-[0_0_8px_rgba(104,86,233,0.45)]" />

                      <span className="text-[9px] font-extrabold tracking-wide text-[#6254d5] sm:text-[10px]">
                        {countdownMessage}
                      </span>
                    </div>

                    <p className="mt-5 text-[8px] font-black uppercase tracking-[0.28em] text-[#a1a5b7]">
                      Time remaining
                    </p>

                    {/* COUNTDOWN */}

                    <div className="mx-auto mt-5 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                      <CountdownUnit
                        value={remaining.days}
                        label="Days"
                        tone="purple"
                      />

                      <CountdownUnit
                        value={remaining.hours}
                        label="Hours"
                        tone="blue"
                      />

                      <CountdownUnit
                        value={remaining.minutes}
                        label="Minutes"
                        tone="cyan"
                      />

                      <CountdownUnit
                        value={remaining.seconds}
                        label="Seconds"
                        tone="orange"
                      />
                    </div>

                    {/* REMINDER */}

                    <div className="mx-auto mt-6 flex max-w-lg items-start gap-3 rounded-2xl border border-[#e6e4f7] bg-[#faf9ff] p-4 text-left">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                        <Video size={16} className="text-[#6254dc]" />
                      </div>

                      <div>
                        <p className="text-[10px] font-black text-[#5550c9]">
                          Live online training
                        </p>

                        <p className="mt-1 text-[9px] leading-4 text-[#8a8fa2]">
                          Be ready before the countdown reaches zero. Your live
                          webinar session starts at the scheduled time.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* =================================================
                    FOOTER
                    ================================================= */}

                <div className="mt-7 flex flex-col gap-4 border-t border-[#eceef5] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eeecff]">
                      <GraduationCap size={17} className="text-[#5f51df]" />
                    </div>

                    <div>
                      <p className="text-[10px] font-black text-[#50556b]">
                        Adonay TikTok Academy
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#9ca0b2]">
                        Practical live training
                      </p>
                    </div>
                  </div>

                  {LIVE_SEMINAR_URL ? (
                    <a
                      href={LIVE_SEMINAR_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        group
                        inline-flex
                        min-h-[46px]
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-[#5547e7]
                        to-[#7950ee]
                        px-5
                        text-[10px]
                        font-black
                        text-white
                        shadow-lg
                        shadow-purple-100
                        transition-all
                        hover:-translate-y-0.5
                      "
                    >
                      <Play size={13} fill="currentColor" />
                      Join Live
                      <ArrowRight
                        size={12}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </a>
                  ) : (
                    <Link
                      to="/register"
                      className="
                        group
                        inline-flex
                        min-h-[46px]
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-[#5547e7]
                        to-[#7950ee]
                        px-5
                        text-[10px]
                        font-black
                        text-white
                        shadow-lg
                        shadow-purple-100
                        transition-all
                        hover:-translate-y-0.5
                      "
                    >
                      <CheckCircle2 size={13} />
                      Registration
                      <ArrowRight
                        size={12}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              BOTTOM INFO
              ================================================= */}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[9px] font-bold text-[#9da2b5]">
            <span>Live webinar</span>

            <span className="hidden h-1 w-1 rounded-full bg-[#d6d9e4] sm:block" />

            <span>Wednesday • 7:00 PM</span>

            <span className="hidden h-1 w-1 rounded-full bg-[#d6d9e4] sm:block" />

            <span>Adonay TikTok Academy</span>
          </div>

          <p className="mt-4 text-center text-[8px] text-[#b0b3c1]">
            © 2026 Adonay TikTok Academy
          </p>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   INFO CARD
   ========================================================= */

function InfoCard({ icon, label, value, tone = "purple" }) {
  const styles =
    tone === "blue"
      ? {
          wrapper: "border-[#d9ecfa] bg-gradient-to-br from-[#f3faff] to-white",
          icon: "bg-[#e9f6ff] text-[#2386d6]",
        }
      : {
          wrapper: "border-[#e3dfff] bg-gradient-to-br from-[#f7f5ff] to-white",
          icon: "bg-[#eeebff] text-[#6254dc]",
        };

  return (
    <div
      className={`
        rounded-2xl
        border
        p-4
        ${styles.wrapper}
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${styles.icon}
          `}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#a0a4b6]">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-black text-[#33374e]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COUNTDOWN UNIT
   ========================================================= */

function CountdownUnit({ value, label, tone }) {
  const themes = {
    purple: {
      box: "border-[#dedaff] bg-gradient-to-b from-[#f4f2ff] to-white hover:border-[#c9c1ff] hover:shadow-[0_12px_30px_rgba(91,78,220,0.10)]",
      number: "text-[#5a4ddd]",
      line: "bg-[#6654e9]",
    },

    blue: {
      box: "border-[#d7eaff] bg-gradient-to-b from-[#f2f9ff] to-white hover:border-[#bcdcff] hover:shadow-[0_12px_30px_rgba(50,160,239,0.10)]",
      number: "text-[#2386d6]",
      line: "bg-[#32a0ef]",
    },

    cyan: {
      box: "border-[#d3f2f6] bg-gradient-to-b from-[#effcff] to-white hover:border-[#b6eaf1] hover:shadow-[0_12px_30px_rgba(24,197,220,0.10)]",
      number: "text-[#129db6]",
      line: "bg-[#18c5dc]",
    },

    orange: {
      box: "border-[#f8e4ca] bg-gradient-to-b from-[#fff8ed] to-white hover:border-[#f2d4ad] hover:shadow-[0_12px_30px_rgba(242,162,59,0.10)]",
      number: "text-[#dd8c28]",
      line: "bg-[#f2a23b]",
    },
  };

  const theme = themes[tone] || themes.purple;

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-[20px]
        border
        px-3
        py-6
        text-center
        shadow-sm
        transition-all
        duration-300
        sm:py-7
        ${theme.box}
      `}
    >
      {/* TOP LINE */}

      <div
        className={`
          absolute
          left-1/2
          top-0
          h-1
          w-10
          -translate-x-1/2
          rounded-b-full
          ${theme.line}
        `}
      />

      {/* NUMBER */}

      <div
        className={`
          text-4xl
          font-black
          tracking-[-0.08em]
          sm:text-5xl
          lg:text-[58px]
          ${theme.number}
        `}
      >
        {pad(value)}
      </div>

      {/* LABEL */}

      <p className="mt-2 text-[8px] font-black uppercase tracking-[0.18em] text-[#999eaf] sm:text-[9px]">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   LIVE STATE
   ========================================================= */

function LiveState() {
  return (
    <div className="py-5 text-center sm:py-8">
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-pulse rounded-[26px] bg-gradient-to-br from-[#5547e7]/20 to-[#12c8e5]/20 blur-xl" />

        <div className="relative flex h-18 w-18 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#5547e7] to-[#12c8e5] text-white shadow-xl shadow-purple-100">
          <Play size={25} fill="currentColor" className="ml-0.5" />
        </div>
      </div>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#ccefe0] bg-[#effcf6] px-3.5 py-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#20b486] opacity-50" />
          <span className="relative h-2 w-2 rounded-full bg-[#20b486]" />
        </span>

        <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#188f69]">
          Live now
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#171a35] sm:text-3xl">
        The webinar is live
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#858a9e]">
        Your Adonay TikTok Academy live session has started.
      </p>

      {LIVE_SEMINAR_URL && (
        <a
          href={LIVE_SEMINAR_URL}
          target="_blank"
          rel="noreferrer"
          className="
            mt-6
            inline-flex
            min-h-[48px]
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-[#5547e7]
            to-[#7950ee]
            px-6
            text-xs
            font-black
            text-white
            shadow-lg
            shadow-purple-100
            transition-all
            hover:-translate-y-0.5
          "
        >
          <Play size={14} fill="currentColor" />
          Join Live Webinar
          <ArrowRight size={13} />
        </a>
      )}
    </div>
  );
}

/* =========================================================
   BRAND
   ========================================================= */

function BrandMark() {
  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[13px] bg-gradient-to-br from-[#5547e7] via-[#794ef0] to-[#12c9e7] text-white shadow-lg shadow-purple-100">
      <div className="absolute inset-0 bg-white/10" />

      <GraduationCap size={20} strokeWidth={2.5} className="relative" />
    </div>
  );
}

/* =========================================================
   BACKGROUND
   ========================================================= */

function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      {/* PURPLE */}

      <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#8b5cf6]/10 blur-[130px]" />

      {/* CYAN */}

      <div className="absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-[#22d3ee]/10 blur-[130px]" />

      {/* PINK */}

      <div className="absolute bottom-[-220px] left-[15%] h-[500px] w-[500px] rounded-full bg-[#ec4899]/[0.06] blur-[140px]" />

      {/* ORANGE */}

      <div className="absolute bottom-[-180px] right-[10%] h-[400px] w-[400px] rounded-full bg-[#f59e0b]/[0.06] blur-[130px]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-[0.025]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(80,70,160,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(80,70,160,.45) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* CENTER LIGHT */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7),rgba(246,247,255,0.15)_55%,transparent_80%)]" />
    </div>
  );
}
