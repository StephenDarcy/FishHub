const express = require("express");
var cors = require("cors");
const R = require("r-script");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

var out;

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const uri = "mongodb://mongo:27017/FishHubDB"; //process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

// Mongo Requests
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// Api
app.get("/api", (req, res) => {
  res.json({ message: "test" });
});

// R requests
const fishRouter = require("./routes/fish");
app.use("/fish", fishRouter);

app.post("/fish", function (req, res) {
  var fishName = req.body.name;
  console.log("name received: " + fishName);
  out = R("./R Scripts/fishbase.R").data(fishName).callSync();
  console.log(out);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);

  try {
    connection.once("open", () => {
      console.log("MongoDB database connection established successfully");
    });
  } catch (e) {
    console.log(e);
  }
});
