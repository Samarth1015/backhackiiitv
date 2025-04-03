const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Team = require("./model/schema");
const cors = require("cors");

dotenv.config();
const app = express();

const db = process.env.PSWD;
app.use(cors());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

module.exports = app;
