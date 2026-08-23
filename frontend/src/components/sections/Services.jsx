import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Video,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X,
  Camera,
  ShieldCheck,
  Star,
} from "lucide-react";

import { FaInstagram } from "react-icons/fa";

/* ================= CATEGORIES ================= */

const CATEGORIES = [
  {
    key: "social",
    label: "Social Media Management",
    icon: <FaInstagram />,
  },

  {
    key: "event",
    label: "Event Production",
    icon: <Video />,
  },
];

/* ================= SERVICES ================= */

const SERVICES = {
  social: [
    {
      title: "1st Class Package",
      price: "10,000 ETB / Month",
      items: [
        "Social Media Post Creation",
        "Creative Caption Writing",
        "Post Scheduling",
        "Basic Content Support",
      ],
    },

    {
      title: "Basic Package",
      price: "80,000 ETB / Month",
      items: [
        "8 Social Media Posts Per Month",
        "Content Caption Writing",
        "Basic Graphic Design",
        "Post Scheduling",
        "Hashtag Research",
        "Monthly Content Planning",
      ],
    },

    {
      title: "Standard Package",
      price: "120,000 ETB / Month",
      highlight: true,
      items: [
        "12 Social Media Posts Per Month",
        "Custom Graphic Design",
        "Professional Caption Copywriting",
        "Post Scheduling & Publishing",
        "Hashtag Strategy",
        "Growth Monitoring",
      ],
    },

    {
      title: "Premium Package",
      price: "150,000 ETB / Month",
      items: [
        "16+ Social Media Posts Per Month",
        "High Quality Graphics",
        "Professional Copywriting",
        "Content Calendar Planning",
        "Complete Social Media Management",
        "Brand Growth Strategy",
      ],
    },
  ],

  /* ================= UPDATED EVENT SERVICE ================= */

  event: [
    {
      title: "Professional Event Production",
      price: "250,000 ETB",

      highlight: true,

      items: [
        "4 Professional Cinematic Videographers",

        "1 Professional Event Photographer",

        "Multi-Camera Event Coverage",

        "Drone Coverage & Aerial Cinematic Shots",

        "Professional Audio Recording",

        "Live Streaming For Online Audience",

        "Same Day Highlight Content",

        "Professional Video Editing & Color Grading",

        "Premium Event Film Production",

        "Fast Delivery Of Final Memories",
      ],
    },
  ],
};

/* ================= MAIN ================= */

