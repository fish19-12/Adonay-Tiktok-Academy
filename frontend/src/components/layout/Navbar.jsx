import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Menu,
  X,
  Home,
  Star,
  Info,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import logo from "../../assets/images/logo.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  /* ============================================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ============================================================ */

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /* ============================================================
     MOBILE BODY SCROLL LOCK
  ============================================================ */

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
    } else {
      document.body.style.overflow = previousOverflow || "";
      document.body.style.overscrollBehavior = previousOverscroll || "";
    }

    return () => {
      document.body.style.overflow = previousOverflow || "";
      document.body.style.overscrollBehavior = previousOverscroll || "";
    };
  }, [open]);

  /* ============================================================
     SCROLL EFFECT
     Navbar stays visible while scrolling.
  ============================================================ */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY || 0;

        setScrolled(currentScroll > 25);

        ticking = false;
      });

      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ============================================================
     DESKTOP NAV LINK STYLE
  ============================================================ */

  const navLinkClass = ({ isActive }) =>
    `group relative flex items-center text-[13px] font-semibold tracking-wide transition-all duration-300 ${
      isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
    }`;

  /* ============================================================
     DESKTOP ACTIVE INDICATOR
  ============================================================ */

  const NavIndicator = ({ isActive }) => {
    if (!isActive) return null;

    return (
      <motion.span
        layoutId="navbar-indicator"
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
        }}
        className="absolute -bottom-2 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500"
      />
    );
  };

  /* ============================================================
     DESKTOP NAVIGATION ITEMS
  ============================================================ */

  const desktopItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Testimonials",
      path: "/testimonial",
    },
  ];

  /* ============================================================
     MOBILE NAVIGATION ITEMS
  ============================================================ */

  const mobileItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
      description: "Discover the academy",
    },
    {
      name: "Services",
      path: "/services",
      icon: Sparkles,
      description: "Explore what we offer",
    },
    {
      name: "About",
      path: "/about",
      icon: Info,
      description: "Learn about us",
    },
    {
      name: "Testimonials",
      path: "/testimonial",
      icon: Star,
      description: "See student experiences",
    },
    {
      name: "FAQ",
      path: "/faq",
      icon: Sparkles,
      description: "Get answers",
    },
  ];

  return (
    <>
      {/* ============================================================
          DESKTOP NAVBAR
          ALWAYS FIXED
          NEVER DISAPPEARS ON SCROLL
      ============================================================ */}

      <nav
        className="fixed left-0 top-0 z-[100] hidden w-full justify-center px-5 pt-4 md:flex"
        style={{
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
        }}
      >
        <div
          className={`w-full max-w-7xl overflow-hidden rounded-2xl border transition-all duration-500 ${
            scrolled
              ? "border-slate-200/90 bg-white/98 shadow-[0_18px_55px_rgba(15,23,42,0.14)]"
              : "border-white/80 bg-white/90 shadow-[0_10px_35px_rgba(15,23,42,0.07)]"
          }`}
          style={{
            WebkitBackdropFilter: "blur(20px)",
            backdropFilter: "blur(20px)",
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
          }}
        >
          {/* TOP COLOR ACCENT */}

          <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />

          <div className="flex h-[70px] items-center justify-between px-5 xl:px-7">
            {/* BRAND */}

            <Link to="/" className="group flex min-w-0 items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md">
                <img
                  src={logo}
                  alt="Adonay TikTok Academy"
                  width="44"
                  height="44"
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-cyan-400/20" />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-[13px] font-black uppercase tracking-[0.12em] text-slate-900">
                  Adonay
                </h1>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-cyan-600">
                    TikTok
                  </span>

                  <span className="text-[8px] font-bold text-slate-300">/</span>

                  <span className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-pink-500">
                    Academy
                  </span>
                </div>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}

            <div className="hidden items-center gap-8 lg:flex">
              {desktopItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navLinkClass}
                >
                  {({ isActive }) => (
                    <div className="relative py-2">
                      {item.name}

                      <NavIndicator isActive={isActive} />
                    </div>
                  )}
                </NavLink>
              ))}
            </div>

            {/* RIGHT SIDE */}

            <div className="flex items-center gap-3">
              {/* Academy Badge */}

              <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 xl:flex">
                <Sparkles size={13} className="text-violet-500" />

                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  Learn & Grow
                </span>
              </div>

              {/* REGISTER BUTTON */}

              <Link
                to="/register"
                className="group relative hidden h-10 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_8px_25px_rgba(124,58,237,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(124,58,237,0.28)] lg:flex"
              >
                <GraduationCap
                  size={15}
                  strokeWidth={2.5}
                  className="relative z-10"
                />

                <span className="relative z-10">Register</span>

                <ArrowRight
                  size={14}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />

                {/* Shine */}

                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ============================================================
          MOBILE TOP NAVBAR
          NO MOBILE BOTTOM BAR
      ============================================================ */}

      <div
        className="fixed left-0 top-0 z-[100] w-full px-4 pt-4 md:hidden"
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
        }}
      >
        <div
          className={`relative overflow-hidden rounded-2xl border px-3.5 transition-all duration-500 ${
            scrolled
              ? "border-slate-200 bg-white/98 shadow-[0_15px_45px_rgba(15,23,42,0.15)]"
              : "border-slate-200/70 bg-white/92 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
          }`}
          style={{
            WebkitBackdropFilter: "blur(20px)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Accent */}

          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />

          <div className="flex h-[62px] items-center justify-between">
            {/* MOBILE BRAND */}

            <Link to="/" className="flex min-w-0 items-center gap-2.5">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={logo}
                  alt="Adonay TikTok Academy"
                  width="40"
                  height="40"
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-900">
                  Adonay
                </h2>

                <div className="mt-0.5 flex items-center gap-1">
                  <span className="text-[7px] font-extrabold uppercase tracking-[0.18em] text-cyan-600">
                    TikTok
                  </span>

                  <span className="text-[7px] text-slate-300">/</span>

                  <span className="text-[7px] font-extrabold uppercase tracking-[0.15em] text-pink-500">
                    Academy
                  </span>
                </div>
              </div>
            </Link>

            {/* MOBILE ACTIONS */}

            <div className="flex items-center gap-2">
              {/* Join */}

              <Link
                to="/register"
                aria-label="Register for training"
                className="flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-3 text-[9px] font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_5px_18px_rgba(124,58,237,0.18)] transition-transform duration-300 active:scale-95"
              >
                <GraduationCap size={14} />

                <span className="hidden min-[390px]:inline">Join</span>
              </Link>

              {/* Menu */}

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                  open
                    ? "border-violet-200 bg-violet-50 text-violet-600"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-violet-200 hover:text-violet-600"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span
                      key="close"
                      initial={{
                        opacity: 0,
                        rotate: -90,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        rotate: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        rotate: 90,
                        scale: 0.7,
                      }}
                    >
                      <X size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{
                        opacity: 0,
                        rotate: 90,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        rotate: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        rotate: -90,
                        scale: 0.7,
                      }}
                    >
                      <Menu size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          MOBILE FULL SCREEN MENU
      ============================================================ */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed inset-0 z-[90] bg-gradient-to-br from-slate-50 via-white to-cyan-50 md:hidden"
            style={{
              WebkitTransform: "translateZ(0)",
              transform: "translateZ(0)",
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            {/* BACKGROUND GLOW */}

            <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="pointer-events-none absolute -right-28 bottom-20 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/20 blur-3xl" />

            {/* GRID */}

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* MENU CONTENT */}

            <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-28">
              {/* HEADER */}

              <div className="mb-9">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-7 rounded-full bg-cyan-400" />
                  <span className="h-1.5 w-4 rounded-full bg-violet-500" />
                  <span className="h-1.5 w-7 rounded-full bg-pink-500" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <img
                      src={logo}
                      alt="Adonay TikTok Academy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">
                      Adonay TikTok Academy
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Learn. Create. Grow.
                    </p>
                  </div>
                </div>
              </div>

              {/* NAVIGATION */}

              <div className="space-y-2">
                {mobileItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.path}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.25,
                      }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
                            isActive
                              ? "border-violet-200 bg-white shadow-[0_8px_30px_rgba(124,58,237,0.08)]"
                              : "border-transparent hover:border-slate-200 hover:bg-white/70"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {/* ICON */}

                            <div
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                                isActive
                                  ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500 text-white shadow-sm"
                                  : "bg-white text-slate-400 ring-1 ring-slate-200 group-hover:text-violet-500"
                              }`}
                            >
                              <Icon size={18} />
                            </div>

                            {/* TEXT */}

                            <div className="min-w-0 flex-1">
                              <p
                                className={`text-sm font-bold ${
                                  isActive
                                    ? "text-slate-900"
                                    : "text-slate-600 group-hover:text-slate-900"
                                }`}
                              >
                                {item.name}
                              </p>

                              <p className="mt-0.5 text-[10px] text-slate-400">
                                {item.description}
                              </p>
                            </div>

                            {/* ARROW */}

                            <ArrowRight
                              size={18}
                              className={`shrink-0 transition-all duration-300 ${
                                isActive
                                  ? "translate-x-1 text-violet-500"
                                  : "text-slate-300 group-hover:translate-x-1 group-hover:text-violet-500"
                              }`}
                            />
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

              {/* REGISTER CARD */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.3,
                }}
                className="mt-7"
              >
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="group relative flex overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 p-[1px] shadow-[0_15px_40px_rgba(124,58,237,0.16)]"
                >
                  <div className="relative flex w-full items-center gap-4 rounded-[15px] bg-gradient-to-r from-violet-500 to-pink-500 px-5 py-4 text-white">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <GraduationCap size={21} />
                    </div>

                    <div className="flex-1">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/70">
                        Start Learning
                      </p>

                      <p className="mt-0.5 text-sm font-extrabold">
                        Register for Training
                      </p>
                    </div>

                    <ArrowRight
                      size={19}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />

                    <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
                  </div>
                </Link>
              </motion.div>

              {/* FOOTER */}

              <div className="mt-auto pt-8 text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300">
                  Learn • Create • Grow • Go Viral
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
