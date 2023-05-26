require("dotenv").config({ path: ".env" });
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/mongoDb");
const welcomeDetails = require("./routes/welcomeDetails");
const eventDetails = require("./routes/eventDetails");
const addUser = require("./routes/addUser");
const authRoute = require("./routes/authRoute");
const mergeRoute = require("./routes/mergeRoute");
const collectionRoute = require("./routes/collectionRoute");
const videoCollectionRoute = require("./routes/videoCollectionRoute");
const pollsRoute = require("./routes/pollsRoute");

const app = express();

// fileUpload :
const fileUpload = require("express-fileupload");

//middlewares:
app.use(logger("dev"));
app.use(bodyParser.text());
app.use(express.json({ limit: Infinity }));
app.use(express.urlencoded({ limit: Infinity, extended: true }));
app.use(cookieParser());
app.use(cors());


//MongoDB connect:
connectDB();

// fileUpload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//routes:

// WELCOME DETAILS
app.use("/api/welcomemessages", welcomeDetails);
//EVENT DETAILS
app.use("/api/weddingeventdetails", eventDetails);
//merge above two api details:
app.use("/api/mergedetails", mergeRoute);
//auth route:
app.use("/api/auth", authRoute);
//ADD NEW USER
app.use("/api/adduser", addUser);
//collection route:
app.use("/api/auth", collectionRoute);
//Video collection route:
app.use("/api/auth", videoCollectionRoute);
//Polls route:
app.use("/api/auth", pollsRoute);

//rest api:
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

//PORT
const PORT = process.env.PORT || 8500;

//run server:
app.listen(PORT, () => {
  console.log(`server running on ${process.env.NODE_ENV} mode, ${PORT}`);
});
