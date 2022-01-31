const router = require("express").Router();
const R = require("r-script");

// getting scientific name from common
router.route("/scientific/:common").get((req, res) => {
  console.log("name received: " + req.params.common);

  R("../R Scripts/common-to-sci.R")
    .data({ commonName: req.params.common })
    .call(function (err, d) {
      if (err) throw err;
      console.log(d);
    });
  try {
    res.json(d);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/").get((req, res) => {
  res.json({ message: "test" });
});
module.exports = router;
