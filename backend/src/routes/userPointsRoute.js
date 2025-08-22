const express = require("express");
const Points = require("../database/schemas/Points");
const User = require("../database/schemas/User");
const userPointsRouter = express.Router();

userPointsRouter.get("/:id/points", async (req, res) => {
  try {
    const userId = req.params.id;
    const points = await Points.find({ userId });

    if (!points.length) {
      return res.status(404).json({ message: "No points found for this user" });
    }

    res.status(200).json(points);
  } catch (error) {
    console.error("Error fetching user points:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
userPointsRouter.post("/:id/points", async (req, res) => {
  try {
    const userId = req.params.id;
    const { points } = req.body;
    if (
      typeof points !== "number" ||
      !Number.isInteger(points) ||
      points < 1 ||
      points > 10
    ) {
      return res
        .status(400)
        .json({ message: "points must be an integer between 1 and 10" });
    }
    const newPoints = new Points({
      userId,
      points,
      date: new Date(),
    });
    await newPoints.save();
    res.status(201).json(newPoints);
  } catch (error) {
    console.error("Error adding points:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = userPointsRouter;
