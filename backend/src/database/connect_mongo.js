const mongoose = require("mongoose");

const connectOptions = {
  dbName: (process.env.NODE_ENV = "leaderboard"),
};

async function connectDatabase(uri) {
  if (!uri || uri == "") {
    console.error("MongoDB URI is not provided");
    return;
  }

  try {
    await mongoose.connect(uri, connectOptions);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = { connectDatabase };
