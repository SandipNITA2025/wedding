const express = require("express");
const {
  AddCollectionController,
  GetCollectionController,
} = require("../controller/collectionController");

const router = express.Router();

//routers:
//POST || COLLECTION DETAILS:
router.post("/add-collection", AddCollectionController);

//GET || COLLECTION DETAILS:
router.get("/get-collection", GetCollectionController);

module.exports = router;
