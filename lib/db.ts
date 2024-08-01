import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

export const connect = async () => {
  try {
    // console.log("MONGODB_URL", MONGODB_URL);
    const conn = await mongoose.connect(MONGODB_URL, {
      dbName: "User",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });
    console.log("Connected to MongoDB:", conn.connection.host);
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Could not connect to MongoDB");
  }
};
