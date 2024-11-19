const express = require("express");
const router = express.Router();
const stateController = require("../controllers/stateController");

router.post("/", stateController.createState);
router.get("/", stateController.getStates);
router.get("/:state_code", stateController.getByStateCode);

module.exports = router;
