import mongoose from "mongoose";

const categorieForumSchema = new mongoose.Schema({
  categorie: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Exporter le modèle Module
export default mongoose.model("categorieForum", categorieForumSchema);
