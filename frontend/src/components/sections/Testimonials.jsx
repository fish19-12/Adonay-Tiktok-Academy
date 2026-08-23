import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useTranslation } from "react-i18next";

import api from "../services/api";

import { Quote, Play, Star, X, Sparkles, ArrowRight } from "lucide-react";

import BookingCTA from "../components/sections/BookingCTA.jsx";

/* =========================================
   CACHE
========================================= */

const CACHE_KEY = "yeshi_tapisery_testimonials";

const CACHE_TIME = 1000 * 60 * 10;

/* =========================================
   COMPONENT
========================================= */

export default function Testimonials() {
  const { t } = useTranslation();

  const [testimonials, setTestimonials] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeVideo, setActiveVideo] = useState(null);

  /* =========================================
     FETCH TESTIMONIALS
  ========================================= */

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          let parsed;

          try {
            parsed = JSON.parse(cached);
          } catch {
            localStorage.removeItem(CACHE_KEY);
          }

          if (parsed) {
            const expired = Date.now() - parsed.timestamp > CACHE_TIME;

            if (!expired && Array.isArray(parsed.data)) {
              setTestimonials(parsed.data);

              setLoading(false);

              return;
            }
          }
        }

        const res = await api.get("/testimonials");

        if (Array.isArray(res.data)) {
          setTestimonials(res.data);

          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: res.data,
              timestamp: Date.now(),
            }),
          );
        } else {
          setTestimonials([]);
        }
      } catch (err) {
        console.log("Testimonials fetch error:", err);

        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  /* =========================================
     LOADING STATE
  ========================================= */

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#06070A] px-6 text-white">
        <div className="text-center">
          <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-2 border-white/10 border-t-blue-400" />

          <p className="text-white/60">Loading client experiences...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#06070A] px-5 py-32 text-white sm:px-8">
      {/* =========================================
          BACKGROUND EFFECTS
      ========================================= */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_30%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_30%)]" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B0F] via-[#06070A] to-black" />

      {/* Blur Blobs */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =========================================
            HEADER
        ========================================= */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-24 max-w-4xl text-center"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-2xl">
            <Sparkles size={15} className="text-blue-400" />

            <span className="text-sm text-white/70">Client Testimonials</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
            Real Stories From
            <span className="block bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
              Yeshi Tapisery Clients
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/60 sm:text-lg">
            Discover how Yeshi Tapisery transforms vehicle interiors with
            premium craftsmanship, modern upholstery, luxury comfort, and
            next-generation automotive design.
          </p>
        </motion.div>

        {/* =========================================
            EMPTY STATE
        ========================================= */}

        {(!testimonials || testimonials.length === 0) && (
          <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-16 text-center backdrop-blur-2xl">
            <p className="text-lg text-white/50">
              No client reviews available yet.
            </p>
          </div>
        )}

        {/* =========================================
            TESTIMONIAL GRID
        ========================================= */}

        {testimonials?.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl transition duration-500 hover:border-blue-400/20"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/[0.03] to-cyan-400/[0.04] opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* =========================================
                    MEDIA
                ========================================= */}

                <div className="relative h-64 overflow-hidden">
                  {item.video ? (
                    <div
                      className="relative h-full cursor-pointer"
                      onClick={() => setActiveVideo(item.video)}
                    >
                      <img
                        src={
                          item.thumbnail ||
                          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
                        }
                        alt="video preview"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/30 transition duration-500 group-hover:bg-black/50" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition duration-500 group-hover:scale-110">
                          <Play size={26} className="ml-1 text-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.image || "/images/default-client.jpg"}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  )}
                </div>

                {/* =========================================
                    CONTENT
                ========================================= */}

                <div className="relative z-10 p-7">
                  {/* Stars */}
                  <div className="mb-5 flex gap-1 text-blue-400">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>

                  {/* Quote */}
                  <Quote size={28} className="mb-5 text-blue-400" />

                  {/* Message */}
                  <p className="line-clamp-5 text-sm leading-relaxed text-white/60">
                    {item.message}
                  </p>

                  {/* Bottom */}
                  <div className="mt-8 flex items-center justify-between">
                    {/* User */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || "/images/default-client.jpg"}
                        alt={item.name}
                        className="h-12 w-12 rounded-full border border-white/10 object-cover"
                      />

                      <div>
                        <h4 className="font-medium text-white">{item.name}</h4>

                        {item.role && (
                          <p className="text-sm text-white/40">{item.role}</p>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-blue-400 transition duration-500 group-hover:translate-x-1">
                      <ArrowRight size={18} />
                    </div>
                  </div>

                  {/* Bottom Line */}
                  <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-700 group-hover:w-full" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* =========================================
            VIDEO MODAL
        ========================================= */}

        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 backdrop-blur-2xl"
            >
              <div className="relative w-full max-w-5xl">
                {/* Close Button */}
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20"
                >
                  <X size={18} />
                </button>

                {/* Video */}
                <motion.video
                  initial={{ scale: 0.92 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  controls
                  autoPlay
                  className="max-h-[80vh] w-full rounded-[28px] border border-white/10 bg-black object-contain"
                >
                  <source src={activeVideo} type="video/mp4" />
                </motion.video>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================
            CTA
        ========================================= */}

        <div className="mt-32">
          <BookingCTA />
        </div>
      </div>
    </section>
  );
}
