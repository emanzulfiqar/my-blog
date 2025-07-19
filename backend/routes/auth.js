const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const authService = require("../services/authService");

const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.message === "User with this email already exists") {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error during registration",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    res.json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    console.error("Login error:", error);

    if (error.message === "Invalid credentials") {
      return res.status(401).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error during login",
    });
  }
});

router.get("/me", protect, async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);

    res.json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching user data",
    });
  }
});


router.put("/profile", protect, async (req, res) => {
  try {
    const user = await authService.updateUserProfile(req.user.id, req.body);

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.message === "Email is already taken by another user") {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error while updating profile",
    });
  }
});

module.exports = router;
