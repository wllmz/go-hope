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
        enum: ["Jambes", "Bras", "Pied", "Main", "Oeil"],
      },
      side: {
        type: String,
        enum: ["gauche", "droite", "les deux"],
      },
      niveau: {
        type: String,
        enum: ["Normale", "Basse", "Forte", "Faible"],
      },
    },
  ],
  sensoriel: [
    {
      zone: {
        type: String,
        enum: ["Jambes", "Bras", "Pied", "Main", "Oeil"],
      },
      side: {
        type: String,
        enum: ["gauche", "droite", "les deux"],
      },
      fourmillement: {
        type: String,
        enum: ["Normale", "Basse", "Forte", "Faible"],
      },
      picotements: {
        type: String,
        enum: ["Normale", "Basse", "Forte", "Faible"],
      },
      brulures: {
        type: String,
        enum: ["Normale", "Basse", "Forte", "Faible"],
      },
    },
  ],
  douleurs: [
    {
      zone: {
        type: String,
        enum: ["Jambes", "Bras", "Pied", "Main", "Oeil"],
      },
      side: {
        type: String,
        enum: ["gauche", "droite", "les deux"],
      },
      niveau: {
        type: String,
        enum: ["Normale", "Basse", "Forte", "Faible"],
      },
    },
  ],
  troublesCognitifs: {
    memoire: {
      type: String,
      enum: ["Normale", "Basse", "Haute"],
    },
    attention: {
      type: String,
      enum: ["Normale", "Basse", "Haute"],
    },
    brouillardCerebral: {
      type: String,
      enum: ["Normale", "Basse", "Haute"],
    },
  },
  fatigue: {
    type: String,
    enum: [
      "Inexistant",
      "Bas",
      "Notable",
      "Important",
      "Très important",
      "Insoutenable",
      "Ne sais pas",
    ],
  },
  humeur: {
    type: String,
    enum: ["Joyeux.se", "Bien", "Neutre", "Perdu.e", "Stressé.e", "Inquiet.e"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Suivi", suiviSchema);
