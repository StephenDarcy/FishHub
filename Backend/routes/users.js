const router = require("express").Router();
let User = require("../models/user.model");

// getting all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// adding new user to DB
router.route("/add").post(async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // validating username not taken
  const usernameTaken = User.findOne({ username });
  if (usernameTaken) {
    return res.status(400).json({ error: "This username is taken" });
  }

  // validating email not taken
  const emailTaken = User.findOne({ email });
  if (emailTaken) {
    return res.status(400).json({ error: "This email is taken" });
  }

  const newUser = new User({ username, email, password });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// getting user info with mongo object id
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// deleting user with mongo object id
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// updating user info with mongo object id
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
