const mongoose = require("mongoose");
// Wedding event model:
const PollsSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        text: String,
        count: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Polls", PollsSchema);
