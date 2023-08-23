const express = require("express");
const router = express.Router();
const authController = require("../service/auth");

router.post("/signup", authController.postSignup);

module.exports = router