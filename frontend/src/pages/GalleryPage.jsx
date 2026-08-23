// src/pages/GalleryPage.jsx
import Gallery from "../components/sections/Gallery.jsx";
import BeforeAfter from "../components/sections/BeforeAfter.jsx";
import BookingCTA from "../components/sections/BookingCTA.jsx";

export default function GalleryPage() {
  return (
    <main>
      <Gallery />
      <BeforeAfter />

      <BookingCTA />
    </main>
  );
}
