import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  GraduationCap,
  Play,
  Sparkles,
} from "lucide-react";

/* =========================================================
   SEMINAR SETTINGS
   ========================================================= */

const SEMINAR_WEEKDAY = 3; // Wednesday
const SEMINAR_HOUR = 19; // 7:00 PM
const SEMINAR_MINUTE = 0;

// Add your real live meeting URL here when ready.
// Example:
// const LIVE_SEMINAR_URL = "https://meet.google.com/...";
const LIVE_SEMINAR_URL = "";

/* =========================================================
   DATE HELPERS
   ========================================================= */

function getNextWednesday() {
  const now = new Date();
  const target = new Date(now);

  let daysUntil = (SEMINAR_WEEKDAY - now.getDay() + 7) % 7;

  // If today is Wednesday but the seminar has already passed,
  // use next Wednesday.
  if (daysUntil === 0) {
    const todaySeminar = new Date(now);

    todaySeminar.setHours(SEMINAR_HOUR, SEMINAR_MINUTE, 0, 0);

    if (now >= todaySeminar) {
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
   MAIN
   ========================================================= */

export default function SeminarCountdownPage() {
  const [targetDate, setTargetDate] = useState(getNextWednesday);

  const [remaining, setRemaining] = useState(() => getRemaining(targetDate));

  const [live, setLive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = getRemaining(targetDate);

      setRemaining(next);

      if (next.total <= 0) {
        setLive(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  /*
   * Once the live state has been active for a short period,
   * automatically prepare the next Wednesday.
   */
  useEffect(() => {
    if (!live) return;

    const timeout = setTimeout(() => {
      const next = getNextWednesday();

      setTargetDate(next);
      setRemaining(getRemaining(next));
      setLive(false);
    }, 60000);

    return () => clearTimeout(timeout);
  }, [live]);

  const dateText = useMemo(() => {
    return targetDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }, [targetDate]);

  const timeText = useMemo(() => {
    return targetDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }, [targetDate]);

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#070809] text-white">
      <Background />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* LOGO */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#25F4EE] to-[#FE2C55] text-black shadow-[0_8px_30px_rgba(37,244,238,0.08)] transition group-hover:scale-105">
              <GraduationCap size={18} />
            </div>

            <div className="leading-none">
              <p className="text-[13px] font-extrabold tracking-tight">
                Adonay
              </p>

              <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">
                TikTok Academy
              </p>
            </div>
          </Link>

          {/* BACK */}
          <Link
            to="/register"
            className="group flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 text-[11px] font-semibold text-white/40 backdrop-blur-xl transition hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft
              size={13}
              className="transition-transform group-hover:-translate-x-0.5"
            />

            <span className="hidden sm:inline">Registration</span>
          </Link>
        </div>
      </header>

      {/* =====================================================
          CENTER
      ===================================================== */}

      <section className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center px-5 pb-10 pt-24 sm:px-8">
        <div className="w-full max-w-[900px]">
          {/* =================================================
              SMALL HEADER
          ================================================= */}

          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#25F4EE]/15 bg-[#25F4EE]/[0.045] px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#25F4EE] opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#25F4EE]" />
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#25F4EE]">
                Live Seminar
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-[-0.05em] sm:text-4xl lg:text-5xl">
              Your next class starts
              <span className="ml-2 bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
                soon.
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-xs leading-5 text-white/30 sm:text-sm">
              Get ready for the next Adonay TikTok Academy live training
              session.
            </p>
          </div>

          {/* =================================================
              MAIN COUNTDOWN CARD
          ================================================= */}

          <div className="relative mt-8 overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.035] shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            {/* TOP LIGHT */}
            <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[200px] w-[500px] -translate-x-1/2 rounded-full bg-[#25F4EE]/10 blur-[100px]" />

            {/* SIDE LIGHT */}
            <div className="pointer-events-none absolute bottom-[-100px] right-[-80px] h-[220px] w-[220px] rounded-full bg-[#FE2C55]/[0.07] blur-[90px]" />

            <div className="relative p-5 sm:p-7 lg:p-9">
              {/* =================================================
                  SESSION BAR
              ================================================= */}

              <div className="flex flex-col gap-4 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.045]">
                    <CalendarDays size={17} className="text-[#25F4EE]" />
                  </div>

                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20">
                      Next session
                    </p>

                    <p className="mt-1 text-xs font-bold text-white/75 sm:text-sm">
                      {dateText}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 sm:self-auto">
                  <Clock3 size={12} className="text-[#25F4EE]" />

                  <span className="text-[9px] font-semibold text-white/35">
                    {timeText}
                  </span>
                </div>
              </div>

              {/* =================================================
                  COUNTDOWN
              ================================================= */}

              <div className="py-8 sm:py-10">
                {live ? (
                  <LiveState />
                ) : (
                  <>
                    <div className="text-center">
                      <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">
                        Countdown to class
                      </p>
                    </div>

                    <div className="mx-auto mt-5 grid max-w-[760px] grid-cols-4 gap-2.5 sm:gap-4">
                      <CountdownUnit value={remaining.days} label="Days" />

                      <CountdownUnit value={remaining.hours} label="Hours" />

                      <CountdownUnit
                        value={remaining.minutes}
                        label="Minutes"
                      />

                      <CountdownUnit
                        value={remaining.seconds}
                        label="Seconds"
                        highlight
                      />
                    </div>
                  </>
                )}
              </div>

              {/* =================================================
                  BOTTOM BAR
              ================================================= */}

              <div className="flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25F4EE]/[0.06]">
                    <Sparkles size={14} className="text-[#25F4EE]" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-white/55">
                      TikTok Growth Masterclass
                    </p>

                    <p className="mt-0.5 text-[9px] text-white/20">
                      Practical training for real estate professionals
                    </p>
                  </div>
                </div>

                {LIVE_SEMINAR_URL ? (
                  <a
                    href={LIVE_SEMINAR_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#25F4EE] px-4 py-2.5 text-[10px] font-extrabold text-black transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(37,244,238,0.15)]"
                  >
                    <Play size={13} fill="currentColor" />
                    Join Live
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </a>
                ) : (
                  <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#25F4EE]" />

                    <span className="text-[9px] font-semibold text-white/30">
                      Live access details will be provided
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              SIMPLE INFO
          ================================================= */}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[9px] font-medium text-white/20">
            <span>Every Wednesday</span>

            <span className="hidden h-1 w-1 rounded-full bg-white/10 sm:block" />

            <span>Live training</span>

            <span className="hidden h-1 w-1 rounded-full bg-white/10 sm:block" />

            <span>Adonay TikTok Academy</span>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   COUNTDOWN UNIT
   ========================================================= */

function CountdownUnit({ value, label, highlight = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border px-2 py-5 text-center sm:px-4 sm:py-7 ${
        highlight
          ? "border-[#25F4EE]/15 bg-[#25F4EE]/[0.035]"
          : "border-white/[0.065] bg-black/20"
      }`}
    >
      {highlight && (
        <div className="absolute inset-x-0 top-0 h-px bg-[#25F4EE]/40" />
      )}

      <div
        className={`text-3xl font-black tracking-[-0.06em] sm:text-5xl lg:text-6xl ${
          highlight ? "text-[#25F4EE]" : "text-white"
        }`}
      >
        {pad(value)}
      </div>

      <p className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.18em] text-white/20 sm:text-[9px]">
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
    <div className="py-1 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#25F4EE]/20 bg-[#25F4EE]/[0.07] shadow-[0_0_45px_rgba(37,244,238,0.08)]">
        <Play size={22} fill="currentColor" className="ml-0.5 text-[#25F4EE]" />
      </div>

      <h2 className="mt-5 text-2xl font-black tracking-tight sm:text-3xl">
        The seminar is live
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-white/30">
        Your Wednesday academy session has started. Join the live class now.
      </p>

      {LIVE_SEMINAR_URL && (
        <a
          href={LIVE_SEMINAR_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25F4EE] px-5 py-3 text-xs font-extrabold text-black transition hover:-translate-y-0.5"
        >
          <Play size={14} fill="currentColor" />
          Join Live Seminars
        </a>
      )}
    </div>
  );
}

/* =========================================================
   BACKGROUND
   ========================================================= */

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* cyan glow */}
      <div className="absolute left-1/2 top-[-220px] h-[480px] w-[700px] -translate-x-1/2 rounded-full bg-[#25F4EE]/[0.035] blur-[150px]" />

      {/* red glow */}
      <div className="absolute bottom-[-220px] right-[-180px] h-[450px] w-[450px] rounded-full bg-[#FE2C55]/[0.035] blur-[150px]" />

      {/* subtle center glow */}
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.012] blur-[130px]" />

      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.014]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  );
}
