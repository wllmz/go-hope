import mongoose from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
  },
  emailHash: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    match: /^(\+33[1-9]\d{8}|0[1-9]\d{8})$/,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["Masculin", "Féminin", "Autre"],
    default: null,
  },
  roles: {
    type: [String],
    enum: ["admin", "patient", "patient-aidant", "proche-aidant"],
    default: "patient",
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

// Hook pour mettre à jour la date et calculer le hash de l'email lors de la sauvegarde
authSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  if (this.isModified("email")) {
    // Création d'un hash SHA-256 de l'email en clair
    this.emailHash = crypto
      .createHash("sha256")
      .update(this.email)
      .digest("hex");
  }
  next();
});

// Ajout du plugin de chiffrement pour les champs sensibles
authSchema.plugin(fieldEncryption, {
  fields: ["email", "phone"],
  secret: process.env.ENCRYPTION_KEY, // Assurez-vous de définir cette variable d'environnement
});

const Auth = mongoose.models.Auth || mongoose.model("Auth", authSchema);

export default Auth;
