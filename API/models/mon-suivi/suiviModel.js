import mongoose from "mongoose";

const suiviSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  motricité: [
    {
      zone: {
        type: String,
        enum: ["jambes", "bras", "pied", "main", "oeil"],
      },
      side: {
        type: String,
        enum: ["gauche", "droite", "les deux"],
      },
      niveau: {
        type: String,
        enum: ["normale", "basse", "forte", null],
        default: null,
      },
    },
  ],
  sensoriel: [
    {
      zone: {
        type: String,
        enum: ["jambes", "bras", "pied", "main", "oeil"],
      },
      side: {
        type: String,
        enum: ["gauche", "droite", "les deux"],
      },
      fourmillement: {
        type: String,
        enum: ["normale", "basse", "forte", null],
        default: null,
      },
      picotements: {
        type: String,
        enum: ["normale", "basse", "forte", null],
        default: null,
      },
      brulures: {
        type: String,
        enum: ["normale", "basse", "forte", null],
        default: null,
      },
    },
  ],
  douleurs: [
    {
      zone: {
        type: String,
        enum: ["jambes", "bras", "pied", "main", "oeil"],
      },
      side: {
        type: String,
        enum: ["gauche", "droite", "les deux"],
      },
      niveau: {
        type: String,
        enum: ["normale", "basse", "forte", null],
        default: null,
      },
    },
  ],
  troublesCognitifs: {
    memoire: {
      type: String,
      enum: ["normale", "basse", "forte"],
      default: null,
    },
    attention: {
      type: String,
      enum: ["normale", "basse", "forte"],
      default: null,
    },
    brouillardCerebral: {
      type: String,
      enum: ["normale", "basse", "forte"],
      default: null,
    },
  },
  fatigue: {
    type: String,
    enum: [
      "inexistant",
      "bas",
      "notable",
      "important",
      "très important",
      "insoutenable",
      "ne sais pas",
    ],
  },
  humeur: {
    type: String,
    enum: ["joyeux.se", "bien", "neutre", "perdu.e", "stressé.e", "inquiet.e"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Suivi", suiviSchema);
