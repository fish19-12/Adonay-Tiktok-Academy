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

const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// CORS
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : "*",
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

app.use("/api/webinars", require("./routes/webinarRoutes"));

/*
 * Registration API
 *
 * POST /api/register
 * GET  /api/register/stats
 * GET  /api/register
 * GET  /api/register/:id
 * PUT  /api/register/:id/status
 * DELETE /api/register/:id
 */
app.use("/api/register", require("./routes/registerRoutes"));

/*
 * Compatibility route for the current frontend.
 *
 * Your current RegisterPage uses:
 *
 * GET /api/registration/stats
 *
 * We keep this endpoint so you don't have to change
 * your frontend immediately.
 */
app.get(
  "/api/registration/stats",
  require("./controllers/registerController").getRegistrationStats,
);

/* ================= ERROR HANDLER ================= */

app.use(require("./middleware/errorMiddleware"));

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
