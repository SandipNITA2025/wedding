const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema({
  order: {
    type: Number,
  },
  authId: {
    type: String,
  },
  chatId: { type: String },
  photos: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      size: {
        type: Number,
      },
      name: {
        type: String,
      },
      priority: {
        type: Number,
      },
    },
  ],
  videos: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      size: {
        type: Number,
      },
      name: {
        type: String,
      },
      priority: {
        type: Number,
      },
    },
  ],
  messages: [
    {
      text: {
        type: String,
      },
      priority: {
        type: Number,
      },
    },
  ],
  location: [
    {
      url: {
        type: String,
      },
      priority: {
        type: Number,
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
      },
      order: {
        type: Number,
      },
      priority: {
        type: Number,
      },
      toSaveToDatabse: {
        type: Boolean,
      },
      databaseSaveUrl: {
        type: String,
      },
      databaseCallType: {
        type: String,
      },
      queryObject: {
        type: String,
      },
    },
  ],
  textInput: {
    order: {
      type: Number,
    },
    priority: {
      type: Number,
    },
    toSaveToDatabse: {
      type: Boolean,
    },
    databaseSaveUrl: {
      type: String,
    },
    databaseCallType: {
      type: String,
    },
    queryObject: {
      type: String,
    },
  },
});

const Wedding = mongoose.model("Wedding", weddingSchema);

module.exports = Wedding;
