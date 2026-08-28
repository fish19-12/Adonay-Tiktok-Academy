import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Menu,
  X,
  Home,
  Images,
  Star,
  Info,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import logo from "../../assets/images/logo.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const location = useLocation();

  /*
  |--------------------------------------------------------------------------
  | CLOSE MENU WHEN ROUTE CHANGES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /*
  |--------------------------------------------------------------------------
  | MOBILE BODY SCROLL LOCK
  |
  | IMPORTANT:
  | We preserve the previous body overflow value instead of forcing
  | "auto". This is safer for iOS Safari.
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
    } else {
      document.body.style.overflow = previousOverflow || "";
      document.body.style.overscrollBehavior = "";
    }

    return () => {
      document.body.style.overflow = previousOverflow || "";
      document.body.style.overscrollBehavior = "";
    };
  }, [open]);

  /*
  |--------------------------------------------------------------------------
  | SCROLL EFFECT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let lastScroll = window.scrollY || 0;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY || 0;

        setScrolled(currentScroll > 30);

        if (currentScroll > lastScroll && currentScroll > 140) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }

        lastScroll = currentScroll;
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

  /*
  |--------------------------------------------------------------------------
  | DESKTOP NAVIGATION
  |--------------------------------------------------------------------------
  */

  const navLinkClass = ({ isActive }) =>
    `relative text-[14px] font-medium tracking-wide transition-colors duration-300 ${
      isActive ? "text-white" : "text-white/60 hover:text-white"
    }`;

  /*
  |--------------------------------------------------------------------------
  | MOBILE NAVIGATION
  |--------------------------------------------------------------------------
  */

  const bottomLinkClass = ({ isActive }) =>
    `flex min-w-0 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all duration-300 ${
      isActive ? "scale-105 text-[#25F4EE]" : "text-white/45 hover:text-white"
    }`;

  /*
  |--------------------------------------------------------------------------
  | ACTIVE INDICATOR
  |--------------------------------------------------------------------------
  */

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
        className="absolute -bottom-1 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#25F4EE] to-[#FE2C55]"
      />
    );
  };

  /*
  |--------------------------------------------------------------------------
  | MOBILE MENU ITEMS
  |--------------------------------------------------------------------------
  */

  const mobileItems = [
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
    {
      name: "FAQ",
      path: "/faq",
    },
  ];

  return (
    <>
      {/* ============================================================
          DESKTOP NAVBAR
      ============================================================ */}

      <motion.nav
        initial={false}
        animate={{
          y: showNavbar ? 0 : -130,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="fixed left-0 top-0 z-[100] hidden w-full justify-center px-5 pt-5 md:flex"
        style={{
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
        }}
      >
        <div
          className={`w-full max-w-7xl rounded-2xl border transition-all duration-300 ${
            scrolled
              ? "border-white/[0.08] bg-[#070707]/95 shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
              : "border-white/[0.06] bg-black/80"
          }`}
          style={{
            WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
            backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
          }}
        >
          <div className="flex h-[76px] items-center justify-between px-5 xl:px-7">
            {/* BRAND */}

            <Link to="/" className="group flex min-w-0 items-center gap-3.5">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black shadow-lg">
                <img
                  src={logo}
                  alt="Adonay TikTok Academy"
                  width="48"
                  height="48"
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-[#25F4EE]/10" />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-[14px] font-bold uppercase tracking-[0.12em] text-white">
                  Adonay
                </h1>

                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#25F4EE]">
                    TikTok
                  </span>

                  <span className="text-[9px] text-white/30">/</span>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FE2C55]">
                    Academy
                  </span>
                </div>
              </div>
            </Link>

            {/* CENTER NAVIGATION */}

            <div className="hidden items-center gap-9 lg:flex">
              <NavLink to="/" className={navLinkClass}>
                {({ isActive }) => (
                  <div className="relative py-2">
                    Home
                    <NavIndicator isActive={isActive} />
                  </div>
                )}
              </NavLink>

              <NavLink to="/services" className={navLinkClass}>
                {({ isActive }) => (
                  <div className="relative py-2">
                    Services
                    <NavIndicator isActive={isActive} />
                  </div>
                )}
              </NavLink>

              <NavLink to="/about" className={navLinkClass}>
                {({ isActive }) => (
                  <div className="relative py-2">
                    About
                    <NavIndicator isActive={isActive} />
                  </div>
                )}
              </NavLink>

              <NavLink to="/testimonial" className={navLinkClass}>
                {({ isActive }) => (
                  <div className="relative py-2">
                    Testimonials
                    <NavIndicator isActive={isActive} />
                  </div>
                )}
              </NavLink>
            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-2.5">
              <Link
                to="/register"
                className="group relative hidden h-10 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] px-5 text-[12px] font-bold uppercase tracking-[0.08em] text-black shadow-[0_8px_25px_rgba(37,244,238,0.12)] transition-all duration-300 hover:-translate-y-0.5 lg:flex"
              >
                <span className="relative z-10">Register</span>

                <ArrowRight
                  size={15}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />

                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ============================================================
          MOBILE TOP NAVBAR
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
          className="flex h-[64px] items-center justify-between rounded-2xl border border-white/10 bg-[#050505]/95 px-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
          style={{
            WebkitBackdropFilter: "blur(16px)",
            backdropFilter: "blur(16px)",
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
          }}
        >
          {/* MOBILE BRAND */}

          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black">
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
              <h2 className="text-[12px] font-bold uppercase tracking-[0.1em] text-white">
                Adonay
              </h2>

              <div className="flex items-center gap-1">
                <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#25F4EE]">
                  TikTok
                </span>

                <span className="text-[8px] text-white/30">/</span>

                <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#FE2C55]">
                  Academy
                </span>
              </div>
            </div>
          </Link>

          {/* MENU BUTTON */}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors duration-300 hover:border-[#25F4EE]/30 hover:text-[#25F4EE]"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
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
            className="fixed inset-0 z-[90] bg-[#030303] md:hidden"
            style={{
              WebkitTransform: "translateZ(0)",
              transform: "translateZ(0)",
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            {/* GLOW */}

            <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#25F4EE]/10 blur-[80px]" />

            <div className="pointer-events-none absolute -right-24 bottom-20 h-64 w-64 rounded-full bg-[#FE2C55]/10 blur-[80px]" />

            <div className="relative flex h-full flex-col justify-center overflow-y-auto px-8 py-24">
              {/* BRAND HEADER */}

              <div className="mb-12">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-[2px] w-8 bg-[#25F4EE]" />
                  <div className="h-[2px] w-5 bg-[#FE2C55]" />
                </div>

                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50">
                  Adonay TikTok Academy
                </p>

                <p className="mt-2 text-sm text-white/35">
                  Learn. Create. Grow. Go Viral.
                </p>
              </div>

              {/* NAVIGATION */}

              <div className="space-y-6">
                {mobileItems.map((item, index) => (
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
                        `group flex items-center justify-between border-b border-white/[0.06] pb-4 text-2xl font-semibold tracking-tight transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-white/65 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{item.name}</span>

                          <ArrowRight
                            size={20}
                            className={`text-[#25F4EE] transition-all duration-300 ${
                              isActive
                                ? "translate-x-1 opacity-100"
                                : "opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* REGISTER */}

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="group relative mt-10 flex h-14 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] text-sm font-bold uppercase tracking-[0.1em] text-black shadow-[0_15px_40px_rgba(37,244,238,0.12)]"
              >
                <GraduationCap size={18} />

                <span>Register for Training</span>

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          MOBILE BOTTOM NAVIGATION
      ============================================================ */}

      <div
        className="fixed bottom-4 left-1/2 z-[100] flex w-[92%] max-w-md -translate-x-1/2 items-center justify-around rounded-2xl border border-white/10 bg-[#050505]/95 px-2 py-3 shadow-[0_15px_50px_rgba(0,0,0,0.5)] md:hidden"
        style={{
          WebkitBackdropFilter: "blur(16px)",
          backdropFilter: "blur(16px)",
          WebkitTransform: "translate3d(-50%, 0, 0)",
          transform: "translate3d(-50%, 0, 0)",
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        }}
      >
        {/* HOME */}

        <NavLink to="/" className={bottomLinkClass}>
          <Home size={17} />
          <span>Home</span>
        </NavLink>

        {/* SERVICES */}

        <NavLink to="/services" className={bottomLinkClass}>
          <Images size={17} />
          <span>Services</span>
        </NavLink>

        {/* REGISTER */}

        <Link
          to="/register"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#25F4EE] to-[#FE2C55] text-black shadow-[0_6px_20px_rgba(37,244,238,0.15)]"
          aria-label="Register for training"
        >
          <GraduationCap size={19} />
        </Link>

        {/* TESTIMONIALS */}

        <NavLink to="/testimonial" className={bottomLinkClass}>
          <Star size={17} />
          <span>Reviews</span>
        </NavLink>

        {/* ABOUT */}

        <NavLink to="/about" className={bottomLinkClass}>
          <Info size={17} />
          <span>About</span>
        </NavLink>
      </div>
    </>
  );
}
