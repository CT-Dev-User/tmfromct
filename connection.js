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

import mongoose from "mongoose";

let isConnected = 0;

export async function connectDB() {
  if (isConnected === 1) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
}
