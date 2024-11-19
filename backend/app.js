const fs = require("fs");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const stateRoutes = require("./routes/stateRoutes");
const userRoutes = require("./routes/userRoutes");
const trainingSessionsRoutes = require("./routes/trainingSessionRoutes");
const districtRoutes = require("./routes/districtRouter");
const jobSeekerRoutes = require("./routes/jobSeekerRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const employerRoutes = require("./routes/employerRoutes");

const app = express();

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/", userRoutes);
app.use("/state", stateRoutes);
app.use("/trainingSessions", trainingSessionsRoutes);
app.use("/district", districtRoutes);
app.use("/job-seekers", jobSeekerRoutes);
app.use("/trainers", trainerRoutes);
app.use("/employers", employerRoutes);

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 404 Error handling
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
