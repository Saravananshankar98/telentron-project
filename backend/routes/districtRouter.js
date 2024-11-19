const express = require("express");
const router = express.Router();
const districtsController = require("../controllers/districtController");

router.post("/", districtsController.createDistrict);
router.get("/", districtsController.listDistricts);
router.get("/:state_code", districtsController.getDistrictsByState);

module.exports = router;
