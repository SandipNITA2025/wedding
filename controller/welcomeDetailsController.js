const weddingWelcomeDetails = require("../models/chatConvoModel/welcomeModel");
const cloudinary = require("../utils/cloudinary");

// POST METHOD:
const addDetailsController = async (req, res) => {
  try {
    const { authId,order,messages } = req.body;

    if (!req.files || !req.files.photo) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const photo = req.files.photo;

    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "Wedding",
    });

    const savedPost = await weddingWelcomeDetails.create({
      authId,
      order,
      messages,
      photo: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(200).json({
      message: "Added welcome details successfully",
      savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};




//GET METHOD:
const getDetailsController = async (req, res) => {
  const { authId } = req.query;
  try {
    const details = await weddingWelcomeDetails.find({authId});
    res.status(200).json({
      message: "get successfully",
      details,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving details",
      error,
    });
  }
};

module.exports = { addDetailsController, getDetailsController };
