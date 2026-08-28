import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen min-h-dvh w-full overflow-x-clip bg-primary font-sans text-light">
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#111",
              color: "#fff",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              padding: "16px",
              borderRadius: "14px",
            },
            success: {
              iconTheme: {
                primary: "#f59e0b",
                secondary: "#111",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#111",
              },
            },
          }}
        />

        <ScrollToTop />

        <Navbar />

        <main className="min-w-0 flex-grow overflow-x-clip">
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
