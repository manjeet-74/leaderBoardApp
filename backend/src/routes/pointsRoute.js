const express = require("express");
const Points = require("../database/schemas/Points");
const User = require("../database/schemas/User");
const pointsRouter = express.Router();

pointsRouter.get("/", async (req, res) => {
  try {
    const points = await Points.find({});
    res.status(200).json(points);
  } catch (error) {
    console.error("Error fetching points:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
pointsRouter.post("/", async (req, res) => {
  const { userId, points } = req.body;

  if (!userId || !points) {
    return res.status(400).json({ message: "User ID and points are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPoints = new Points({ userId, points });
    await newPoints.save();
    res.status(201).json(newPoints);
  } catch (error) {
    console.error("Error adding points:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = pointsRouter;
