const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamname: { type: String, required: true },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
