import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { useTranslation } from "react-i18next";

import { ArrowRight, Sparkles, ShieldCheck, Phone } from "lucide-react";

export default function BookingCTA() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-[#06070A] px-5 py-32 text-white sm:px-8">
      {/* =========================================
          BACKGROUND EFFECTS
      ========================================= */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D11] via-[#06070A] to-black" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_28%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_30%)]" />

      {/* Glow Blobs */}
      <div className="absolute -top-10 left-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* =========================================
          CONTENT
      ========================================= */}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl sm:p-14"
      >
        {/* Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-cyan-400/[0.04]" />

        {/* Top Badge */}
        <div className="relative z-10 mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 backdrop-blur-xl">
            <Sparkles size={15} className="text-blue-400" />

            <span className="text-sm text-white/70">
              Premium Automotive Upholstery
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Heading */}
          <h2 className="mx-auto max-w-5xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
            Upgrade Your
            <span className="block bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
              Vehicle Interior
            </span>
            With Yeshi Tapisery
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/60 sm:text-lg md:text-xl">
            Experience modern upholstery craftsmanship inspired by Tesla-level
            precision, premium comfort, and futuristic interior design tailored
            for your vehicle.
          </p>

          {/* Feature Row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {[
              "Premium Materials",
              "Modern Interior Design",
              "Professional Craftsmanship",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl"
              >
                <ShieldCheck size={15} className="text-blue-400" />

                <span className="text-sm text-white/70">{item}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary CTA */}
            <Link
              to="/booking"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-blue-50 sm:w-auto"
            >
              <span className="relative z-10">{t("booking.ctaButton")}</span>

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/0 via-blue-200/40 to-blue-400/20 opacity-0 transition duration-500 group-hover:opacity-100" />
            </Link>

            {/* Secondary CTA */}
            <a
              href="tel:+251900000000"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-8 py-4 text-sm font-medium text-white backdrop-blur-2xl transition-all duration-300 hover:border-blue-400/30 hover:bg-white/[0.08] hover:text-blue-300 sm:w-auto"
            >
              <Phone size={17} />

              <span>Call Us Today</span>
            </a>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="relative z-10 mt-16 grid grid-cols-1 gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
          {[
            {
              value: "1000+",
              label: "Projects Completed",
            },
            {
              value: "10+",
              label: "Years Experience",
            },
            {
              value: "5.0",
              label: "Client Rating",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -4,
              }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-xl"
            >
              <h3 className="text-3xl font-semibold text-white">
                {item.value}
              </h3>

              <p className="mt-2 text-sm text-white/50">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
