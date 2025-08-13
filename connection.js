

// import mongoose from "mongoose";

// let isConnected = 0;

// export async function connectDB() {
//   if (isConnected === 1) return;

//   try {
//     const db = await mongoose.connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//     });

//     isConnected = db.connections[0].readyState;
//     console.log("✅ MongoDB connected");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err.message);
//     throw err;
//   }
// }



import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const conn =  mongoose.connect(process.env.MONGODB_URL).then((res)=>{
    console.log("DB Connected Successfully..!!")
}) 

