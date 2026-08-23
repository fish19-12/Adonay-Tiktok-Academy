import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Sparkles,
  ArrowRight,
  Phone,
  User,
  Calendar,
  CheckCircle2,
  CreditCard,
  Copy,
  Camera,
  UploadCloud,
} from "lucide-react";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const service = location.state?.service || null;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
  });

  const [paymentProof, setPaymentProof] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!service) navigate("/");
  }, [service, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyNumber = async () => {
    await navigator.clipboard.writeText("0908594030");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPaymentProof(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.date) {
      return alert("Please complete all fields");
    }

    if (!paymentProof) {
      return alert("Please upload your payment screenshot");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("date", form.date);
      formData.append("service", JSON.stringify(service));
      formData.append("paymentScreenshot", paymentProof);

      const { data } = await api.post("/booking", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/booking-success", {
        state: { booking: data.booking },
      });
    } catch (err) {
      console.log(err);
      alert("Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#05060A] text-white px-4 py-16 sm:py-24 relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C12] via-[#05060A] to-black" />

      {/* GLOW */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Sparkles size={14} className="text-cyan-300" />
            NAPI PRODUCTION
          </div>

          <h1 className="mt-6 text-3xl sm:text-5xl font-black">
            Complete Your <span className="text-cyan-300">Booking</span>
          </h1>

          <p className="text-white/60 mt-3 text-sm sm:text-base">
            Fill in your details and confirm your production order
          </p>
        </div>

        {/* GRID */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          {/* FORM */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
            {/* NAME */}
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              icon={<User size={14} />}
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            {/* PHONE */}
            <Input
              label="Phone Number"
              placeholder="e.g. +251 90 000 0000"
              icon={<Phone size={14} />}
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            {/* DATE */}
            <Input
              label="When do you need the service?"
              placeholder="Select your preferred date"
              icon={<Calendar size={14} />}
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />

            {/* PAYMENT CARD */}
            <div className="mt-6 p-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/10">
              <p className="text-cyan-300 font-semibold flex items-center gap-2">
                <CreditCard size={16} />
                Pre-Payment Required
              </p>

              <p className="text-sm mt-2 text-white/60">
                Pay 3000 ETB via Telebirr to confirm your booking
              </p>

              <div className="mt-4 flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/10">
                <span className="text-sm">📲 0908594030</span>

                <button
                  onClick={copyNumber}
                  className="text-cyan-300 text-xs flex items-center gap-1"
                >
                  <Copy size={14} />
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <p className="text-xs text-white/40 mt-2">
                Account Name: NAPI PRODUCTION
              </p>
            </div>

            {/* UPLOAD */}
            <div className="mt-6">
              <label className="text-sm text-white/60 flex items-center gap-2">
                <UploadCloud size={14} />
                Upload your payment screenshot
              </label>

              <div className="mt-2 relative border border-white/10 bg-black/40 rounded-2xl p-6 text-center hover:border-cyan-400 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center gap-2 text-white/50">
                  <Camera size={26} className="text-cyan-300" />
                  <p className="text-sm">Tap to upload payment screenshot</p>
                  <p className="text-xs text-white/30">
                    JPG, PNG or photo from gallery
                  </p>
                </div>
              </div>

              {/* PREVIEW */}
              {preview && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={preview}
                  className="mt-4 rounded-xl border border-white/10 max-h-48 w-full object-cover"
                />
              )}
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`mt-6 w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                loading
                  ? "bg-gray-600"
                  : "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:scale-[1.02]"
              }`}
            >
              {loading ? "Processing..." : "Submit Booking"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </div>

          {/* SUMMARY */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {service ? (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-black/30 border border-white/10">
                  <h3 className="text-cyan-300 font-semibold text-lg">
                    {service.title}
                  </h3>
                  <p className="text-white/60 mt-1">{service.price}</p>
                </div>

                <div className="space-y-2">
                  {service.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-white/70 text-sm p-2 rounded-lg hover:bg-white/5"
                    >
                      <CheckCircle2 size={14} className="text-cyan-300" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-white/40">
                  ⚡ Professional • Fast Delivery • Premium Quality
                </div>
              </div>
            ) : (
              <p className="text-white/50">No service selected</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* INPUT COMPONENT */
function Input({ label, icon, ...props }) {
  return (
    <div className="mb-4">
      <label className="text-sm text-white/60 flex items-center gap-2 mb-2">
        {icon} {label}
      </label>

      <input
        {...props}
        className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 outline-none focus:border-cyan-400 transition"
      />
    </div>
  );
}
