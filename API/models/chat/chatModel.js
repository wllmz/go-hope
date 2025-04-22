import mongoose from "mongoose";

const chatWaitlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "activated"],
    default: "pending",
  },
  notifiedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ajouter un index unique sur le champ user pour éviter les doublons
chatWaitlistSchema.index({ user: 1 }, { unique: true });

export default mongoose.model("chatWaitlist", chatWaitlistSchema);
