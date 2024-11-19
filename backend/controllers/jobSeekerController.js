const jobSeekerModel = require("../models/jobSeekerModel");

const { authorize, uploadFile } = require("../googleDriveUtils");
const listJobSeekers = (req, res) => {
  jobSeekerModel.getAllJobSeekers((err, jobSeekers) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching job seekers" });
    }
    res.status(200).json(jobSeekers);
  });
};

const createJobSeeker = async (req, res) => {
  const jobSeekerData = req.body;
  const fileBuffer = req.file.buffer;
  const fileName = `${req.body.email.split("@")[0]}_${Date.now()}.pdf`;
  const authClient = await authorize();

  const driveFile = await uploadFile(authClient, fileBuffer, fileName);

  jobSeekerModel.createJobSeeker(
    jobSeekerData,
    driveFile.url,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        success: true,
        id: result.id,
        message: "File uploaded successfully",
        driveFile: driveFile,
      });
    }
  );
};

module.exports = { listJobSeekers, createJobSeeker };
