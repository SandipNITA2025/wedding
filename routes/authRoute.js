const express = require("express");
const { loginController, registerController } = require("../controller/authController");



//router object:
const router = express.Router();

//routers:
// 1. POST || LOGIN:
router.post('/login', loginController)


// 2. POST || REGISTER:
router.post('/register', registerController)

module.exports = router;