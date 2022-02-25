const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// getting all users
exports.findAll = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

// adding new user to DB
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.email || !req.body.password) {
    res
      .status(400)
      .send({ message: "Username/password/email can not be empty!" });
    return;
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  console.log("Received: " + username, email, password);

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
  if (!savedUser) {
    return res.status(400).json({ error: "User could not be saved" });
  } else {
    console.log("User added");
  }

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

  console.log("");
};

// Find a single user with an id
exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Update a user by the id in the request
exports.update = (req, res) => {
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
};
