const express = require("express");
const router = express.Router();
const stateController = require("../controllers/stateController");

router.post("/create", stateController.createState);
router.get("/list", stateController.getStates);
router.get("/state/:state_code", stateController.getByStateCode);

module.exports = router;
