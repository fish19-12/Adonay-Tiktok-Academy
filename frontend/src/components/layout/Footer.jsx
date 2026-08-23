import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  X,
  ArrowUpRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [openContact, setOpenContact] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-[#030712] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071120] via-[#030712] to-black" />
      <div className="absolute -top-32 left-[-100px] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-100px] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-14 pb-28 sm:px-8">
        {/* MAIN GRID */}
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr]">
          {/* LEFT */}
          <div>
            {/* BADGE */}
            <motion.div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
              <Sparkles size={14} className="text-cyan-300" />
              <span className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">
                NAPI Production
              </span>
            </motion.div>

            {/* TITLE */}
            <h2 className="mt-6 text-4xl font-black sm:text-6xl">
              NAPI
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Production
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-white/60 leading-8 text-sm sm:text-base">
              We are a creative media production company specializing in video
              production, photography, branding, film-making, and digital
              marketing.
            </p>

            {/* LINKS (IMPROVED - NO "Quick Links" TITLE) */}
            <div className="mt-8 flex flex-wrap gap-3">
              {/* FAQ renamed */}
              <Link
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-cyan-500/10 hover:border-cyan-400/30 transition"
                to="/faq"
              >
                Frequently Asked Questions
              </Link>
            </div>

            {/* SOCIALS (IMPROVED MOBILE TOUCH) */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaTiktok].map(
                (Icon, i) => (
                  <motion.div
                    key={i}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 hover:bg-cyan-500/10 hover:text-cyan-300 transition"
                  >
                    <Icon />
                  </motion.div>
                ),
              )}
            </div>
          </div>

          {/* RIGHT - CONTACT (FIXED MOBILE DESIGN) */}
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-2xl shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold">Contact Us</h3>
            <p className="mt-2 text-white/60 text-sm">
              Let’s bring your ideas to life.
            </p>

            <div className="mt-6 space-y-3">
              {/* ADDRESS (COMPACT) */}
              <div className="flex items-center gap-3 rounded-xl bg-black/20 p-3 border border-white/10">
                <MapPin className="text-cyan-300" size={18} />
                <p className="text-sm text-white/70">Addis Ababa, Ethiopia</p>
              </div>

              {/* PHONE */}
              <a
                href="tel:+251908594030"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/10 transition"
              >
                <div className="flex items-center gap-3">
                  <Phone className="text-cyan-300" size={18} />
                  <div>
                    <p className="text-xs text-white/40 uppercase">Phone</p>
                    <p className="text-sm text-white/80">+251 90 859 4030</p>
                  </div>
                </div>
                <ArrowUpRight className="text-white/40" size={16} />
              </a>

              {/* EMAIL */}
              <a
                href="mailto:contact@napiproduction.com"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/10 transition"
              >
                <Mail className="text-cyan-300" size={18} />
                <div>
                  <p className="text-xs text-white/40 uppercase">Email</p>
                  <p className="text-sm text-white/80 break-all">
                    contact@napiproduction.com
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs sm:text-sm text-white/40">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">NAPI Production</span>. All
          rights reserved.
        </div>
      </div>

      {/* FLOATING CONTACT BUTTON (MOBILE FIXED) */}
      <div className="fixed bottom-5 right-5 z-[999]">
        <AnimatePresence>
          {openContact && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-3 flex flex-col gap-2 rounded-2xl bg-[#0B1020]/90 p-3 backdrop-blur-xl"
            >
              <a
                href="tel:+251908594030"
                className="rounded-xl bg-blue-500 px-4 py-2 text-sm"
              >
                Call
              </a>

              <a
                href="https://wa.me/251908594030"
                className="rounded-xl bg-green-500 px-4 py-2 text-sm"
              >
                WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpenContact(!openContact)}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg flex items-center justify-center"
        >
          {openContact ? <X size={18} /> : <MessageCircle size={18} />}
        </motion.button>
      </div>
    </footer>
  );
}
