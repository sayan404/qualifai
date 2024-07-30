import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Check if there is already a global cached connection
let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connect = async () => {
  // Log the cached connection
  console.log("cached.conn", cached.conn);

  // If there is already a cached connection, return it
  if (cached.conn) return cached.conn;
  
  // Log the MongoDB URL being used
  console.log("MONGODB_URL", MONGODB_URL);

  // If there is no cached promise, create a new one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "User",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });
  }

  // Log the cached promise
  console.log("cached.promise", cached.promise);

  // Await the promise and cache the connection
  cached.conn = await cached.promise;

  // Log the cached connection after it has been established
  console.log("cached.conn", cached.conn);

  // Return the cached connection
  return cached.conn;
};
