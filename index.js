// import express from 'express';
// import { conn } from './connection.js';
// import cors from 'cors'
// import latestRouter from './latestRoutes/dataRoute.js';
// import route from './userRoutes/userRoutes.js';


// // Initialize Express app
// const app = express();
// app.use(express.json());
// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('TechMomentum Backend is running!');
// });

// app.use(latestRouter)
// app.use(route)
// export default app;



// // index.js
// import express from "express";
// import cors from "cors";

// import { connectDB } from './connection.js';                   
// import latestRouter from "./latestRoutes/dataRoute.js";
// import userRouter from "./userRoutes/userRoutes.js";

// const app = express();

// // ---------- Global middleware ----------
// app.use(express.json());
// app.use(cors());

// // Ensure MongoDB is ready *before* hitting any route.
// // Because connectDB caches the connection, this is cheap after cold‑start.
// app.use(async (req, res, next) => {
//   try {
//     await connectDB();
//     next();
//   } catch (err) {
//     res.status(500).json({ message: "DB connection failed", error: err.message });
//   }
// });

// // ---------- Routes ----------
// app.get("/", (req, res) => {
//   res.send("TechMomentum Backend is running!");
// });

// app.use(latestRouter);
// app.use(userRouter);

// // ---------- Export for Vercel / Serverless ----------
// export default app;

// // ---------- If you also run locally with `node index.js` ----------
// if (process.env.VERCEL !== "1") {
//   const PORT = process.env.PORT || 8000;
//   app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
// }





import express from 'express';
import { conn } from './connection.js';
import latestRouter from './latestRoutes/dataRoute.js';
import route from './userRoutes/userRoutes.js';

const app = express();
app.use(express.json());

// CORS middleware FIRST
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Preflight response
  }
  next();
});

app.get('/', (req, res) => {
  res.send('TechMomentum Backend is running!');
});

// Routers AFTER CORS
app.use(latestRouter);
app.use(route);

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;

