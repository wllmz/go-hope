import mongoose from "mongoose";

const articles = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
    match:
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i,
  },
  content: {
    type: String,
    required: true,
  },
  time_lecture: {
    type: Number,
    required: true,
    min: 0,
    max: 3600,
  },
  type: {
    type: String,
    enum: ["Conseil", "Article", "Outil"],
    required: true,
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["En cours", "Correction", "Publié"],
    default: "En cours",
  },
  read: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Auth",
    default: [],
  },
  favoris: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Auth",
    default: [],
  },
  saisonier: [
    {
      month: {
        type: String,
        match: /^(0[1-9]|1[0-2])$/,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export default mongoose.model("Article", articles);
