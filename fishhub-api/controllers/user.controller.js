const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// endpoint to check cookie and get user ID
exports.getUserID = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json("no cookie");

    jwt.verify(token, process.env.JWT, function (error, decoded) {
      try {
        res.send(decoded.userID);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    res.json(error);
  }
};

// getting all users
exports.findAll = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

// adding new user to DB
exports.create = async (req, res) => {
  try {
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
        sameSite: "none",
        secure: true,
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.log("Signup failed");
    console.log(err);
    res.status(500).send();
  }
};

// stores base64 user avatar in database
exports.avatar = async (req, res) => {
  try {
    // get image and create buffer
    let imageBase64 = req.body.avatar;
    imageBase64 = imageBase64.split(",")[1];
    let avatarImg = Buffer.from(imageBase64, "base64");

    // get user ID from token
    const token = req.cookies.token;
    if (!token) return res.json("no cookie");

    let id = getIdFromToken(token);

    await User.findByIdAndUpdate(id, { avatar: avatarImg });

    res.json("Image stored");
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
};

// user login
exports.login = async (req, res) => {
  console.log("Attempting to login..");
  console.log(req.body);
  try {
    // Validate request
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: "Password/email can not be empty!" });
      return;
    }

    const email = req.body.email;
    const password = req.body.password;

    // validating user exists
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      res.status(401).send({ message: "Invalid email/password" });
      return;
    }

    // validate user password
    const passwordValidate = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    // if not correct password
    if (!passwordValidate) {
      res.status(401).send({ message: "Invalid email/password" });
      return;
    }

    // create jwt token to sign user in
    const token = jwt.sign(
      {
        userID: existingUser._id,
      },
      process.env.JWT
    );
    console.log("Login success, token sending...");
    // send the token
    res
      .cookie("token", token, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

// log a user out
exports.logout = (req, res) => {
  // empty/expire the JWT
  res
    .cookie("token", "", {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

// Find a single user with an id
exports.findOne = (req, res) => {
  // get user ID from token
  const token = req.cookies.token;
  if (!token) return res.json("no cookie");

  let id = getIdFromToken(token);

  User.findById(id)
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
  // get user ID from token
  const token = req.cookies.token;
  if (!token) return res.json("no cookie");

  let id = getIdFromToken(token);

  User.findById(id)
    .then((user) => {
      user.firstName = req.body.firstName;
      user.surname = req.body.surname;
      user.number = req.body.number;
      user.country = req.body.country;
      user.city = req.body.city;

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// Find a user avatar by the id in the request
exports.getUserAvatar = (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id)
    .then((user) => {
      let avatar = user.avatar;
      let base64 = avatar.toString("base64");
      res.json(base64);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// endpoint to check if user logged in
exports.loggedIn = (req, res) => {
  console.log("Checking if user logged in...");
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT);

    res.send(true);
  } catch (error) {
    res.json(false);
  }
};

//verify token and return ID
let getIdFromToken = (token) => {
  let decoded = jwt.verify(token, process.env.JWT);
  return decoded.userID;
};
