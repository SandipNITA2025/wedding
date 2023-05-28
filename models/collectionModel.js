const mongoose = require("mongoose");
// Wedding event model:
const collectionSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      required: true,
    },
    collectionName: {
      type: String,
      required: true,
    },
    inviteType: {
      type: String,
      required: false,
    },
    photos: [
      {
        public_id: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: true,
        },
        size: {
          type: Number,
          required: false,
        },
        name: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("collectionModel", collectionSchema);
