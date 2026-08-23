import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, ArrowRight, Sparkles, Eye, Search, X } from "lucide-react";

/* CAR CATEGORY IMAGES */
import byd from "../../assets/images/bydotto3.jpg";
import dezire from "../../assets/images/suzikidezire.jpg";
import rav4 from "../../assets/images/Rav4.jpg";
import vitz from "../../assets/images/toyotavitz.jpg";
import seagull from "../../assets/images/bydseggul.jpg";
import corolla from "../../assets/images/toyota corolla.jpg";
import sportage from "../../assets/images/kiasportage.jpg";
import ford from "../../assets/images/ford.jpg";
import tucson from "../../assets/images/tucson.jpg";
import landcruiser from "../../assets/images/landcruzer.jpg";
import jetour from "../../assets/images/jetour.jpg";
import prado from "../../assets/images/prado.jpg";

/* CAR CATEGORY DATA */
const carModels = [
  { name: "BYD Qin", image: byd },
  { name: "Suzuki Dzire", image: dezire },
  { name: "Rav4", image: rav4 },
  { name: "Vitz", image: vitz },
  { name: "BYD Seagull", image: seagull },
  { name: "Corolla", image: corolla },
  { name: "Sportage", image: sportage },
  { name: "Ford", image: ford },
  { name: "Tucson", image: tucson },
  { name: "Land Cruiser", image: landcruiser },
  { name: "Jetour", image: jetour },
  { name: "Prado", image: prado },
];

