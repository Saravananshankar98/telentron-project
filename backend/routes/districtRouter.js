const express = require("express");
const router = express.Router();
const districtsController = require("../controllers/districtController");

router.post("/create", districtsController.createDistrict);
router.get("/list", districtsController.listDistricts);
router.get("/:state_code", districtsController.getDistrictsByState);

module.exports = router;
