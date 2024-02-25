const express = require("express");
const userController = require("../controllers/user.controller"); // Adjust the path based on your actual file structure
const router = express.Router();

router.post("/sign_up", userController.sign_up); // Assuming the function is named sign_up

router.post("/login", userController.login);

module.exports = router;
