const express = require("express");
const Points = require("../database/schemas/Points");
const User = require("../database/schemas/User");
const leaderboardRouter = express.Router();

leaderboardRouter.get("/", async (req, res) => {
  try {
    const points = await Points.aggregate([
      {
        $group: {
          _id: "$userId",
          totalPoints: { $sum: "$points" },
        },
      },
      {
        $lookup: {
          from: "users", // Assuming the User collection is named 'users'
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          totalPoints: 1,
          username: "$userDetails.username", // Adjust based on your User schema
        },
      },
      { $sort: { totalPoints: -1 } }, // Sort by total points in descending order
    ]);

    res.status(200).json(points);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = leaderboardRouter;
