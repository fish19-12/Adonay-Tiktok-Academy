const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config();

const createAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required.");
  }

  if (!email || !password || password.length < 12) {
    throw new Error("Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters.");
  }

  await mongoose.connect(process.env.MONGO_URI);

  try {
    if (await Admin.exists({ email })) {
      throw new Error(`An admin account already exists for ${email}; no changes made.`);
    }

    await Admin.create({ email, password });
    console.log(`Admin account created for ${email}.`);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin().catch((error) => {
  console.error("Failed to create admin:", error.message);
  process.exitCode = 1;
});
