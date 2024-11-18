const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/trainerController");

router.get("/", trainerController.listTrainerData);
router.post("/", trainerController.createTrainer);

module.exports = router;
