const db = require("../models");
const ThreadPost = db.threadPosts;
const jwt = require("jsonwebtoken");

// getting all threadPosts
exports.getThreadPost = (req, res) => {
  ThreadPost.find({ threadId: req.params.threadId })
    .then((threadPosts) => res.json(threadPosts))
    .catch((err) => res.status(400).json("Error: " + err));
};

// adding new threadPost to DB
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.threadId || !req.body.body || !req.body.username) {
      res.status(400).send({ message: "ThreadPost info can not be empty!" });
      return;
    }

    // get user ID from token
    const token = req.cookies.token;
    if (!token) return res.json("no cookie");

    let id = getIdFromToken(token);

    const threadId = req.body.threadId;
    const body = req.body.body;
    const username = req.body.username;

    const createdBy = id;

    console.log("Received: " + threadId, body, createdBy);

    // creating new threadPost
    const newThreadPost = new ThreadPost({
      threadId,
      body,
      createdBy,
      username,
    });

    // saving thread post
    const savedThreadPost = await newThreadPost.save();
    if (!savedThreadPost) {
      return res.status(400).json({ error: "ThreadPost could not be saved" });
    } else {
      console.log("ThreadPost added");
    }

    res.status(200).json("successfully created");
  } catch (err) {
    console.log("ThreadPost creation failed");
    console.log(err);
    res.status(500).send();
  }
};

//verify token and return ID
let getIdFromToken = (token) => {
  let decoded = jwt.verify(token, process.env.JWT);
  return decoded.userID;
};
