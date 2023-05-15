const express = require("express");
// const addUserModel = require("../models/addUserModel");
const { addUserController , getAllUserController, getSingleUserController} = require("../controller/addUserController");

const router = express.Router();

//POST || ADD USER:
router.post("/", addUserController);

//GET || ALL USER DETAILS:
router.get("/", getAllUserController);

//GET || SINGLE USER DETAILS:
router.get("/:loginId", getSingleUserController);


module.exports = router;
