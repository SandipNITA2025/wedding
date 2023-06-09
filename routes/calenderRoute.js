const express = require("express");
const CalenderModel = require("../models/calenderModel");

const router = express.Router();

// // POST endpoint to create a new event in the calendar
// router.post("/events", async (req, res) => {
//   try {
//     const {
//       authId,
//       inviteType,
//       eventName,
//       eventLocation,
//       eventTime,
//       eventDate,
//     } = req.body;

//     const event = {
//       inviteType,
//       eventName,
//       eventLocation,
//       eventTime,
//       eventDate,
//     };

//     const calendar = await CalenderModel.findOneAndUpdate(
//       { authId },
//       { $push: { events: event } },
//       { new: true, upsert: true }
//     );

//     res.status(201).json({
//       message: "Success Create event",

//       calendar,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create event" });
//   }
// });


// POST endpoint to create a new event in the calendar
router.post("/events", async (req, res) => {
  try {
    const { authId, inviteType, eventName, eventLocation, eventTime, eventDate } = req.body;

    const event = {
      inviteType,
      eventName,
      eventLocation,
      eventTime,
      eventDate,
    };

    const calendar = await CalenderModel.findOneAndUpdate(
      { authId },
      { $push: { events: event } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      message: "Success: Event created",
      calendar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create event" });
  }
});


// GET endpoint to retrieve all events from the calendar
router.get("/get-events", async (req, res) => {
  try {
    const { authId } = req.query;
    const calendar = await CalenderModel.find({ authId });
    res.status(200).json({
      message: "Get event details successfully",
      calendar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve events" });
  }
});

module.exports = router;
