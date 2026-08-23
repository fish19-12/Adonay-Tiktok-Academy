import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import {
  Menu,
  X,
  Globe,
  Home,
  Images,
  Star,
  Info,
  ArrowRight,
} from "lucide-react";

import logo from "../../assets/images/logo.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenu, setLangMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const { t, i18n } = useTranslation();

  const langRef = useRef(null);

  const location = useLocation();

  /* =====================================
     CLOSE MENU ON ROUTE CHANGE
  ===================================== */

  useEffect(() => {
    setOpen(false);
  }, [location]);

  /* =====================================
     LOCK BODY SCROLL
  ===================================== */

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  /* =====================================
     SCROLL EFFECT
  ===================================== */

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setScrolled(currentScroll > 20);

      if (currentScroll > lastScroll && currentScroll > 120) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =====================================
     CLOSE LANGUAGE MENU
  ===================================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangMenu(false);
  };

  /* =====================================
     DESKTOP NAV LINK STYLE
  ===================================== */

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition duration-300 ${
      isActive ? "text-white" : "text-white/60 hover:text-white"
    }`;

  /* =====================================
     MOBILE BOTTOM NAV STYLE
  ===================================== */

  const bottomLinkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 text-[11px] transition-all duration-300 ${
      isActive ? "text-cyan-300 scale-105" : "text-white/45"
    }`;

  return (
    <>
      {/* =====================================
          DESKTOP NAVBAR
      ===================================== */}

      <motion.nav
        animate={{ y: showNavbar ? 0 : -120 }}
        transition={{ duration: 0.35 }}
        className="fixed top-0 left-0 z-50 hidden w-full justify-center px-6 pt-5 md:flex"
      >
        <div
          className={`w-full max-w-7xl rounded-3xl border transition-all duration-500 ${
            scrolled
              ? "border-white/10 bg-[#0B0D10]/75 shadow-2xl backdrop-blur-3xl"
              : "border-white/5 bg-white/[0.03] backdrop-blur-2xl"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 xl:px-8">
            {/* =====================================
                LOGO
            ===================================== */}

            <Link to="/" className="group flex items-center gap-4">
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={logo}
                  alt="Yeshi Tapisery"
                  className="h-12 w-12 object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 to-blue-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />
              </div>

              <div>
                <h2 className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-sm font-bold tracking-[0.18em] text-transparent">
                  Napi Production
                </h2>
              </div>
            </Link>

            {/* =====================================
                CENTER NAV
            ===================================== */}

            <div className="hidden items-center gap-8 lg:flex">
              <NavLink to="/" className={navLinkClass}>
                {({ isActive }) => (
                  <div className="relative">
                    {t("nav.home")}

                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
                      />
                    )}
                  </div>
                )}
              </NavLink>

              <NavLink to="/services" className={navLinkClass}>
                {({ isActive }) => (
                  <div className="relative">
                    {t("nav.services")}

                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
                      />
                    )}
                  </div>
                )}
              </NavLink>

              <NavLink to="/training" className={navLinkClass}>
                {({ isActive }) => (
                  <div className="relative">
                    {t("nav.about")}

                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
                      />
                    )}
                  </div>
                )}
              </NavLink>

              <NavLink to="/testimonial" className={navLinkClass}>
                {({ isActive }) => (
                  <div className="relative">
                    {t("nav.testimonial")}

                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
                      />
                    )}
                  </div>
                )}
              </NavLink>
            </div>

            {/* =====================================
                RIGHT SIDE
            ===================================== */}

            <div className="flex items-center gap-4">
              {/* LANGUAGE SWITCHER */}

              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangMenu(!langMenu)}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white/80 backdrop-blur-xl transition hover:bg-white/[0.08]"
                >
                  <Globe size={16} className="text-cyan-300" />

                  <span className="uppercase text-xs font-medium">
                    {i18n.language}
                  </span>
                </button>

                <AnimatePresence>
                  {langMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-40 overflow-hidden rounded-2xl border border-white/10 bg-[#111418]/95 backdrop-blur-3xl"
                    >
                      <button
                        onClick={() => changeLanguage("en")}
                        className="w-full px-5 py-3 text-left text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                      >
                        English
                      </button>

                      <button
                        onClick={() => changeLanguage("am")}
                        className="w-full px-5 py-3 text-left text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                      >
                        አማርኛ
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA */}

              <Link
                to="/booking"
                className="group hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] lg:flex"
              >
                Order Now
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* =====================================
          MOBILE TOP NAV
      ===================================== */}

      <div className="fixed top-0 left-0 z-50 w-full px-4 pt-4 md:hidden">
        <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-[#0B0D10]/80 px-4 py-3 backdrop-blur-3xl">
          {/* LOGO */}

          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Yeshi Tapisery"
              className="h-11 w-11 rounded-2xl object-cover"
            />

            <div>
              <h2 className="text-sm font-bold tracking-[0.15em] text-white">
                Napi
              </h2>

              <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">
                Production
              </p>
            </div>
          </Link>

          {/* MENU BUTTON */}

          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.08]"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* =====================================
          MOBILE MENU
      ===================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#06070A]/96 backdrop-blur-3xl md:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              <div className="space-y-8">
                {[
                  {
                    name: t("nav.home"),
                    path: "/",
                  },
                  {
                    name: t("nav.services"),
                    path: "/services",
                  },

                  {
                    name: t("nav.about"),
                    path: "/training",
                  },
                  {
                    name: t("nav.testimonial"),
                    path: "/testimonial",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.08,
                    }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className="block text-3xl font-semibold tracking-tight text-white/80 transition hover:text-cyan-300"
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* MOBILE LANGUAGE */}

              <div className="mt-14 flex items-center gap-4">
                <button
                  onClick={() => changeLanguage("en")}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
                >
                  English
                </button>

                <button
                  onClick={() => changeLanguage("am")}
                  className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-300"
                >
                  አማርኛ
                </button>
              </div>

              {/* CTA */}

              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-4 text-sm font-semibold text-white"
              >
                Book Appointment
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================
          MOBILE BOTTOM NAV
      ===================================== */}

      <div className="fixed bottom-4 left-1/2 z-50 flex w-[92%] max-w-md -translate-x-1/2 items-center justify-around rounded-3xl border border-white/10 bg-[#0B0D10]/85 px-3 py-3 backdrop-blur-3xl md:hidden">
        <NavLink to="/" className={bottomLinkClass}>
          <Home size={18} />
          Home
        </NavLink>

        <NavLink to="/services" className={bottomLinkClass}>
          <Images size={18} />
          services
        </NavLink>

        <NavLink to="/testimonial" className={bottomLinkClass}>
          <Star size={18} />
          Reviews
        </NavLink>

        <NavLink to="/training" className={bottomLinkClass}>
          <Info size={18} />
          About
        </NavLink>
      </div>
    </>
  );
}
