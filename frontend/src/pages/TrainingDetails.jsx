import { motion } from "framer-motion";
import { FaCar, FaTools, FaCrown, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="bg-black text-white py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto mb-28">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300 bg-clip-text text-transparent"
          >
            About Elu Tapisery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-gray-400 text-lg leading-relaxed"
          >
            Elu Tapisery specializes in premium vehicle interior upholstery. We
            transform car interiors with modern designs, high-quality materials,
            and expert craftsmanship that delivers comfort, durability, and
            luxury.
          </motion.p>
        </div>

        {/* STORY */}
        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">
              Our Story
            </h2>

            <p className="text-gray-400 leading-relaxed mb-6">
              Elu Tapisery was founded with a passion for transforming vehicle
              interiors. From simple seat repairs to luxury interior redesigns,
              our work focuses on quality, durability, and beautiful
              craftsmanship.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Over the years we have completed hundreds of upholstery projects,
              helping clients upgrade their vehicles with stylish and
              comfortable interiors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white/[0.04] backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-10"
          >
            <h3 className="text-2xl font-semibold text-yellow-400 mb-6">
              Our Mission
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Our mission is to deliver exceptional upholstery services that
              improve vehicle comfort, appearance, and value. We are committed
              to professional service, attention to detail, and complete
              customer satisfaction.
            </p>
          </motion.div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">
              Why Choose Elu Tapisery
            </h2>

            <p className="text-gray-400 mt-4">
              Professional upholstery services with premium quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <Feature
              icon={<FaCar size={26} />}
              title="Custom Interiors"
              text="Modern seat designs and interior upgrades tailored for your vehicle."
            />

            <Feature
              icon={<FaTools size={26} />}
              title="Expert Craftsmanship"
              text="Experienced professionals delivering high-quality upholstery work."
            />

            <Feature
              icon={<FaCrown size={26} />}
              title="Luxury Materials"
              text="Premium leather and materials for comfort and durability."
            />

            <Feature
              icon={<FaShieldAlt size={26} />}
              title="Trusted Service"
              text="Reliable workmanship trusted by many satisfied clients."
            />
          </div>
        </div>

        {/* STATS */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-yellow-500/20 rounded-3xl px-12 py-14 grid md:grid-cols-3 gap-10 text-center mb-32">
          <Stat number="1000+" label="Projects Completed" />
          <Stat number="100%" label="Client Satisfaction" />
          <Stat number="10+" label="Years Experience" />
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-yellow-400 mb-6">
            Transform Your Car Interior Today
          </h3>

          <Link
            to="/booking"
            className="inline-block px-14 py-5 rounded-full font-semibold text-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg hover:scale-105 transition duration-300"
          >
            Book Our Service
          </Link>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-yellow-500/30 transition"
    >
      <div className="text-yellow-400 mb-5">{icon}</div>

      <h4 className="text-xl font-semibold text-yellow-400 mb-3">{title}</h4>

      <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <h4 className="text-5xl font-bold text-yellow-400">{number}</h4>
      <p className="text-gray-400 mt-3 text-sm">{label}</p>
    </div>
  );
}
