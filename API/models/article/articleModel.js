import mongoose from "mongoose";

const articles = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
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
  // Nouveau champ pour spécifier le format de l'article (fiche ou vidéo)
  mediaType: {
    type: String,
    enum: ["Fiche", "Vidéo"],
    default: "Fiche", // vous pouvez changer la valeur par défaut selon vos besoins
  },
  videoUrl: { type: String },
  videoDuration: { type: Number },
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
