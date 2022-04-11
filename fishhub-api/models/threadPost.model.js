const mongoose = require("mongoose");

const threadPostsSchema = new mongoose.Schema(
  {
    threadId: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      trim: true,
      required: "Body is required",
    },
    createdBy: {
      type: String,
      required: "User ID is required",
    },
    username: {
      type: String,
      required: "Username is required",
    },
  },
  {
    timestamps: true,
  }
);
threadPostsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const ThreadPost = mongoose.model("ThreadPost", threadPostsSchema);

module.exports = { ThreadPost };
