const jobSeekerModel = require("../models/jobSeekerModel");
const path = require("path");
const fs = require("fs");

const listJobSeekers = (req, res) => {
  jobSeekerModel.getAllJobSeekers((err, jobSeekers) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching job seekers" });
    }
    res.status(200).json(jobSeekers);
  });
};

const createJobSeeker = (req, res) => {
  const jobSeekerData = req.body;
  const file = req.file; // Uploaded file from multer

  if (!file) {
    return res.status(400).json({ error: "Resume file is required." });
  }

  jobSeekerModel.createJobSeeker(jobSeekerData, file, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, id: result.id });
  });
};

module.exports = { listJobSeekers, createJobSeeker };
