const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
const helmet = require("helmet");
app.use(helmet());

/* ================= MIDDLEWARE ================= */

// CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// JSON BODY PARSER (for normal requests)
app.use(express.json());

// URL ENCODED (for forms)
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */
// (only needed if you still store local uploads - optional)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("🚀 NAPI PRODUCTION API RUNNING");
});

/* ================= ROUTES ================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/training", require("./routes/trainingRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/register", require("./routes/registerRoutes"));

/* ================= ERROR HANDLER ================= */
app.use(require("./middleware/errorMiddleware"));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
