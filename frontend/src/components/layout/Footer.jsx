import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[0.07] bg-[#faf8f5]">
      <div
        className="
          mx-auto
          flex
          max-w-6xl
          flex-col
          items-center
          justify-between
          gap-3
          px-5
          py-5
          text-center
          sm:flex-row
          sm:gap-4
          sm:px-8
          sm:py-6
          sm:text-left
        "
      >
        {/* =====================================================
            COPYRIGHT
        ===================================================== */}

        <p
          className="
            text-[10px]
            leading-5
            text-black/40
            sm:text-[11px]
          "
        >
          © {currentYear}{" "}
          <span className="font-bold text-black/65">Adonay TikTok Academy</span>
          . All rights reserved.
        </p>

        {/* =====================================================
            ESSENTIAL LINKS
        ===================================================== */}
      </div>
    </footer>
  );
}
