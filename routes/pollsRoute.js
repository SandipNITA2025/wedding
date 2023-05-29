// router object:
const express = require("express");
const Poll = require("../models/pollsModel");

const router = express.Router();

// POST: Create a new poll
router.post("/polls", async (req, res) => {
  const { authId, question, options } = req.body;

  try {
    if (!options || !Array.isArray(options)) {
      return res.status(400).json({ error: "Options array is required." });
    }

    const poll = new Poll({
      authId,
      question,
      options: options.map((option) => ({ text: option, count: 0 })),
    });

    await poll.save();

    res.json(poll);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the poll." });
  }
});

// PUT: Update the vote count
router.put("/polls/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { optionIndex } = req.body;

  try {
    const poll = await Poll.findById(id);

    if (!poll) {
      return res.status(404).json({ error: "Poll not found." });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: "Invalid option index." });
    }

    poll.options[optionIndex].count++;
    await poll.save();

    res.json(poll);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the vote count." });
  }
});

// GET: Get all polls
router.get("/getallpolls", async (req, res) => {
  try {
    const polls = await Poll.find();

    res.json(polls);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the polls." });
  }
});






// GET: Get a specific poll by ID:
router.get("/get-polls", async (req, res) => {
  const { authId } = req.query; 

  try {
    const poll = await Poll.find({authId});

    if (!poll) {
      return res.status(404).json({ error: "Poll not found." });
    }

    res.json(poll);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the poll." });
  }
});

module.exports = router;
