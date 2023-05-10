const express = require("express");
const {
  addDetailsController,
} = require("../controller/welcomeDetailsController");

const router = express.Router();

//routers:
//POST || WELCOME DETAILS:
router.post("/", addDetailsController);

module.exports = router;
