const { comparePass, hashPassword } = require("../helper/authHelper");
// import authentication from "../models/authentication.js";
const authModel = require("../models/authModel");

//callback funtions:
// 1. POST || LOGIN:
const loginController = async (req, res) => {
  try {
    const { authEmail, authPassword } = req.body;
    const user = await authModel.findOne({ authEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }
    //de-crypt:
    const match = await comparePass(authPassword, user.authPassword);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "password not matched",
      });
    }

    // Generate JWT token
    const token = await jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    // Response with token and login details
    res.status(200).json({
      success: true,
      token,
      user: {
        authName: user.authName,
        authEmail: user.authEmail,
        authId: user._id,
        // Include any other desired login details
      },
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
    //check user:
    const existingUser = await authModel.findOne({ authEmail });

    //existing user:
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "already registered",
      });
    }

    const hashedPassword = await hashPassword(authPassword);
    const newUser = await new authModel({
        authName, authEmail,
        authPassword: hashedPassword,
    }).save();

    //response status:
    res.status(201).json({
      success: true,
      message: "Register successfully",
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

// 3. GET || USER DETAILS BY EMAIL:
const getUserDetailsByEmail = async (req, res) => {
  try {
    const authEmail = req.params.authEmail; // Assuming you pass the user's email as a URL parameter
    const user = await authModel.findOne({ authEmail });
    
    if (!user) {
      return res.status(404).send("User not found");
    }
    
    res.status(200).json({
      success: true,
      user: {
        userId: user._id,
        authName: user.authName,
        authEmail: user.authEmail,
        // Include any other desired user details
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
    });
  }
};

const protectedController = async (req, res) => {
  res.send("Protected test route");
};

module.exports = { loginController, registerController, protectedController, getUserDetailsByEmail };
