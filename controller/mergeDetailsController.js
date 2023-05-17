const eventDetails = require("../models/eventModel");
const weddingWelcomeDetails = require("../models/welcomeModel");

// GET METHOD
const getMergedDetailsController = async (req, res) => {
  try {
    const mergedData = await weddingWelcomeDetails.aggregate([
      {
        $lookup: {
          from: "eventdetails",
          pipeline: [],
          as: "eventDetails",
        },
      },
      {
        $project: {
          messages: 1,
          photo: 1,
          eventDetails: {
            $arrayElemAt: ["$eventDetails", 0],
          },
        },
      },
    ]);

    res.status(200).json({
      message: "Merged details retrieved successfully",
      mergedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving merged details",
      error,
    });
  }
};

module.exports = { getMergedDetailsController };
