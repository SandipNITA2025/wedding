const express = require("express");
const collectionModel = require("../models/collectionModel");
const videoCollectionModel = require("../models/videoCollectionModel");
const Poll = require("../models/pollsModel");
const GiftRegistry = require("../models/giftModel");
const addUser = require("../models/addUserModel");
const MusicPlaylist = require("../models/musicListModel");

const router = express.Router();

router.get("/statistics", async (req, res) => {
  try {
    const { authId } = req.query;

    const photoCountPromise = collectionModel.aggregate([
      { $match: { authId } },
      { $group: { _id: null, total: { $sum: { $size: "$photos" } } } },
    ]);

    const videoCountPromise = videoCollectionModel.aggregate([
      { $match: { authId } },
      { $group: { _id: null, total: { $sum: { $size: "$videos" } } } },
    ]);

    const pollCountPromise = Poll.countDocuments({ authId });

    const giftCountPromise = GiftRegistry.countDocuments({ authId });

    const userCountPromise = addUser.countDocuments({});

    const musicPlaylistCountPromise = MusicPlaylist.countDocuments({ authId });

    const [photoCount, videoCount, pollCount, giftCount, userCount, musicPlaylistCount] = await Promise.all([
      photoCountPromise,
      videoCountPromise,
      pollCountPromise,
      giftCountPromise,
      userCountPromise,
      musicPlaylistCountPromise,
    ]);

    const result = {
      photoCount: photoCount.length > 0 ? photoCount[0].total : 0,
      videoCount: videoCount.length > 0 ? videoCount[0].total : 0,
      pollCount,
      giftCount,
      userCount,
      musicPlaylistCount,
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
