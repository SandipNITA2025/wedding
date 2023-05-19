const express = require("express");
const {
  AddCollectionController,
  GetCollectionController,
  AddMorePhotosController,
} = require("../controller/collectionController");

const router = express.Router();

//routers:
//POST || COLLECTION DETAILS:
router.post("/add-collection", AddCollectionController);

// POST || ADD PHOTO
router.post("/add-morephoto", AddMorePhotosController);

//GET || COLLECTION DETAILS:
router.get("/get-collection", GetCollectionController);

module.exports = router;
