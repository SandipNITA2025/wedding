const express = require("express");
const router = express.Router();
const PlaylistItem = require("../models/suggestSongs");

// POST route to upload songs to a playlist
// router.post("/splaylist", async (req, res) => {
//   try {
//     const { authId, inviteType, playlistName, songs } = req.body;

//     if (!authId  || !playlistName || !songs) {
//       // Check if required fields are missing
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }

//     let playlistItems = [];

//     if (Array.isArray(songs)) {
//       // Multiple songs provided
//       playlistItems = songs.map((song) => {
//         const { name, externalUrl } = song;
//         return new PlaylistItem({
//           authId,
//           inviteType,
//           playlistName,
//           name,
//           externalUrl,
//         });
//       });
//     } else {
//       // Single song provided
//       const { name, externalUrl } = songs;
//       playlistItems.push(
//         new PlaylistItem({
//           authId,
//           inviteType,
//           playlistName,
//           name,
//           externalUrl,
//         })
//       );
//     }

//     const insertedItems = await PlaylistItem.insertMany(playlistItems);

//     if (insertedItems.length === playlistItems.length) {
//       res.status(200).json({
//         success: true,
//         message: "Songs uploaded to playlist successfully",
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         message: "Error uploading songs to playlist",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error uploading songs to playlist",
//       error: error.message,
//     });
//   }
// });

router.post("/suggest_playlist", async (req, res) => {
  try {
    const playlistData = req.body;
    const playlist = await PlaylistItem.create(playlistData);
    res.status(201).json(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to retrieve playlist items by authId
router.get("/suggest_playlist", async (req, res) => {
  const { authId } = req.query;
  try {
    if (!authId) {
      return res.status(400).json({
        success: false,
        message: "Missing authId",
      });
    }

    // Find playlist items by authId
    const playlistItems = await PlaylistItem.find({ authId });

    res.status(200).json({ success: true, data: playlistItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving playlist items",
    });
  }
});

router.get("/suggest_playlist/:id", async (req, res) => {
  try {
    const details = await PlaylistItem.findById(req.params.id);
    res.status(200).json({
      message: "Get audio by id successfully",
      details,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving details",
      error,
    });
  }
});

module.exports = router;
