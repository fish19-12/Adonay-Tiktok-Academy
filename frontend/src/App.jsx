import { BrowserRouter, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

function AppFrame() {
  const { pathname } = useLocation();
  const isMiniApp = pathname.startsWith("/app");

  return (
    <div className={`app-shell${isMiniApp ? " app-shell-mini" : ""}`}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,

          style: {
            background: "#0b0f17",
            color: "#ffffff",
            border: "1px solid rgba(37, 244, 238, 0.16)",
            padding: "14px 16px",
            borderRadius: "14px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
          },

          success: {
            iconTheme: {
              primary: "#25F4EE",
              secondary: "#030712",
            },
          },

          error: {
            iconTheme: {
              primary: "#FE2C55",
              secondary: "#030712",
            },
          },
        }}
      />

      {!isMiniApp && <ScrollToTop />}

      {!isMiniApp && <Navbar />}

      <main className="app-main">
        <AppRoutes />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppFrame />
    </BrowserRouter>
  );
}
