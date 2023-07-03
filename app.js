require("dotenv").config({ path: ".env" });
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/mongoDb");
const welcomeDetails = require("./routes/chatRoutes/welcomeDetails");
const eventDetails = require("./routes/chatRoutes/eventDetails");
const addUser = require("./routes/addUser");
const authRoute = require("./routes/authRoute");
const mergeRoute = require("./routes/mergeRoute");
const collectionRoute = require("./routes/collectionRoute");
const videoCollectionRoute = require("./routes/videoCollectionRoute");
const pollsRoute = require("./routes/pollsRoute");
const musicListRoute = require("./routes/musicListRoute");
const gitfRoute = require("./routes/giftRoute");
const calenderRoute = require("./routes/calenderRoute");
const count = require("./routes/count");
const suggestSongsRoute = require("./routes/suggestSongsRoute");
const session = require("express-session");

// TEST MODEL:
const testkatest = require("./routes/chatRoutes/chatRouter");
const testR = require("./Test/testRouter");



// ChatBot Route paths:
const datetimes = require("./routes/chatRoutes/dateTimeRoute");
const venuelocations = require("./routes/chatRoutes/venueRoute");
const photosAndvideos = require("./routes/chatRoutes/photosVideosRoute");
const mergedChatRoutes = require("./routes/chatRoutes/mergedchatroutes");

const app = express();

// File Upload:
const fileUpload = require("express-fileupload");

// Middlewares:
app.use(logger("dev"));
app.use(bodyParser.text());
app.use(express.json({ limit: Infinity }));
app.use(express.urlencoded({ limit: Infinity, extended: true }));
app.use(cookieParser());
app.use(cors());

// MongoDB connect:
connectDB();

// File Upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Configure session middleware
app.use(
  session({
    secret: "aA@pjahcbjhahfh@%gvhag#$hbdc&jbjH!",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes:

// Chatbot Routes:
app.use("/api/auth", welcomeDetails);
app.use("/api/auth", datetimes);
app.use("/api/auth", venuelocations);
app.use("/api/auth", photosAndvideos);
app.use("/api/auth", mergedChatRoutes);

// TEST
app.use("/api/auth", testkatest);
app.use("/api/auth", testR);

// EVENT DETAILS
app.use("/api/weddingeventdetails", eventDetails);
// Merge above two API details:
app.use("/api/mergedetails", mergeRoute);
// Auth route:
app.use("/api/auth", authRoute);
// ADD NEW USER
app.use("/api/adduser", addUser);
// Collection route:
app.use("/api/auth", collectionRoute);
// Video collection route:
app.use("/api/auth", videoCollectionRoute);
// Polls route:
app.use("/api/auth", pollsRoute);
// Playlist route:
app.use("/api/auth", musicListRoute);
// Gift List route:
app.use("/api/auth", gitfRoute);
// Calendar events route:
app.use("/api/auth", calenderRoute);
// Count route:
app.use("/api/auth", count);
// Suggestion Playlists:
app.use("/api/auth", suggestSongsRoute);

// Rest API:
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// PORT
const PORT = process.env.PORT || 8500;

// Run server:
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode, ${PORT}`);
});
