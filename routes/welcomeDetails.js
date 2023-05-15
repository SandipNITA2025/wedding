const express = require("express");
const {
  addDetailsController,getDetailsController
} = require("../controller/welcomeDetailsController");

const router = express.Router();

//routers:
//POST || WELCOME DETAILS:
router.post("/", addDetailsController);

//GET || WELCOME DETAILS:
router.get("/", getDetailsController);

module.exports = router;
