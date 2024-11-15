const express = require("express");
const router = express.Router();
const jobSeekerController = require("../controllers/jobSeekerController");

router.get("/", jobSeekerController.listJobSeekers);
router.post("/", jobSeekerController.createJobSeeker);

module.exports = router;
