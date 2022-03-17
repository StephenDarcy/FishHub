module.exports = (app) => {
  const image = require("../controllers/image.controller.js");
  var router = require("express").Router();

  router.get("/:species", image.find);

  router.delete("/delete", image.delete);

  app.use("/api/image", router);
};
