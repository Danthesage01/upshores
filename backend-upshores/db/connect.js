import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = () => {
  // CURRENT DB URI
  const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SUFFIX}`;

  try {
    mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 45000,
    });
    mongoose.set("strictQuery", true);

    console.log("DB connected successfully");
  } catch (error) {
    console.log(`Error while connecting`, error.message);
  }
};

export default connectDB;