export default function Gallery() {
  const { i18n } = useTranslation();

  const navigate = useNavigate();

  const [selectedModel, setSelectedModel] = useState(null);

  const [images, setImages] = useState([]);

  const [imagesByModel, setImagesByModel] = useState({});

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);

  /* NEW SEARCH STATE */
  const [searchTerm, setSearchTerm] = useState("");

  /* =====================================
     FILTERED CAR MODELS
  ===================================== */

  const filteredCars = useMemo(() => {
    return carModels.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  /* =====================================
     PREVENT BODY SCROLL ON MODAL
  ===================================== */

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "auto";
  }, [selectedImage]);

  /* =====================================
     FETCH GALLERY
  ===================================== */

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/gallery`);

        const grouped = {};

        res.data.forEach((img) => {
          const key = img.carModel?.toLowerCase().trim();

          if (!grouped[key]) grouped[key] = [];

          grouped[key].push(img);
        });

        setImagesByModel(grouped);

        setLoading(false);
      } catch (error) {
        console.error("Gallery load error", error);

        setLoading(false);
      }
    };

    fetchAllImages();

    /* Preload car images */
    carModels.forEach((car) => {
      const img = new Image();

      img.src = car.image;
    });
  }, []);

  /* =====================================
     FETCH MODEL IMAGES
  ===================================== */

  const fetchImages = (model) => {
    setLoading(true);

    const filtered = imagesByModel[model.toLowerCase().trim()] || [];

    setImages(filtered);

    setSelectedModel(model);

    setLoading(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================
     BACK BUTTON
  ===================================== */

  const handleBack = () => {
    setSelectedModel(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#06070A] px-5 py-32 text-white sm:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_30%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_30%)]" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B0F] via-[#06070A] to-black" />

      {/* Blur Blobs */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mx-auto mb-20 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-2xl"
          >
            <Sparkles size={15} className="text-blue-400" />

            <span className="text-sm text-white/70">
              Premium Automotive Gallery
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl"
          >
            {selectedModel ? (
              <>
                <span className="text-white">{selectedModel}</span>

                <span className="block bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                  Interior Collection
                </span>
              </>
            ) : i18n.language === "am" ? (
              "የመኪና ሞዴል ይምረጡ"
            ) : (
              <>
                Explore Our
                <span className="block bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                  Premium Interior Work
                </span>
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Discover futuristic automotive upholstery crafted with precision,
            comfort, luxury materials, and modern interior aesthetics.
          </motion.p>

          {/* =====================================
              MODERN SEARCH BAR
          ===================================== */}

          {!selectedModel && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-12 max-w-2xl"
            >
              <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl transition duration-300 focus-within:border-blue-400/40 focus-within:bg-white/[0.07]">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-400/5 to-blue-500/10 opacity-0 transition duration-500 group-focus-within:opacity-100" />

                {/* Search Icon */}
                <Search
                  size={20}
                  className="absolute top-1/2 left-5 z-10 -translate-y-1/2 text-white/40"
                />

                {/* Input */}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={
                    i18n.language === "am"
                      ? "የመኪና ሞዴል ይፈልጉ..."
                      : "Search your car model..."
                  }
                  className="relative z-10 h-16 w-full bg-transparent pl-14 pr-14 text-white outline-none placeholder:text-white/35"
                />

                {/* Clear Button */}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute top-1/2 right-5 z-10 -translate-y-1/2 rounded-full bg-white/10 p-1 text-white/60 transition hover:bg-white/20 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Search Result Count */}
              <div className="mt-4 text-sm text-white/40">
                {filteredCars.length} model
                {filteredCars.length !== 1 ? "s" : ""} found
              </div>
            </motion.div>
          )}
        </div>

        {/* =====================================
            CAR MODELS GRID
        ===================================== */}

        <AnimatePresence mode="wait">
          {!selectedModel && (
            <motion.div
              key="models"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredCars.length === 0 ? (
                <div className="col-span-full rounded-[32px] border border-white/10 bg-white/[0.03] p-16 text-center backdrop-blur-xl">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                    <Search size={30} className="text-white/40" />
                  </div>

                  <h3 className="text-2xl font-semibold text-white">
                    No Car Model Found
                  </h3>

                  <p className="mt-3 text-white/50">
                    Try searching with another vehicle name.
                  </p>
                </div>
              ) : (
                filteredCars.map((car, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -8,
                    }}
                    transition={{ duration: 0.25 }}
                    onClick={() => fetchImages(car.name)}
                    className="group relative cursor-pointer overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="translate-y-4 transition duration-500 group-hover:translate-y-0">
                        <h3 className="text-2xl font-semibold text-white">
                          {car.name}
                        </h3>

                        <p className="mt-2 text-sm text-white/60">
                          View premium upholstery designs
                        </p>

                        <div className="mt-5 flex items-center gap-2 text-blue-400 opacity-0 transition duration-500 group-hover:opacity-100">
                          <span className="text-sm font-medium">
                            Explore Gallery
                          </span>

                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Hover Border Glow */}
                    <div className="absolute inset-0 rounded-[30px] border border-transparent transition duration-500 group-hover:border-blue-400/30" />
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* =====================================
              SELECTED MODEL GALLERY
          ===================================== */}

          {selectedModel && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white/70 backdrop-blur-xl transition hover:bg-white/[0.08] hover:text-white"
              >
                <ArrowLeft
                  size={17}
                  className="transition group-hover:-translate-x-1"
                />
                Back To Models
              </button>

              {/* Loading */}
              {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-80 animate-pulse rounded-[30px] bg-white/5"
                    />
                  ))}
                </div>
              ) : images.length === 0 ? (
                <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-16 text-center backdrop-blur-xl">
                  <p className="text-lg text-white/50">
                    No gallery images uploaded yet for this vehicle.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {images.map((img) => (
                    <motion.div
                      key={img._id}
                      whileHover={{
                        y: -6,
                      }}
                      transition={{ duration: 0.25 }}
                      onClick={() => setSelectedImage(img)}
                      className="group relative cursor-pointer overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03]"
                    >
                      <img
                        src={img.imageUrl}
                        alt=""
                        className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/40" />

                      {/* Hover Content */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100">
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-xl">
                          <Eye size={16} />
                          View Design
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =====================================
          LIGHTBOX
      ===================================== */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Layer */}
            <div
              className="absolute inset-0"
              onClick={() => setSelectedImage(null)}
            />

            {/* Modal Content */}
            <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">
              <motion.img
                src={selectedImage.imageUrl}
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-h-[80vh] w-auto rounded-[32px] border border-white/10 object-contain shadow-2xl"
              />

              {/* CTA */}
              <button
                onClick={() =>
                  navigate("/booking", {
                    state: {
                      selectedGallery: [selectedImage.imageUrl],
                    },
                  })
                }
                className="group mt-8 flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-black transition duration-300 hover:scale-[1.03]"
              >
                Book This Design
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
