// // router object:
// const router = express.Router();
// const Poll = require("../models/pollsModel");

// // POST: Create a new poll
// router.post("/polls", async (req, res) => {
//   const { authId,inviteType, question, options } = req.body;

//   try {
//     // Check if options array is provided
//     if (!options || !Array.isArray(options)) {
//       return res.status(400).json({ error: "Options array is required." });
//     }

//     // Create a new poll
//     const poll = new Poll({
//       authId,
//       inviteType,
//       question,
//       options: options.map((option) => ({ text: option, count: 0 })),
//     });

//     // Save the poll to the database
//     await poll.save();

//     res.json(poll);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating the poll." });
//   }
// });

// // PUT: Update the vote count
// router.put("/polls/:id", async (req, res) => {
//   const { id } = req.params;
//   const { option } = req.body;

//   try {
//     // Find the poll by ID
//     const poll = await Poll.findById(id);

//     if (!poll) {
//       return res.status(404).json({ error: "Poll not found." });
//     }

//     // Find the index of the selected option
//     const optionIndex = poll.options.findIndex((o) => o.text === option);

//     if (optionIndex === -1) {
//       return res.status(400).json({ error: "Invalid option." });
//     }

//     // Increase the count of the selected option
//     poll.options[optionIndex].count += 1;

//     // Save the updated poll
//     await poll.save();

//     res.json(poll);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating the vote count." });
//   }
// });

// // GET: Get all polls
// router.get("/getallpolls", async (req, res) => {
//   try {
//     // Fetch all polls from the database
//     const polls = await Poll.find();

//     res.json(polls);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the polls." });
//   }
// });

// // GET: Get a specific poll by ID
// router.get("/polls/:id", async (req, res) => {
//   const { authId } = req.query;

//   try {
//     // Find the poll by ID
//     const poll = await Poll.findById({authId});

//     if (!poll) {
//       return res.status(404).json({ error: "Poll not found." });
//     }

//     res.json(poll);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the poll." });
//   }
// });

// module.exports = router;
