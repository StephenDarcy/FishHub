const router = require("express").Router();
const R = require("r-script");

// getting scientific name from common
router.route("/scientific/:common").get((req, res) => {
  console.log("name received: " + req.params.common);
  let commonName = req.params.common;

  let out = R("./R Scripts/common-to-sci.R").data(commonName).callSync();
  console.log(out);
  try {
    res.json(out);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/").get((req, res) => {
  res.json({ message: "test" });
});
module.exports = router;
