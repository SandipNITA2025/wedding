const express = require("express");
const router = express.Router();
const Wedding = require("../models/chatConvoModel/chatModel");
const cloudinary = require("../utils/cloudinary");

// Create a new wedding document
router.post("/chatdetailsss", async (req, res) => {
  try {
    const {
      authId,
      order,
      messages,
      location,
      date,
      time,
      options,
      textInput,
    } = req.body;

    let photosArr = [];
    if (req.files && req.files.photos) {
      const { photos } = req.files;

      if (Array.isArray(photos)) {
        for (const photo of photos) {
          const result = await cloudinary.uploader.upload(photo.tempFilePath, {
            folder: "WeddingEvent",
            public_id: `photo_${Date.now()}`,
          });
          photosArr.push({
            public_id: result.public_id,
            url: result.secure_url,
            size: result.bytes,
            name: photo.name,
            priority: photo.priority || 0, // Include priority field
          });
        }
      } else {
        const result = await cloudinary.uploader.upload(photos.tempFilePath, {
          folder: "WeddingEvent",
          public_id: `photo_${Date.now()}`,
        });

        photosArr.push({
          public_id: result.public_id,
          url: result.secure_url,
          size: result.bytes,
          name: photos.name,
          priority: photos.priority || 0, // Include priority field
        });
      }
    }

    let videosArr = [];
    if (req.files && req.files.videos) {
      const { videos } = req.files;

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
            priority: video.priority || 0, // Include priority field
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
          priority: videos.priority || 0, // Include priority field
        });
      }
    }

    const updatedMessages = messages || [];
    const updatedLocation = location || [];

    const savedPost = await Wedding.create({
      authId,
      order,
      messages: updatedMessages.map((message) => ({
        text: message.text || "",
        priority: message.priority || 100,
      })),
      location: updatedLocation.map((loc) => ({
        url: loc.url || "",
        priority: loc.priority || 101,
      })),
      date,
      time,
      options,
      photos: photosArr,
      videos: videosArr,
      textInput,
    });

    res.status(200).json({
      message: "Added successfully",
      savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
