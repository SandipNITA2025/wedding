const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema({
  order: {
    type: Number,
  },
  authId: {
    type: String,
    // required: true,
  },
  photos: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
      size: {
        type: Number,
        // required: true,
      },
      name: {
        type: String,
        // required: true,
      },
      priority: {
        type: Number,
        // required: true,
      },
    },
  ],
  videos: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
      size: {
        type: Number,
        // required: true,
      },
      name: {
        type: String,
        // required: true,
      },
      priority: {
        type: Number,
        // required: true,
      },
    },
  ],
  messages: [
    {
      text: {
        type: String,
        // required: true,
      },
      priority: {
        type: Number,
        // required: true,
      },
    },
  ],
  location: [
    {
      url: {
        type: String,
        // required: true,
      },
      priority: {
        type: Number,
        // required: true,
      },
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
        // required: true,
      },
      order: {
        type: Number,
        // required: true,
      },
      priority: {
        type: Number,
        // required: true,
      },
      toSaveToDatabse: {
        type: Boolean,
        // required: true,
      },
      databaseSaveUrl: {
        type: String,
        // required: true,
      },
      databaseCallType: {
        type: String,
        // required: true,
      },
      queryObject: {
        type: String,
        // required: true,
      },
    },
  ],
  textInput: {
    order: {
      type: Number,
      // required: true,
    },
    priority: {
      type: Number,
      // required: true,
    },
    toSaveToDatabse: {
      type: Boolean,
      // required: true,
    },
    databaseSaveUrl: {
      type: String,
      // required: true,
    },
    databaseCallType: {
      type: String,
      // required: true,
    },
    queryObject: {
      type: String,
      // required: true,
    },
  },
});

const Wedding = mongoose.model("Wedding", weddingSchema);

module.exports = Wedding;
