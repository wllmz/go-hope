import mongoose from "mongoose";

const atelierSchema = new mongoose.Schema({
  titreAtelier: {
    type: String,
    required: true,
  },
  affichage: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  date_debut: {
    type: Date,
    required: true,
  },
  date_fin: {
    type: Date,
    required: true,
  },
  date_debut_formatted: {
    type: String,
  },
  date_fin_formatted: {
    type: String,
  },
  animatrice: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    {
      role: {
        type: String,
        enum: ["patient-aidant"],
        default: "patient-aidant",
        required: true,
      },
    },
  ],
  nombre_participant: {
    type: Number,
    required: true,
  },
  participant: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
      },
      role: {
        type: String,
        enum: ["patient"],
        default: "patient",
        required: true,
      },
    },
  ],
  image: {
    type: String,
  },
  lien: {
    type: String,
  },
  prix: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
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
  liste_attente: {
    type: String,
    default: false,
    required: true,
  },
  generique: {
    type: Boolean,
    default: false,
    required: true,
  },
});

// Middleware pour formater les dates avant de sauvegarder
atelierSchema.pre("save", function (next) {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  this.date_debut_formatted = new Date(this.date_debut).toLocaleString(
    "fr-FR",
    options
  );
  this.date_fin_formatted = new Date(this.date_fin).toLocaleString(
    "fr-FR",
    options
  );

  next();
});

// Middleware pour formater les dates lors des mises à jour
atelierSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (update.date_debut) {
    update.date_debut_formatted = new Date(update.date_debut).toLocaleString(
      "fr-FR",
      options
    );
  }

  if (update.date_fin) {
    update.date_fin_formatted = new Date(update.date_fin).toLocaleString(
      "fr-FR",
      options
    );
  }

  next();
});

export default mongoose.model("Atelier", atelierSchema);
