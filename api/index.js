const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Team = require("../model/schema");

dotenv.config();
const app = express();

const db = process.env.PSWD;
app.use(cors());

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api", async (req, res) => {
  try {
    const { teamname } = req.body;
    const newTeam = new Team({ teamname });
    await newTeam.save();
    res
      .status(201)
      .json({ message: "Team saved successfully!", team: newTeam });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", async (req, res) => {
  res.send("Hello World!");
  return;
});
3;
module.exports = app;
