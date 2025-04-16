import mongoose from "mongoose";
import "dotenv/config";
import { dbUrl } from "./config.js";

const connectToDB = async () => {
  try {
    const connected = await mongoose.connect(dbUrl);
    if (connected) {
      console.log("Connected to DB successfully!");
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectToDB;
