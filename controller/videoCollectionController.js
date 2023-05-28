const collectionModel = require("../models/videoCollectionModel");
const cloudinary = require("../utils/cloudinary");

// POST METHOD
const AddVideoCollectionController = async (req, res) => {
  try {
    const { authId, VideoCollectionName, inviteType } = req.body;
    const videos = req.files.videos;

    let videosArr = [];
    if (Array.isArray(videos)) {
      for (const photo of videos) {
        const result = await cloudinary.uploader.upload(photo.tempFilePath, {
          resource_type: "video",
          folder: "Video_Collections",
          public_id: `video_${Date.now()}`,
        });

        videosArr.push({
          public_id: result.public_id,
          url: result.secure_url,
          size: result.bytes,
          name: photo.name,
        });
      }
    } else {
      const result = await cloudinary.uploader.upload(videos.tempFilePath, {
        resource_type: "video",
        folder: "Video_Collections",
        public_id: `photo_${Date.now()}`,
      });

      videosArr.push({
        public_id: result.public_id,
        url: result.secure_url,
        size: result.bytes,
        name: videos.name,
      });
    }

    const savedPost = await collectionModel.create({
      authId,
      VideoCollectionName,
      inviteType,
      videos: videosArr,
    });

    res.status(200).json({
      message: "Added collection details successfully",
      savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading videos",
      error,
    });
  }
};

// POST METHOD - Add More videos
const AddMorevideosController = async (req, res) => {
  try {
    const { collectionId } = req.body;
    const videos = req.files.videos;

    let videosArr = [];
    if (Array.isArray(videos)) {
      for (const video of videos) {
        const result = await cloudinary.uploader.upload(video.tempFilePath, {
          resource_type: "video",
          folder: "Video_Collections",
          public_id: `video_${Date.now()}`,
        });

        videosArr.push({
          public_id: result.public_id,
          url: result.secure_url,
          size: result.bytes,
          name: video.name,
        });
      }
    } else {
      const result = await cloudinary.uploader.upload(videos.tempFilePath, {
        resource_type: "video",
        folder: "Video_Collections",
        public_id: `video_${Date.now()}`,
      });

      videosArr.push({
        public_id: result.public_id,
        url: result.secure_url,
        size: result.bytes,
        name: videos.name,
      });
    }

    const updatedPost = await collectionModel.findByIdAndUpdate(
      collectionId,
      { $push: { videos: { $each: videosArr } } },
      { new: true }
    );

    res.status(200).json({
      message: "Added additional videos successfully",
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading additional videos",
      error,
    });
  }
};

// GET METHOD
const GetVideoCollectionController = async (req, res) => {
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
  AddVideoCollectionController,
  AddMorevideosController,
  GetVideoCollectionController,
};
