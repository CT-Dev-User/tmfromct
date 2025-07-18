// import mongoose from "mongoose";

// let isConnected = false; // Track connection status

// export const conn = async () => {
//   if (isConnected) return;

//   try {
//     const db = await mongoose.connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // optional: quicker fail
//     });

//     isConnected = db.connections[0].readyState;
//     console.log("✅ MongoDB connected");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     throw error;
//   }
// };
// conn.js
import mongoose from "mongoose";

/**
 * Cached connection state for Lambda / Serverless cold‑starts.
 * 0 = disconnected | 1 = connected | 2 = connecting | 3 = disconnecting
 */
let isConnected = 0;

/**
 * Connect to MongoDB once per runtime.
 * Re‑uses the existing connection on subsequent invocations.
 */
export async function connectDB() {
  if (isConnected === 1) return; // Already connected.

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Fail fast if Atlas is unreachable.
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err; // Bubble up so the request gets a 500 with the real reason.
  }
}
