const express = require("express");
const router = express.Router();
const employerController = require("../controllers/employerController");

router.get("/", employerController.listEmployerData);
router.post("/", employerController.createEmployerData);

module.exports = router;
