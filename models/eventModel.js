const mongoose = require("mongoose");
// Wedding event model:
const EventSchema = new mongoose.Schema(
  {
    venue: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
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
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("eventDetails", EventSchema);
