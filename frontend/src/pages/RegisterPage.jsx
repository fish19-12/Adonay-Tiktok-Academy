import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import api from "../services/api";

export default function RegisterPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialState = {
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    course: "",
    address: "",
    education: "",
    emergencyName: "",
    emergencyPhone: "",
  };

  const [form, setForm] = useState(initialState);
  const [idPhoto, setIdPhoto] = useState(null);
  const [idPreview, setIdPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleIdPhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Allow only images or PDF
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      alert("Only image or PDF files are allowed.");
      return;
    }

    setIdPhoto(file);

    if (file.type.startsWith("image/")) {
      setIdPreview(URL.createObjectURL(file));
    } else {
      setIdPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(form.age) < 18) {
      return alert("Student must be 18 years or older.");
    }

    if (!idPhoto) {
      return alert("Please upload National ID or Residence document.");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("idDocument", idPhoto);

      await api.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registration successful 🎉");

      setForm(initialState);
      setIdPhoto(null);
      setIdPreview(null);
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white py-28 px-4">
      {/* Intro */}
      <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-6 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm tracking-widest"
        >
          🏆 Government Recognized Training College
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-300 bg-clip-text text-transparent">
          {t("register.title")}
        </h1>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="form-modern"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="form-modern"
              required
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="form-modern"
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              className="form-modern"
              required
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="form-modern"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              className="form-modern"
              required
            >
              <option value="">Select Course</option>
              <option value="Leather Training">Leather Training</option>
              <option value="Roof Training">Roof Training</option>
              <option value="Panel Training">Panel Training</option>
            </select>
          </div>

          {/* Education */}
          <select
            name="education"
            value={form.education}
            onChange={handleChange}
            className="form-modern w-full"
            required
          >
            <option value="">Education Level</option>
            <option value="High School">High School</option>
            <option value="Diploma">Diploma</option>
            <option value="Degree">Degree</option>
          </select>

          {/* Emergency */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="emergencyName"
              placeholder="Emergency Contact Name"
              value={form.emergencyName}
              onChange={handleChange}
              className="form-modern"
              required
            />
            <input
              name="emergencyPhone"
              placeholder="Emergency Contact Phone"
              value={form.emergencyPhone}
              onChange={handleChange}
              className="form-modern"
              required
            />
          </div>

          {/* Address */}
          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-6 rounded-2xl bg-neutral-900 border border-white/10 focus:border-amber-500 outline-none min-h-[140px] transition"
            required
          />

          {/* ID DOCUMENT UPLOAD */}
          <div className="border-2 border-dashed border-amber-500/40 rounded-2xl p-8 text-center bg-neutral-900">
            <p className="text-amber-400 font-semibold mb-3">
              Upload National ID or Residence Document
            </p>

            {idPreview && (
              <img
                src={idPreview}
                alt="ID Preview"
                className="mx-auto mb-4 max-h-60 rounded-lg"
              />
            )}

            <label className="cursor-pointer bg-amber-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-amber-400 transition">
              Choose File
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleIdPhotoChange}
                className="hidden"
              />
            </label>

            {idPhoto && (
              <p className="mt-3 text-sm text-gray-400">
                Selected: {idPhoto.name}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-semibold text-xl transition shadow-xl ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:scale-105"
            }`}
          >
            {loading ? "Submitting..." : "Complete Registration"}
          </button>
        </form>
      </motion.div>

      <style jsx>{`
        .form-modern {
          padding: 18px;
          border-radius: 18px;
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: white;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-modern:focus {
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
        }
      `}</style>
    </main>
  );
}
