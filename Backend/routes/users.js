const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const usernameTaken = await User.findOne({ username: username });
  if (usernameTaken) {
    return res.status(400).json({ error: "This username is taken" });
  }

  // validating email not taken
  const emailTaken = await User.findOne({ email });
  if (emailTaken) {
    return res.status(400).json({ error: "This email is taken" });
  }

  // hashing user password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // creating new user
  const newUser = new User({ username, email, passwordHash });

  // saving user
  const savedUser = await newUser.save();

  // create jwt token to sign user in
  const token = jwt.sign(
    {
      userID: savedUser._id,
    },
    process.env.JWT
  );

  // send the token
  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .send();
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
