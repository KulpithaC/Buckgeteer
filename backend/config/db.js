const mongoose = require("mongoose");

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
