import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Phone,
  MapPin,
  Car,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      q: "What services does NAPI Production provide?",
      a: "NAPI Production is a creative media company specializing in video production, photography, branding, film-making, social media content creation, and digital marketing solutions for businesses and creators.",
      icon: <Sparkles size={18} />,
    },
    {
      q: "Where is NAPI Production located?",
      a: "NAPI Production is based in Addis Ababa, Ethiopia, and provides services for clients locally and internationally depending on project needs.",
      icon: <MapPin size={18} />,
    },
    {
      q: "What type of video production do you offer?",
      a: "We produce commercials, promotional videos, corporate videos, music videos, documentaries, event coverage, interviews, and social media content.",
      icon: <Car size={18} />,
    },
    {
      q: "Do you also offer photography services?",
      a: "Yes. We provide professional photography including events, portraits, branding shoots, product photography, and lifestyle content creation.",
      icon: <Sparkles size={18} />,
    },
    {
      q: "How long does a project usually take?",
      a: "Project timelines depend on complexity. Small content projects take 1–3 days, while full production projects may take longer depending on planning and editing requirements.",
      icon: <ShieldCheck size={18} />,
    },
    {
      q: "How can I contact NAPI Production?",
      a: "You can contact us directly via phone or WhatsApp at +251 90 859 4030 for bookings, inquiries, and project discussions.",
      icon: <Phone size={18} />,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] px-4 py-24 text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071120] via-[#030712] to-black" />
      <div className="absolute -top-40 left-[-120px] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-[-150px] right-[-120px] h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* BADGE */}
        <motion.div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
          <MessageCircle size={14} className="text-cyan-300" />
          <span className="text-xs uppercase tracking-[0.2em] text-cyan-100/80">
            Frequently Asked Questions
          </span>
        </motion.div>

        {/* TITLE */}
        <motion.h1 className="text-center text-4xl font-black sm:text-6xl">
          NAPI
          <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Production FAQ
          </span>
        </motion.h1>

        {/* SUBTITLE */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-8 text-white/60 sm:text-base">
          Everything you need to know about our creative production services,
          process, and how we help brands grow through powerful visual
          storytelling.
        </p>

        {/* FAQ LIST */}
        <div className="mt-14 space-y-5">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
            >
              {/* QUESTION */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left hover:bg-white/[0.03]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                    {item.icon}
                  </div>

                  <span className="text-base font-semibold text-white">
                    {item.q}
                  </span>
                </div>

                <span className="text-cyan-300 text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* ANSWER */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-sm leading-7 text-white/60">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
            <Phone size={24} />
          </div>

          <h3 className="mt-5 text-2xl font-bold">Need Help?</h3>

          <p className="mt-3 text-white/60">
            Contact NAPI Production for fast support and project booking.
          </p>

          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="tel:+251908594030"
              className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-black"
            >
              Call +251 90 859 4030
            </a>

            <a
              href="https://wa.me/251908594030"
              className="rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
