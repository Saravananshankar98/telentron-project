const express = require("express");
const router = express.Router();
const multer = require("multer");
const jobSeekerController = require("../controllers/jobSeekerController");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", jobSeekerController.listJobSeekers);
router.post("/", upload.single("resume"), jobSeekerController.createJobSeeker);

module.exports = router;
