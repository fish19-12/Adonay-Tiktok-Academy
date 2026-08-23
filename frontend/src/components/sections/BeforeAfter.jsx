import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// ✅ Import your real images
import beforeImg from "../../assets/images/before.jpg";
import afterImg from "../../assets/images/after.jpg";

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const { t } = useTranslation();

  return (
    <section className="bg-black text-white py-24 sm:py-32 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 sm:mb-20"
      >
        <h2 className="text-3xl sm:text-5xl font-bold mb-6">
          {t("beforeafter.title") || "Transformation"}
        </h2>

        <p className="text-gray-400 text-sm sm:text-base">
          {t("beforeafter.subtitle") || "Drag the slider to see the difference"}
        </p>
      </motion.div>

      {/* Slider Container */}
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl shadow-2xl group touch-none">
        {/* AFTER IMAGE (Background - Final Result) */}
        <img
          src={afterImg}
          alt="After"
          className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover select-none"
        />

        {/* BEFORE IMAGE (Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden transition-all duration-150"
          style={{ width: `${position}%` }}
        >
          <img
            src={beforeImg}
            alt="Before"
            className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover select-none"
          />
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-lg"
          style={{
            left: `${position}%`,
            transform: "translateX(-50%)",
          }}
        />

        {/* Handle */}
        <div
          className="absolute top-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full border-4 border-black shadow-xl flex items-center justify-center"
          style={{
            left: `${position}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-1 h-6 bg-black rounded-full"></div>
        </div>

        {/* Invisible Slider Control */}
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize"
        />

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-3 py-1 rounded-lg text-xs sm:text-sm tracking-wider">
          {t("beforeafter.before") || "BEFORE"}
        </div>

        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-3 py-1 rounded-lg text-xs sm:text-sm tracking-wider">
          {t("beforeafter.after") || "AFTER"}
        </div>
      </div>
    </section>
  );
}
