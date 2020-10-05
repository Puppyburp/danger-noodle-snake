const express = require("express");
const router = express.Router();

// Load Score model
const Score = require("../../models/Score");

// Get scores from database
router.route('/').get((req, res) => {
  Score.find()
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get score and create new instance of score
router.route('/:id').post((req, res) => {
  const score = Number(req.body.score);

  const newScore = new Score({
    score,
  });

  newScore.save()
  .then(() => res.json('Score added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
