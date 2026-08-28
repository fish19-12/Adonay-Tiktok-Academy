import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* =====================================================
            GLOBAL TOAST SYSTEM
        ===================================================== */}

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,

            style: {
              background: "#111111",
              color: "#ffffff",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              padding: "16px",
              borderRadius: "14px",
            },

            success: {
              iconTheme: {
                primary: "#f59e0b",
                secondary: "#111111",
              },
            },

            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#111111",
              },
            },
          }}
        />

        {/* =====================================================
            GLOBAL SCROLL BEHAVIOR
        ===================================================== */}

        <ScrollToTop />

        {/* =====================================================
            NAVBAR
        ===================================================== */}

        <Navbar />

        {/* =====================================================
            MAIN APPLICATION
        ===================================================== */}

        <main className="app-main">
          <AppRoutes />
        </main>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <Footer />
      </div>
    </BrowserRouter>
  );
}
