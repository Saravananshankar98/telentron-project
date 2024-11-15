const express = require("express");
const router = express.Router();
const trainingSessionsController = require("../controllers/trainingSessionController");

router.post(
  "/trainingSessions",
  trainingSessionsController.CreateTrainingSessions
);

module.exports = router;
