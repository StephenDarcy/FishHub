module.exports = (app) => {
  const threadPosts = require("../controllers/threadPost.controller.js");
  var router = require("express").Router();

  router.get("/:threadId", threadPosts.getThreadPost);

  router.post("/", threadPosts.create);

  app.use("/api/threadPosts", router);
};
