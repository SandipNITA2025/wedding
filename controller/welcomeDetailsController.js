const weddingWelcomeDetails = require("../models/welcomeModel");
const cloudinary = require("../utils/cloudinary");

// POST METHOD:
const addDetailsController = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!req.files || !req.files.photo) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const photo = req.files.photo;

    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "Wedding",
    });

    const savedPost = await weddingWelcomeDetails.create({
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





module.exports = { addDetailsController };
