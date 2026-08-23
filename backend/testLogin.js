const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const testLogin = async () => {
  const email = "elu@12.com";
  const password = "112233";

  const admin = await Admin.findOne({ email });
  if (!admin) return console.log("Admin not found");

  const match = await bcrypt.compare(password, admin.password);
  console.log("Password match?", match);

  process.exit(0);
};

testLogin();
