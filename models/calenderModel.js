const mongoose = require("mongoose");

//Welcome message model:
const CalenderSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      required: true,
    },
    events: [
      {
        inviteType: {
          type: String,
          required: false,
        },
        eventName: {
          type: String,
          required: true,
        },
        eventLocation: {
          type: String,
          required: false,
        },
        eventTime: {
          type: String,
          required: true,
        },
        eventDate: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventCalender", CalenderSchema);
