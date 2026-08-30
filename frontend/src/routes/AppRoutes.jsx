import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import ServicesPage from "../pages/ServicesPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import TestimonialPage from "../pages/TestimonialPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import FAQPage from "../pages/FAQPage.jsx";
import SeminarCountdownPage from "../pages/SeminarCountdownPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Academy */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/testimonial" element={<TestimonialPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/seminar-countdown" element={<SeminarCountdownPage />} />

      {/* Registration */}
      <Route path="/register" element={<RegisterPage />} />

      {/* Support */}
      <Route path="/faq" element={<FAQPage />} />
    </Routes>
  );
}
