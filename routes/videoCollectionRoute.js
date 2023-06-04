const express = require("express");
const {
  AddVideoCollectionController,
  AddMorevideosController,
  GetVideoCollectionController,
  GetVideoCollectionIdController,
} = require("../controller/videoCollectionController");

const router = express.Router();

//routers:
//POST || COLLECTION DETAILS:
router.post("/add-video-collection", AddVideoCollectionController);

// POST || ADD PHOTO
router.post("/add-video-more", AddMorevideosController);

//GET || COLLECTION DETAILS:
router.get("/get-video-collection", GetVideoCollectionController);

//GET || COLLECTION DETAILS:
router.get("/get-video-collection/:id", GetVideoCollectionIdController);

module.exports = router;
