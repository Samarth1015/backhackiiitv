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
  .connect(db)
  .then(() => console.log("Connection successful"))
  .catch((err) => console.error("Database connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api", async (req, res) => {
  try {
    console.log("Request received");

    const { teamname } = req.body;
    console.log(teamname);

    const newTeam = new Team({ teamname });
    await newTeam.save();

    res.status(201).json({ message: "Team saved successfully", team: newTeam });
  } catch (error) {
    console.error("Error saving team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => console.log("gg server is running on port 3000"));
