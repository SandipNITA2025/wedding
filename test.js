
// PUT request to update a specific photo or video
router.put("/photosandvideos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      // const { authId, order } = req.body;
      const { photos, videos } = req.files;
  
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
        });
      }
  
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
          public_id: `photo_${Date.now()}`,
        });
  
        videosArr.push({
          public_id: result.public_id,
          url: result.secure_url,
          size: result.bytes,
          name: videos.name,
        });
      }
  
      const updatedPost = await PhotosVideosModel.findByIdAndUpdate(
        id,
        { photos: photosArr, videos: videosArr },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({
          message: "Photo or video not found",
        });
      }
  
      res.status(200).json({
        message: "Updated photo or video successfully",
        updatedPost,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error updating photo or video",
        error,
      });
    }
  });
























  // --------------------------PUT AND DELETE---------------------------
// PUT request to update a specific photo or video
router.put("/photosandvideos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      // const { authId, order } = req.body;
      const { photos, videos } = req.files;
  
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
        });
      }
  
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
          public_id: `photo_${Date.now()}`,
        });
  
        videosArr.push({
          public_id: result.public_id,
          url: result.secure_url,
          size: result.bytes,
          name: videos.name,
        });
      }
  
      const updatedPost = await PhotosVideosModel.findByIdAndUpdate(
        id,
        { photos: photosArr, videos: videosArr },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({
          message: "Photo or video not found",
        });
      }
  
      res.status(200).json({
        message: "Updated photo or video successfully",
        updatedPost,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error updating photo or video",
        error,
      });
    }
  });
  
  // DELETE request to delete a specific photo or video
  router.delete("/photosandvideos/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedPost = await PhotosVideosModel.findByIdAndRemove(id);
  
      if (!deletedPost) {
        return res.status(404).json({
          message: "Photo or video not found",
        });
      }
  
      // Delete photos from cloudinary
      for (const photo of deletedPost.photos) {
        await cloudinary.uploader.destroy(photo.public_id);
      }
  
      // Delete videos from cloudinary
      for (const video of deletedPost.videos) {
        await cloudinary.uploader.destroy(video.public_id);
      }
  
      res.status(200).json({
        message: "Deleted photo or video successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error deleting photo or video",
        error,
      });
    }
  });
  