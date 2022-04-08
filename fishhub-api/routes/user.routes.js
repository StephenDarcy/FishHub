module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.get("/getUserID", users.getUserID);

  router.post("/", users.create);

  router.post("/avatar", users.avatar);

  router.post("/login", users.login);

  router.get("/logout", users.logout);

  router.get("/", users.findAll);

  router.get("/loggedIn", users.loggedIn);

  router.get("/getUser", users.findOne);

  router.delete("/:id", users.delete);

  app.use("/api/users", router);
};
