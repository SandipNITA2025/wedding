const express = require("express");
const router = express.Router();
const Wedding = require("../../models/chatConvoModel/chatModel");
const cloudinary = require("../../utils/cloudinary");

// Create a new wedding document
router.post("/chatdetails", async (req, res) => {
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
            priority: photo.priority || 100,
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
          priority: photos.priority || 101,
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
            priority: video.priority || 102,
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
          priority: videos.priority || 103,
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
        priority: message.priority || 104,
      })),
      location: updatedLocation.map((loc) => ({
        url: loc.url || "",
        priority: loc.priority || 105,
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

// GET request to retrieve all entries
router.get("/chatdetails", async (req, res) => {
  const { authId } = req.query;
  try {
    const details = await Wedding.find({ authId });
    res.status(200).json({
      message: "Retrieved data successfully",
      details,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving data details",
      error,
    });
  }
});

// PUT request to update a specific field of a wedding document
router.put("/chatdetailstest/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const wedding = await Wedding.findById(id);

    if (!wedding) {
      return res.status(404).json({ error: "Wedding document not found" });
    }

    if (req.body.order) {
      wedding.order = req.body.order;
    }

    if (req.body.authId) {
      wedding.authId = req.body.authId;
    }

    if (req.body.photos) {
      wedding.photos = req.body.photos;
    }

    if (req.body.videos) {
      wedding.videos = req.body.videos;
    }

    if (req.body.messages) {
      wedding.messages = req.body.messages;
    }

    if (req.body.location) {
      wedding.location = req.body.location;
    }

    if (req.body.date) {
      wedding.date = req.body.date;
    }

    if (req.body.time) {
      wedding.time = req.body.time;
    }

    if (req.body.options) {
      wedding.options = req.body.options;
    }

    if (req.body.textInput) {
      wedding.textInput = req.body.textInput;
    }

    // Save
    const updatedWedding = await wedding.save();

    res.status(200).json({
      message: "Wedding document updated successfully",
      updatedWedding,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// EMPTY request, set empty fields at once
router.delete("/chatdetails/:id/set_empty", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the document by ID
    const wedding = await Wedding.findById(id);

    if (!wedding) {
      return res.status(404).json({ message: "Wedding not found" });
    }

    // Clear all the fields in the document
    wedding.order = undefined;
    wedding.messages = [];
    wedding.location = [];
    wedding.date = undefined;
    wedding.time = undefined;
    wedding.photos = [];
    wedding.videos = [];
    wedding.options = [];
    wedding.textInput = undefined;

    await wedding.save();

    res.status(200).json({ message: "All fields deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// DELETE request to delete the entire wedding document
router.delete("/chatdetails/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the document by ID and remove it
    await Wedding.findByIdAndRemove(id);

    res.status(200).json({ message: "Wedding document deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// DELETE request to delete a specific field in the wedding document
router.delete("/chatdetails/:id/:field", async (req, res) => {
  const { id, field } = req.params;

  try {
    // Find the document by ID
    const wedding = await Wedding.findById(id);

    if (!wedding) {
      return res.status(404).json({ message: "Wedding not found" });
    }

    // Delete the specified field from the document
    wedding[field] = undefined;

    // Save the updated document
    await wedding.save();

    res.status(200).json({ message: `${field} field deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// DELETE request to delete a particular photo in the wedding document
router.delete("/chatdetails/:id/photos/:photoId", async (req, res) => {
  const { id, photoId } = req.params;

  try {
    const wedding = await Wedding.findById(id);

    if (!wedding) {
      return res.status(404).json({ message: "Wedding not found" });
    }

    const photoIndex = wedding.photos.findIndex(
      (photo) => photo._id.toString() === photoId
    );

    if (photoIndex === -1) {
      return res.status(404).json({ message: "Photo not found" });
    }

    wedding.photos.splice(photoIndex, 1);

    await wedding.save();

    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
// DELETE request to delete a particular video in the wedding document
router.delete("/chatdetails/:id/videos/:videoId", async (req, res) => {
  const { id, videoId } = req.params;

  try {
    // Find the document by ID
    const wedding = await Wedding.findById(id);

    if (!wedding) {
      return res.status(404).json({ message: "Wedding not found" });
    }

    // Find the index of the video in the videos array
    const videoIndex = wedding.videos.findIndex(
      (video) => video._id.toString() === videoId
    );

    if (videoIndex === -1) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Remove the video from the videos array
    wedding.videos.splice(videoIndex, 1);

    // Save the updated document
    await wedding.save();

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST method to add more photos to the wedding document
router.post("/chatdetails/:id/addPhotos", async (req, res) => {
  const { id } = req.params;

  try {
    const wedding = await Wedding.findById(id);

    if (!wedding) {
      return res.status(404).json({ error: "Wedding document not found" });
    }

    const photos = req.files.photos;

    let photosArr = [];
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
          priority: photo.priority || 101,
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
        priority: photos.priority || 101,
      });
    }

    wedding.photos.push(...photosArr);

    // Save
    const updatedWedding = await wedding.save();

    res.status(200).json({
      message: "Added more photos successfully",
      updatedWedding,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST method to add more videos to the wedding document
router.post("/chatdetails/:id/addVideos", async (req, res) => {
  const { id } = req.params;

  try {
    const wedding = await Wedding.findById(id);

    if (!wedding) {
      return res.status(404).json({ error: "Wedding document not found" });
    }

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
          priority: video.priority || 102,
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
        priority: videos.priority || 103,
      });
    }

    wedding.videos.push(...videosArr);

    // Save
    const updatedWedding = await wedding.save();

    res.status(200).json({
      message: "Added more videos successfully",
      updatedWedding,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
