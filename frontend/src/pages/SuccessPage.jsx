import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Sparkles, Phone, ArrowRight, Home } from "lucide-react";

export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  return (
    <section className="relative min-h-screen bg-[#05060A] text-white px-4 py-16 flex items-center justify-center overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C12] via-[#05060A] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_55%)]" />

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* TOP ICON */}
        <div className="flex justify-center">
          <div className="p-5 rounded-full bg-cyan-500/10 border border-cyan-400/20">
            <CheckCircle size={52} className="text-cyan-300" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="mt-6 text-center text-3xl sm:text-5xl font-black leading-tight">
          🎉 Booking <span className="text-cyan-300">Successful</span>
        </h1>

        {/* MESSAGE */}
        <p className="mt-4 text-center text-white/70 text-sm sm:text-base leading-relaxed px-2">
          Thank you{" "}
          <span className="text-cyan-300 font-semibold">
            {booking?.name || "Customer"}
          </span>
          . Your order has been received by <b>NAPI Production</b>. Our team
          will contact you shortly to confirm your project details.
        </p>

        {/* ORDER CARD */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6">
          <div className="flex items-center gap-2 text-cyan-300 font-semibold">
            <Sparkles size={16} />
            Order Details
          </div>

          <div className="mt-5 space-y-3 text-sm sm:text-base">
            <div className="flex justify-between gap-4">
              <span className="text-white/60">Name</span>
              <span className="text-white font-medium text-right">
                {booking?.name}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-white/60">Phone</span>
              <span className="text-white font-medium text-right">
                {booking?.phone}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-white/60">Date</span>
              <span className="text-white font-medium text-right">
                {booking?.date}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-white/60">Service</span>
              <span className="text-white font-medium text-right">
                {booking?.service?.title}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-white/60">Price</span>
              <span className="text-cyan-300 font-semibold text-right">
                {booking?.service?.price}
              </span>
            </div>
          </div>
        </div>

        {/* STATUS */}
        <div className="mt-6 text-center text-sm text-white/60">
          ⚡ Status:{" "}
          <span className="text-yellow-300 font-medium">
            Pending Confirmation
          </span>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-cyan-400 transition"
          >
            <Home size={16} />
            Back Home
          </button>
        </div>

        {/* FOOTER NOTE */}
        <p className="mt-8 text-center text-xs text-white/40 px-4 leading-relaxed">
          © NAPI Production — We create cinematic experiences ✨
        </p>
      </motion.div>
    </section>
  );
}