export default function ServicesPage() {
  const [active, setActive] = useState("social");

  const [open, setOpen] = useState(false);

  const current = CATEGORIES.find((category) => category.key === active);

  return (
    <section
      className="
      relative overflow-hidden
      bg-[#03050A]
      px-4 sm:px-6
      py-20
      text-white
      "
    >
      {/* ================= BACKGROUND ================= */}

      <div
        className="
      absolute inset-0
      bg-gradient-to-b
      from-[#101827]
      via-[#05060A]
      to-black
      "
      />

      <div
        className="
      absolute inset-0
      bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.20),transparent_45%)]
      "
      />

      <div
        className="
      absolute inset-0
      bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.15),transparent_40%)]
      "
      />

      <div
        className="
      relative z-10
      max-w-7xl
      mx-auto
      "
      >
        {/* ================= HERO ================= */}
        <div
          className="
        text-center
        max-w-3xl
        mx-auto
        "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
            inline-flex
            items-center
            gap-2
            px-5
            py-2
            rounded-full
            border
            border-cyan-300/20
            bg-white/5
            backdrop-blur-xl
            shadow-lg
            "
          >
            <Sparkles size={15} className="text-cyan-300" />

            <span
              className="
            text-xs
            uppercase
            tracking-[0.3em]
            text-white/70
            "
            >
              NAPI Production
            </span>
          </motion.div>

          <h1
            className="
          mt-7
          text-4xl
          sm:text-6xl
          font-black
          leading-tight
          "
          >
            Premium Creative
            <span
              className="
            block
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-cyan-300
            via-blue-400
            to-purple-500
            "
            >
              Production Services
            </span>
          </h1>

          <p
            className="
          mt-5
          text-sm
          sm:text-lg
          text-white/60
          leading-relaxed
          "
          >
            Professional social media management and cinematic event production
            designed to help brands grow and preserve unforgettable moments.
          </p>
        </div>
        {/* ================= AGREEMENT NOTICE ================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
        mt-12
        rounded-3xl
        border
        border-cyan-400/20
        bg-gradient-to-r
        from-cyan-400/10
        via-blue-500/10
        to-purple-500/10
        backdrop-blur-xl
        p-5
        sm:p-6
        flex
        flex-col
        sm:flex-row
        gap-4
        items-start
        "
        >
          <div
            className="
          p-3
          rounded-2xl
          bg-cyan-400/20
          text-cyan-300
          "
          >
            <ShieldCheck size={28} />
          </div>

          <div>
            <h3
              className="
            font-bold
            text-lg
            "
            >
              Professional Service Agreement
            </h3>

            <p
              className="
            mt-1
            text-white/70
            text-sm
            leading-relaxed
            "
            >
              After your order is successfully confirmed, NAPI Production
              provides an official agreement form between the client and our
              team. This ensures clear communication, professional workflow,
              service expectations, and quality delivery.
            </p>
          </div>
        </motion.div>{" "}
        {/* ================= DESKTOP CATEGORY ================= */}
        <div className="hidden sm:flex mt-12 justify-center">
          <div
            className="
          flex
          gap-2
          p-2
          rounded-3xl
          bg-white/5
          border
          border-white/10
          backdrop-blur-xl
          shadow-2xl
          "
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-2xl
              text-sm
              transition-all
              duration-300

              ${
                active === cat.key
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold shadow-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }

              `}
              >
                {cat.icon}

                {cat.label}
              </button>
            ))}
          </div>
        </div>
        {/* ================= MOBILE CATEGORY ================= */}
        <div className="sm:hidden mt-10">
          <button
            onClick={() => setOpen(true)}
            className="
          w-full
          flex
          items-center
          justify-between
          px-5
          py-4
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          "
          >
            <span
              className="
            flex
            items-center
            gap-3
            font-semibold
            "
            >
              {current.icon}

              {current.label}
            </span>

            <span
              className="
            text-xs
            text-cyan-300
            "
            >
              Change
            </span>
          </button>

          <div
            className="
          mt-4
          flex
          gap-2
          overflow-x-auto
          pb-2
          "
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`
              whitespace-nowrap
              px-4
              py-2
              rounded-full
              text-xs
              border
              transition

              ${
                active === cat.key
                  ? "bg-cyan-400 text-black border-cyan-400"
                  : "bg-white/5 border-white/10 text-white/70"
              }

              `}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        {/* ================= MOBILE SELECT MODAL ================= */}
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
              className="
          fixed
          inset-0
          z-50
          bg-black/80
          backdrop-blur-sm
          flex
          items-end
          sm:hidden
          "
            >
              <motion.div
                initial={{
                  y: 150,
                }}
                animate={{
                  y: 0,
                }}
                exit={{
                  y: 150,
                }}
                className="
            w-full
            bg-[#0B0F18]
            rounded-t-[35px]
            p-6
            border-t
            border-white/10
            "
              >
                <div
                  className="
              flex
              justify-between
              items-center
              mb-6
              "
                >
                  <h2
                    className="
                font-bold
                text-xl
                "
                  >
                    Select Service
                  </h2>

                  <button
                    onClick={() => setOpen(false)}
                    className="
                p-2
                rounded-xl
                bg-white/5
                "
                  >
                    <X />
                  </button>
                </div>

                <div
                  className="
              grid
              grid-cols-2
              gap-4
              "
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => {
                        setActive(cat.key);

                        setOpen(false);
                      }}
                      className={`

                    p-5
                    rounded-3xl
                    border
                    transition

                    ${
                      active === cat.key
                        ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-black border-transparent"
                        : "bg-white/5 border-white/10 text-white/70"
                    }

                    `}
                    >
                      <div
                        className="
                      text-2xl
                      "
                      >
                        {cat.icon}
                      </div>

                      <div
                        className="
                      text-xs
                      mt-3
                      "
                      >
                        {cat.label}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* ================= SERVICE PACKAGES ================= */}
        <motion.div
          key={active}
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
        mt-12
        grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        "
        >
          {SERVICES[active].map((pkg, index) => (
            <Package key={index} {...pkg} category={active} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================= PACKAGE CARD ================= */

function Package({ title, price, items, highlight, category }) {
  return (
    <div
      className={`

relative

rounded-[28px]

border

p-6

backdrop-blur-xl

transition-all

duration-300

hover:-translate-y-2

hover:shadow-2xl


${
  highlight
    ? "border-cyan-400/40 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-500/10"
    : "border-white/10 bg-white/5"
}


`}
    >
      {highlight && (
        <div
          className="
absolute
top-4
right-4
flex
items-center
gap-1
px-3
py-1
rounded-full
bg-cyan-400
text-black
text-xs
font-bold
"
        >
          <Star size={13} />
          Popular
        </div>
      )}

      <h3
        className="
text-xl
font-black
"
      >
        {title}
      </h3>

      <p
        className="
mt-2
text-cyan-300
font-bold
text-lg
"
      >
        {price}
      </p>

      <div
        className="
mt-6
space-y-3
"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="
flex
gap-3
items-start
text-sm
text-white/70
"
          >
            <CheckCircle2
              size={17}
              className="
text-cyan-300
mt-0.5
flex-shrink-0
"
            />

            <span>{item}</span>
          </div>
        ))}
      </div>

      <Link
        to="/booking"
        state={{
          service: {
            category,

            title,

            price,

            items,
          },
        }}
        className="

mt-7

w-full

inline-flex

justify-center

items-center

gap-2

py-3

rounded-2xl

font-bold

bg-white

text-black

transition-all

hover:bg-cyan-400

hover:scale-[1.02]

"
      >
        Order Now
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}
