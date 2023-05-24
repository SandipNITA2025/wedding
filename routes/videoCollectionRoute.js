const express = require("express");
const {
  AddVideoCollectionController,
  AddMorevideosController,
  GetVideoCollectionController,
} = require("../controller/videoCollectionController");

const router = express.Router();

//routers:
//POST || COLLECTION DETAILS:
router.post("/add-video-collection", AddVideoCollectionController);

// POST || ADD PHOTO
router.post("/add-video-more", AddMorevideosController);

//GET || COLLECTION DETAILS:
router.get("/get-video-collection", GetVideoCollectionController);

module.exports = router;
