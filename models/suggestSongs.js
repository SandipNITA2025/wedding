const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
  },
  songs: [
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Playlist", playlistSchema);
