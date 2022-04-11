const express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");

require("dotenv").config();

const PORT = process.env.NODE_DOCKER_PORT || 8080;
const app = express();
app.use(cookieParser());
var corsOptions = {
  origin: /*process.env.CLIENT_ORIGIN ||*/ "http://localhost:8888",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// test route
app.get("/", (req, res) => {
  res.json({ message: "Hello from FishHub backend" });
});

require("./routes/user.routes")(app);
require("./routes/image.routes")(app);
require("./routes/thread.routes")(app);
require("./routes/threadPost.routes")(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
