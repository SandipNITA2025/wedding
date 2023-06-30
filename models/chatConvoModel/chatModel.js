const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: false,
  },
  authId: {
    type: String,
    // required: true,
  },
  photos: [
    {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
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
  videos: [
    {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
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
  messages: [
    {
      type: String,
    },
  ],
  location: [
    {
      type: String,
    },
  ],
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  options: [
    {
      name: {
        type: String,
      },
      order: {
        type: Number,
      },
    },
  ],
  textInput: {
    order: {
      type: Number,
    },
  },
});

const Wedding = mongoose.model("Wedding", weddingSchema);

module.exports = Wedding;
