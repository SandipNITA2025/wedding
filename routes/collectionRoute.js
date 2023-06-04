const express = require("express");
const {
  AddCollectionController,
  GetCollectionController,
  AddMorePhotosController,
  GetCollectionIdController
} = require("../controller/collectionController");

const router = express.Router();

//routers:
//POST || COLLECTION DETAILS:
router.post("/add-collection", AddCollectionController);

// POST || ADD PHOTO
router.post("/add-morephoto", AddMorePhotosController);

//GET || COLLECTION DETAILS:
router.get("/get-collection", GetCollectionController);
//GET || COLLECTION DETAILS:
router.get("/get-collection/:id", GetCollectionIdController);

module.exports = router;
