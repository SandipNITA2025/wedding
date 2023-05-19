const collectionModel = require("../models/collectionModel");
const cloudinary = require("../utils/cloudinary");

// POST METHOD
const AddCollectionController = async (req, res) => {
  try {
    const { authId, collectionName } = req.body;
    const photos = req.files.photos;

    let photosArr = [];
    if (Array.isArray(photos)) {
      for (const photo of photos) {
        const result = await cloudinary.uploader.upload(photo.tempFilePath, {
          folder: "Collections",
          public_id: `photo_${Date.now()}`,
        });

        photosArr.push({
          public_id: result.public_id,
          url: result.secure_url,
          size: result.bytes,
          name: photo.name,
        });
      }
    } else {
      const result = await cloudinary.uploader.upload(photos.tempFilePath, {
        folder: "Collections",
        public_id: `photo_${Date.now()}`,
      });

      photosArr.push({
        public_id: result.public_id,
        url: result.secure_url,
        size: result.bytes,
        name: photos.name,
      });
    }

    const savedPost = await collectionModel.create({
      authId,
      collectionName,
      photos: photosArr,
    });

    res.status(200).json({
      message: "Added collection details successfully",
      savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading photos",
      error,
    });
  }
};

// POST METHOD - Add More Photos
const AddMorePhotosController = async (req, res) => {
  try {
    const { collectionId } = req.body;
    const photos = req.files.photos;

    let photosArr = [];
    if (Array.isArray(photos)) {
      for (const photo of photos) {
        const result = await cloudinary.uploader.upload(photo.tempFilePath, {
          folder: "Collections",
          public_id: `photo_${Date.now()}`,
        });

        photosArr.push({
          public_id: result.public_id,
          url: result.secure_url,
          size: result.bytes,
          name: photo.name,
        });
      }
    } else {
      const result = await cloudinary.uploader.upload(photos.tempFilePath, {
        folder: "Collections",
        public_id: `photo_${Date.now()}`,
      });

      photosArr.push({
        public_id: result.public_id,
        url: result.secure_url,
        size: result.bytes,
        name: photos.name,
      });
    }

    const updatedPost = await collectionModel.findByIdAndUpdate(
      collectionId,
      { $push: { photos: { $each: photosArr } } },
      { new: true }
    );

    res.status(200).json({
      message: "Added additional photos successfully",
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading additional photos",
      error,
    });
  }
};

// GET METHOD
const GetCollectionController = async (req, res) => {
  try {
    const { authId } = req.query; // Access authId from query parameters
    const details = await collectionModel.find({ authId });
    res.status(200).json({
      message: "Get collection details successfully",
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

module.exports = {
  AddCollectionController,
  AddMorePhotosController,
  GetCollectionController,
};