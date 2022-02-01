const router = require("express").Router();
const R = require("r-script");

// getting scientific name from common
router.route("/scientific/:common").get((req, res) => {
  console.log("name received: " + req.params.common);

  var answer = R("../R Scripts/common-to-sci.R")
    .data({ commonName: req.params.common })
    .callSync();
  try {
    res.json(answer);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/").get((req, res) => {
  res.json({ message: "test" });
});
module.exports = router;
