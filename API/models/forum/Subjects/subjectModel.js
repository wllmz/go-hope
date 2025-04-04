import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorieForum",
      required: true,
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  favoris: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Auth",
    default: [],
  },
  // Champ pour stocker le nombre de commentaires
  commentCount: {
    type: Number,
    default: 0,
  },
  validated: {
    type: String,
    enum: ["valider", "en attente", "Invalide"],
    required: true,
    default: "en attente",
  },
});

export default mongoose.model("Subjects", subjectSchema);
