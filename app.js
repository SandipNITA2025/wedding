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

const app = express();

// fileUpload
const fileUpload = require("express-fileupload");

//middlewares:
app.use(logger("dev"));
app.use(bodyParser.text());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
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
