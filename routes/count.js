// router object:
const express = require("express");
const collectionModel = require("../models/collectionModel");
const videoCollectionModel = require("../models/videoCollectionModel");
const Poll = require("../models/pollsModel");

const router = express.Router();

// GET: Retrieve total number of photos videos, polls by authId
router.get("/statistics", async (req, res) => {
  try {
    const { authId } = req.query;

    const photoCount = await collectionModel.aggregate([
      { $match: { authId } },
      { $group: { _id: null, total: { $sum: { $size: "$photos" } } } },
    ]);

    const videoCount = await videoCollectionModel.aggregate([
      { $match: { authId } },
      { $group: { _id: null, total: { $sum: { $size: "$videos" } } } },
    ]);

    const pollCount = await Poll.countDocuments({ authId });

    const result = {
      photoCount: photoCount.length > 0 ? photoCount[0].total : 0,
      videoCount: videoCount.length > 0 ? videoCount[0].total : 0,
      pollCount,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving statistics",
      error,
    });
  }
});


module.exports = router;
