const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./database/connect_mongo");
require("dotenv-flow").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (!process.env.MONGO_URI) {
  console.error("MongoDB URI is not set in environment variables");
  process.exit(1);
}

connectDatabase(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Leaderboard API" });
});

const userRouter = require("./routes/userRoute");
const claimsHistory = require("./routes/pointsRoute");
const userPointsRouter = require("./routes/userPointsRoute");
const leaderboardsRouter = require("./routes/leaderboard");

console.log("Before registering userRouter");
app.use("/api/user", userPointsRouter);
app.use("/api/user", userRouter);
console.log("Registered Routes:");
app.use("/api/claims/history", claimsHistory);
app.use("/api/points/leaderboard", leaderboardsRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});
