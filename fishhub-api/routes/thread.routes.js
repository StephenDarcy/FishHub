module.exports = (app) => {
  const threads = require("../controllers/thread.controller.js");
  var router = require("express").Router();

  router.get("/", threads.getAll);

  router.post("/", threads.create);

  app.use("/api/thread", router);
};
