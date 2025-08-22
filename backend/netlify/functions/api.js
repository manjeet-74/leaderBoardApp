const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("../../src/database/connect_mongo");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const userRouter = require("../../src/routes/userRoute");
const claimsHistory = require("../../src/routes/pointsRoute");
const userPointsRouter = require("../../src/routes/userPointsRoute");
const leaderboardsRouter = require("../../src/routes/leaderboard");

// Keep paths distinct and deterministic
app.get("/", (req, res) =>
  res.status(200).json({ message: "Leaderboard API (Netlify Functions)" })
);
app.use("/api/user", userRouter); // CRUD users
app.use("/api/user", userPointsRouter); // /:id/points handlers
app.use("/api/claims/history", claimsHistory);
app.use("/api/points/leaderboard", leaderboardsRouter);

// Connect to MongoDB once per warm container
let isConnected = false;
let connectPromise = null;

async function connectDB() {
  if (isConnected) return;
  if (!connectPromise) {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set in environment variables");
    }
    connectPromise = connectDatabase(process.env.MONGO_URI).then(() => {
      isConnected = true;
    });
  }
  await connectPromise;
}

// Netlify Function handler
module.exports.handler = async (event, context) => {
  await connectDB();
  const handler = serverless(app);
  return handler(event, context);
};
