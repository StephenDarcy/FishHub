const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const R = require("r-script");
var out;

var cors = require("cors");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.json({ message: out[0] });
});

app.post("/fish", function (req, res) {
  var fishName = req.body.name;
  console.log("name recieved: " + fishName);
  out = R("./R Scripts/fishbase.R").data(fishName).callSync();
  console.log(out);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
