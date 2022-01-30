const router = require("express").Router();
const R = require("r-script");

// getting scientific name from common
router.route("/fish/:common").get((req, res) => {
  var fishName = req.body.common;
  console.log("name received: " + fishName);
  let scientificName = R("./R Scripts/fishbase.R").data(fishName).callSync();
  console.log(scientificName);
  try {
    res.json(scientificName);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

app.post("/fish", function (req, res) {
  var fishName = req.body.name;
  console.log("name received: " + fishName);
  out = R("./R Scripts/fishbase.R").data(fishName).callSync();
  console.log(out);
});
