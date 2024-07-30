import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connect = async () => {
  console.log("cached.conn", cached.conn);

  if (cached.conn) return cached.conn;
  console.log("MONGODB_URL", MONGODB_URL);

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "User",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });
  console.log("cached.promise", cached.promise);

  cached.conn = await cached.promise;
  console.log("cached.conn", cached.conn);

  return cached.conn;
};
