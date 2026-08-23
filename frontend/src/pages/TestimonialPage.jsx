import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Sparkles, Play } from "lucide-react";

/* ================= DATA ================= */

const testimonials = [
  {
    id: 1,
    type: "video",
    name: "Abel Wedding Story",
    role: "Wedding Client",
    tag: "Verified Client",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    text: "They captured our wedding like a cinematic movie. Unreal quality.",
    rating: 5,
    featured: true,
  },
  {
    id: 2,
    type: "video",
    name: "Selam Studio Ethiopia",
    role: "Brand Client",
    tag: "Corporate Brand",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    text: "Our social media engagement increased massively after their content.",
    rating: 5,
  },

  /* ================= TEXT TESTIMONIALS (NEW) ================= */

  {
    id: 3,
    type: "text",
    name: "Adonay",
    role: "Wedding Client",
    tag: "Verified Client",
    text: "NAPI Production made our wedding unforgettable. The video quality was beyond expectations.",
    rating: 5,
  },
  {
    id: 4,
    type: "text",
    name: "Bethelhem Tadesse",
    role: "Event Client",
    tag: "Event Organizer",
    text: "Very professional team. They handled our event coverage perfectly from start to finish.",
    rating: 5,
  },
  {
    id: 5,
    type: "text",
    name: "Yonas Studio Addis",
    role: "Photography Client",
    tag: "Creative Studio",
    text: "Best editing quality we’ve seen in Ethiopia. Clean, cinematic and very modern style.",
    rating: 5,
  },
  {
    id: 6,
    type: "text",
    name: "Mahi Events Ethiopia",
    role: "Event Company",
    tag: "Business Partner",
    text: "Reliable, fast delivery and very creative team. We always work with them.",
    rating: 5,
  },

  /* ================= PHOTO TESTIMONIALS (NEW) ================= */

  {
    id: 7,
    type: "photo",
    name: "Hanna Photography",
    role: "Wedding Client",
    tag: "Verified Client",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    text: "The photos were absolutely stunning. Every moment was captured perfectly.",
    rating: 5,
  },
  {
    id: 8,
    type: "photo",
    name: "Nati Event Hall",
    role: "Event Venue",
    tag: "Corporate Client",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    text: "Professional and high-quality event coverage. Very impressive work.",
    rating: 5,
  },
  {
    id: 9,
    type: "photo",
    name: "Liya Creative Studio",
    role: "Brand Client",
    tag: "Creative Agency",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    text: "Our brand visuals improved massively after working with NAPI Production.",
    rating: 5,
  },

  /* ================= VIDEO TESTIMONIALS ================= */

  {
    id: 10,
    type: "video",
    name: "Ethio Influencer Group",
    role: "Content Creators",
    tag: "Influencer",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    text: "Our videos went viral after collaborating with them. Highly recommended.",
    rating: 5,
    featured: true,
  },
  {
    id: 11,
    type: "video",
    name: "Brook Media Ethiopia",
    role: "Media Company",
    tag: "Media Partner",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    text: "Top-tier production quality. They are one of the best in Ethiopia.",
    rating: 5,
  },
];

/* ================= MAIN ================= */

export default function Testimonials() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => t.type === filter);

  const filters = [
    { key: "all", label: "All" },
    { key: "video", label: "Video" },
    { key: "photo", label: "Photo" },
    { key: "text", label: "Text" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#05060A] text-white px-4 sm:px-6 py-20">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C12] via-[#05060A] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,200,255,0.18),transparent_45%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
            <Sparkles size={14} className="text-cyan-300" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/70">
              Client Stories
            </span>
          </div>

          <h1 className="mt-6 text-3xl sm:text-5xl font-black">
            Trusted by{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
              Clients & Creators
            </span>
          </h1>

          <p className="mt-4 text-white/60 text-sm sm:text-base">
            Real results from weddings, brands, influencers, and businesses.
          </p>
        </div>

        {/* ================= MODERN FILTER ================= */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition ${
                  filter === f.key
                    ? "bg-cyan-400 text-black font-semibold"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= GRID ================= */}
        <motion.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TestimonialCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= CARD ================= */

function TestimonialCard({ item }) {
  return (
    <div
      className={`group relative rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
      ${
        item.featured
          ? "border-cyan-400/40 bg-cyan-400/5 shadow-lg shadow-cyan-500/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      {/* subtle glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-cyan-400/10 blur-2xl rounded-2xl" />

      {/* featured badge */}
      {item.featured && (
        <div className="absolute top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-cyan-400 text-black font-semibold">
          Featured
        </div>
      )}

      {/* MEDIA */}
      {item.type === "video" && (
        <div className="relative rounded-xl overflow-hidden mb-4 group">
          <iframe
            src={item.video}
            className="w-full h-52 rounded-xl"
            allowFullScreen
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
            <Play className="text-white" size={40} />
          </div>
        </div>
      )}

      {item.type === "photo" && (
        <img
          src={item.image}
          className="w-full h-52 object-cover rounded-xl mb-4"
        />
      )}

      {item.type === "text" && (
        <div className="mb-4 text-white/70 text-sm leading-6">
          <Quote className="text-cyan-300 mb-2" />
          {item.text}
        </div>
      )}

      {/* INFO */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{item.name}</h3>

        <span className="text-[10px] px-2 py-1 rounded-full border border-white/10 text-white/60">
          {item.tag}
        </span>
      </div>

      <p className="text-white/50 text-sm">{item.role}</p>

      {/* STARS */}
      <div className="flex gap-1 mt-2">
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-yellow-400" />
        ))}
      </div>
    </div>
  );
}
