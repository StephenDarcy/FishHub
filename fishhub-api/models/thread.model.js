const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
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
threadSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const Thread = mongoose.model("Thread", threadSchema);

module.exports = { Thread };
