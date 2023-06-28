const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Import your models
const WelcomeDetails = require("../../models/chatConvoModel/welcomeModel");
const venue = require("../../models/chatConvoModel/venueModel");
const dateTime = require("../../models/chatConvoModel/dateTimeModel");
const photosVideos = require("../../models/chatConvoModel/photosVideos");

router.get("/mergedchatroutes", async (req, res) => {
  const { authId } = req.query;

  try {
    const mergedData = await WelcomeDetails.aggregate([
      {
        $match: {
          authId: authId,
        },
      },
      {
        $lookup: {
          from: "venueschemas",
          localField: "authId",
          foreignField: "authId",
          as: "venue",
        },
      },
      {
        $lookup: {
          from: "datetimeschemas",
          localField: "authId",
          foreignField: "authId",
          as: "dateTime",
        },
      },
      {
        $lookup: {
          from: "photosvideosschemas",
          localField: "authId",
          foreignField: "authId",
          as: "photosVideos",
        },
      },
    ]);

    if (mergedData.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({
      message: "Merged data retrieved successfully",
      mergedData: mergedData[0],
    });
  } catch (error) {
    console.error("Error retrieving merged data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
