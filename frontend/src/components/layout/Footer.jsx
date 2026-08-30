import { Link } from "react-router-dom";
import { Mail, MapPin, Building2, ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/60 text-slate-900">
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Cyan glow */}
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl" />

        {/* Pink glow */}
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-pink-300/25 blur-3xl" />

        {/* Soft purple glow */}
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/20 blur-3xl" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* =====================================================
          TOP ACCENT LINE
      ===================================================== */}

      <div className="relative h-1 w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:gap-20">
          {/* =================================================
              BRAND SECTION
          ================================================= */}

          <div>
            {/* Brand badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-md">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-sm">
                <Building2 size={14} strokeWidth={2.5} />
              </span>

              <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-slate-600">
                Adonay TikTok Academy
              </span>
            </div>

            {/* Main title */}
            <h2 className="mt-5 max-w-xl text-3xl font-black leading-[1.05] tracking-[-0.04em] text-slate-900 sm:text-4xl">
              Learn.
              <span className="bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                Create.
              </span>
              <br />
              <span className="text-slate-800">Grow your influence.</span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
              A modern learning platform helping creators, entrepreneurs,
              professionals, and agents build their personal brand, create
              engaging content, and grow their online presence.
            </p>

            {/* Learning tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-cyan-700 ring-1 ring-cyan-100">
                Learn
              </span>

              <span className="rounded-full bg-violet-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-violet-700 ring-1 ring-violet-100">
                Create
              </span>

              <span className="rounded-full bg-pink-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-pink-700 ring-1 ring-pink-100">
                Grow
              </span>

              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-amber-700 ring-1 ring-amber-100">
                Go Viral
              </span>
            </div>

            {/* Small academy message */}
            <div className="mt-7 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                <Sparkles size={16} className="text-violet-500" />
              </div>

              <p className="text-xs font-medium text-slate-500">
                Build your skills. Build your audience.
              </p>
            </div>
          </div>

          {/* =================================================
              CONTACT CARD
          ================================================= */}

          <div className="lg:pt-2">
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_15px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-6">
              {/* Heading */}
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-violet-500">
                  Get In Touch
                </p>

                <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-slate-900">
                  Contact Us
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Have a question? Our team is ready to help.
                </p>
              </div>

              {/* Contact items */}
              <div className="mt-5 space-y-3">
                {/* Location */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 transition-all duration-300 hover:border-cyan-200 hover:bg-cyan-50/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100">
                    <MapPin
                      size={17}
                      strokeWidth={2.2}
                      className="text-cyan-600"
                    />
                  </div>

                  <div>
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                      Location
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-slate-700">
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>

                {/* Email */}
                <a
                  href="mailto:contact@adonaytiktokacademy.com"
                  className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 transition-all duration-300 hover:border-pink-200 hover:bg-pink-50/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100 transition-transform duration-300 group-hover:scale-105">
                    <Mail
                      size={17}
                      strokeWidth={2.2}
                      className="text-pink-600"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                      Email
                    </p>

                    <p className="mt-0.5 truncate text-xs font-semibold text-slate-700 transition-colors group-hover:text-pink-600">
                      contact@adonaytiktokacademy.com
                    </p>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pink-500"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ===================================================== */}

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Copyright */}
          <p className="text-[10px] text-slate-400">
            © {currentYear}{" "}
            <span className="font-bold text-slate-600">
              Adonay TikTok Academy
            </span>
            . All rights reserved.
          </p>

          {/* Legal */}
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 transition-colors hover:text-cyan-600"
            >
              Privacy
            </Link>

            <span className="h-1 w-1 rounded-full bg-slate-300" />

            <Link
              to="/terms"
              className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 transition-colors hover:text-pink-600"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
