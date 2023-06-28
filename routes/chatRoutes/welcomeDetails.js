const express = require("express");
const {
  addDetailsController,
  getDetailsController,
} = require("../../controller/welcomeDetailsController");

const router = express.Router();

//routers:
//POST || WELCOME DETAILS:
router.post("/welcomemessages", addDetailsController);

//GET || WELCOME DETAILS:
router.get("/welcomemessages", getDetailsController);

module.exports = router;
