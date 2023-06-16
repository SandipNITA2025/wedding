const jwt = require("jsonwebtoken");
const { comparePass, hashPassword } = require("../helper/authHelper");
const authModel = require("../models/authModel");
const crypto = require("crypto");
const secretKey = "AZMOIHTF&^16^%&@^*&56UTGUGFWY!DUYWUD&^%!";

// 1. POST || LOGIN:
const loginController = async (req, res) => {
  try {
    const { authEmail, authPassword } = req.body;
    const user = await authModel.findOne({ authEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const match = await comparePass(authPassword, user.authPassword);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Password not matched",
      });
    }

    // Generate JWT token
    const token = await jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    // Response with token
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
    });
  }
};

// 2. POST || REGISTER:
const registerController = async (req, res) => {
  try {
    const { authName, authEmail, authPassword } = req.body;
    const existingUser = await authModel.findOne({ authEmail });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered",
      });
    }

    const hashedPassword = await hashPassword(authPassword);
    const newUser = await new authModel({
      authName,
      authEmail,
      authPassword: hashedPassword,
    }).save();

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
    });
  }
};

const testController = async (req, res) => {
  res.send("Protected test route");
};

module.exports = { loginController, registerController, testController };
