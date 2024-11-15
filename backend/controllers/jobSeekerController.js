const jobSeekerModel = require("../models/jobSeekerModel");

const listJobSeekers = (req, res) => {
  jobSeekerModel.getAllJobSeekers((err, jobSeekers) => {
    if (err) {
      res.status(500).json({ message: "Error fetching job seekers" });
    } else {
      res.status(200).json(jobSeekers);
    }
  });
};

const createJobSeeker = (req, res) => {
  const jobSeekerData = req.body;
  jobSeekerModel.createJobSeeker(jobSeekerData, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error creating job seeker" });
    } else {
      res.status(201).json(result);
    }
  });
};

module.exports = { listJobSeekers, createJobSeeker };
