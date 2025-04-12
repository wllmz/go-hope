import mongoose from "mongoose";

const ficheSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    enum: ["partenaire", "sante", "news"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "articleFiche",
  },
});

export default mongoose.model("fiche", ficheSchema);
