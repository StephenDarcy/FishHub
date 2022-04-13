const db = require("../models");
const Thread = db.threads;
const jwt = require("jsonwebtoken");

// getting all threads
exports.getAll = (req, res) => {
  Thread.find()
    .then((threads) => res.json(threads))
    .catch((err) => res.status(400).json("Error: " + err));
};

// getting one thread by Id
exports.findThread = (req, res) => {
  Thread.findById(req.params.id)
    .then((threads) => {
      console.log(threads);
      res.json(threads);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// adding new thread to DB
exports.create = async (req, res) => {
  try {
    console.log(req.body);
    // Validate request
    if (!req.body.topic || !req.body.body) {
      res.status(400).send({ message: "Thread info can not be empty!" });
      return;
    }

    // get user ID from token
    const token = req.cookies.token;
    if (!token) return res.json("no cookie");

    let id = getIdFromToken(token);

    const topic = req.body.topic;
    const body = req.body.body;
    const username = req.body.username;
    const createdBy = id;

    console.log("Received: " + topic, body, createdBy);

    // creating new thread
    const newThread = new Thread({ topic, body, createdBy, username });

    // saving user
    const savedThread = await newThread.save();
    if (!savedThread) {
      return res.status(400).json({ error: "Thread could not be saved" });
    } else {
      console.log("Thread added");
    }

    res.status(200).json("successfully created");
  } catch (err) {
    console.log("Thread creation failed");
    console.log(err);
    res.status(500).send();
  }
};

//verify token and return ID
let getIdFromToken = (token) => {
  let decoded = jwt.verify(token, process.env.JWT);
  return decoded.userID;
};
