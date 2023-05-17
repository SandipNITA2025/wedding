const mongoose = require("mongoose");

//schema design:
const authSchema = mongoose.Schema(
  {
    authName: {
      type: String,
      required: [true, "Name is required"],
    },
    authEmail: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    authPassword: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

//export:
module.exports = mongoose.model("authModel", authSchema)
