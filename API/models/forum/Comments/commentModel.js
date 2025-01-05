import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subjects",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Auth",
    default: [],
  },
});

export default mongoose.model("Comments", commentSchema);
