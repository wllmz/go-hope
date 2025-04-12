import mongoose from "mongoose";

const articleFicheSchema = new mongoose.Schema({
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
  fiche: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fiche",
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
});

export default mongoose.model("articleFiche", articleFicheSchema);
