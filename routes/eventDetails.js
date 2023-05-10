const express = require("express");
const  {eventDetailsController}  = require("../controller/eventDetailsController");

const router = express.Router();

//routers:
//POST || EVENT DETAILS:
router.post("/", eventDetailsController);




module.exports = router;