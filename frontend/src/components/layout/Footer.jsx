import { Link } from "react-router-dom";

import { Mail, MapPin, Building2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#030303] text-white">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(37,244,238,0.07),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(254,44,85,0.07),transparent_30%)]" />

      <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#25F4EE]/[0.04] blur-[110px]" />

      <div className="absolute bottom-[-180px] right-[-180px] h-[450px] w-[450px] rounded-full bg-[#FE2C55]/[0.05] blur-[120px]" />

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        {/* ===================================================
            BRAND SECTION
        =================================================== */}

        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          {/* =================================================
              BRAND
          ================================================= */}

          <div>
            {/* Brand badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-[#25F4EE] to-[#FE2C55] text-black">
                <Building2 size={13} />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/65">
                Adonay TikTok Academy
              </span>
            </div>

            {/* Main title */}

            <h2 className="mt-6 text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-white">Adonay</span>

              <span className="mt-1 block bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
                TikTok Academy
              </span>
            </h2>

            {/* Description */}

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
              A modern learning platform helping creators, entrepreneurs,
              professionals, and agents build their personal brand, create
              engaging content, and grow their online presence.
            </p>

            {/* Tagline */}

            <div className="mt-7 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em]">
              <span className="text-[#25F4EE]">Learn</span>

              <span className="text-white/20">•</span>

              <span className="text-white/70">Create</span>

              <span className="text-white/20">•</span>

              <span className="text-[#FE2C55]">Grow</span>

              <span className="text-white/20">•</span>

              <span className="text-white/70">Go Viral</span>
            </div>
          </div>

          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
              Get In Touch
            </p>

            <h3 className="mt-3 text-xl font-bold text-white">Contact Us</h3>

            <p className="mt-3 text-sm leading-6 text-white/45">
              Have a question about Adonay TikTok Academy? Send us a message and
              our team will get back to you.
            </p>

            <div className="mt-6 space-y-3">
              {/* =================================================
                  LOCATION
              ================================================= */}

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#25F4EE]/10">
                  <MapPin size={18} className="text-[#25F4EE]" />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/30">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-white/70">
                    Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>

              {/* =================================================
                  EMAIL
              ================================================= */}

              <a
                href="mailto:contact@adonaytiktokacademy.com"
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 transition-all duration-300 hover:border-[#FE2C55]/30 hover:bg-[#FE2C55]/[0.04]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FE2C55]/10">
                  <Mail size={18} className="text-[#FE2C55]" />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/30">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm text-white/70 transition group-hover:text-white">
                    contact@adonaytiktokacademy.com
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ===================================================== */}

        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center sm:flex-row sm:text-left">
          {/* COPYRIGHT */}

          <p className="text-[11px] text-white/35">
            © {currentYear}{" "}
            <span className="font-semibold text-white/65">
              Adonay TikTok Academy
            </span>
            . All rights reserved.
          </p>

          {/* LEGAL */}

          <div className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white/30">
            <Link to="/privacy" className="transition hover:text-[#25F4EE]">
              Privacy
            </Link>

            <span className="h-1 w-1 rounded-full bg-white/20" />

            <Link to="/terms" className="transition hover:text-[#FE2C55]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
