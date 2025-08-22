const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("../../src/database/connect_mongo");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB once
let isConnected = false;
const connectDB = async () => {
  if (!isConnected && process.env.MONGO_URI) {
    await connectDatabase(process.env.MONGO_URI);
    isConnected = true;
  }
};

// Routes
const userRouter = require("../../src/routes/userRoute");
const claimsHistory = require("../../src/routes/pointsRoute");
const userPointsRouter = require("../../src/routes/userPointsRoute");
const leaderboardsRouter = require("../../src/routes/leaderboard");

app.use("/api/user", userPointsRouter);
app.use("/api/user", userRouter);
app.use("/api/claims/history", claimsHistory);
app.use("/api/points/leaderboard", leaderboardsRouter);

// Serverless handler
module.exports.handler = async (event, context) => {
  await connectDB();
  const handler = serverless(app);
  return handler(event, context);
};
