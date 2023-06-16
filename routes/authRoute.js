const express = require("express");
const {
  loginController,
  registerController,
  testController,
} = require("../controller/authController");
const authenticateToken = require("../middlewares/authenticateToken ");

const router = express.Router();

// Public routes
router.post("/login", loginController);
router.post("/register", registerController);

// Protected routes
router.get(
  "/protected",
  authenticateToken,
  (req, res) => {
    res.json({ message: "Protected route accessed successfully" });
  },
  testController
);

module.exports = router;
