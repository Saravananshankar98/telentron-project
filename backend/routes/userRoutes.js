const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.listUsers);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUsers);

module.exports = router;
