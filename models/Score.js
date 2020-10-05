const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ScoreSchema = new Schema({
  score: {
    type: Number,
    required: false
  }
});

module.exports = Score = mongoose.model("scores", ScoreSchema);
