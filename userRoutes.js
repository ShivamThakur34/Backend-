// routes/userRoutes.js

const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
router.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
router.post("/login", loginUser);

module.exports = router;
