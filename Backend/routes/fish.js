const router = require("express").Router();
const R = require("r-script");

// getting scientific name from common
router.route("/fish/:common").get((req, res) => {
  var fishName = req.params.common;
  console.log("name received: " + fishName);
  let scientificName = R("./R Scripts/fishbase.R").data(fishName).callSync();
  console.log(scientificName);
  try {
    res.json("scientificName");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/fish/test").get((req, res) => {
  res.json({ message: "test" });
});
module.exports = router;
