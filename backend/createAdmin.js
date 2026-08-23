const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config();

// Connect to MongoDB (Mongoose 7+)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const createAdmin = async () => {
  const email = "napi@gmail.com";
  const password = "112233";

  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      console.log(`⚠️ Admin already exists: ${email}, deleting...`);
      await Admin.deleteOne({ email });
    }

    admin = await Admin.create({ email, password });
    console.log("✅ Admin created successfully");
    console.log(admin);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
