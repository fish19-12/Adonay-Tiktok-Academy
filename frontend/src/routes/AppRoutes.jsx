import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import ServicesPage from "../pages/ServicesPage.jsx";
import GalleryPage from "../pages/GalleryPage.jsx";
import TrainingPage from "../pages/TrainingPage.jsx";
import TrainingDetails from "../pages/TrainingDetails.jsx"; // ⭐ NEW
import BookingPage from "../pages/BookingPage.jsx";
import TestimonialPage from "../pages/TestimonialPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import FAQPage from "../pages/FAQPage.jsx";
import SuccessPage from "../pages/SuccessPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/training" element={<TrainingPage />} />

      {/* ⭐ NEW TRAINING VIDEO PAGE */}
      <Route path="/training/:id" element={<TrainingDetails />} />

      <Route path="/booking" element={<BookingPage />} />
      <Route path="/testimonial" element={<TestimonialPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/booking-success" element={<SuccessPage />} />
      <Route path="/faq" element={<FAQPage />} />
    </Routes>
  );
}
