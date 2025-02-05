import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
  },
  password: {
    type: String,
    required: true,
  },
  termsAccepted: {
    type: Boolean,
    required: true,
  },
  termsEmailAccepted: {
    type: Boolean,
    default: false,
  },
  verifyEmail: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
  },
  phone: {
    type: String,
    match: /^(\+33[1-9]\d{8}|0[1-9]\d{8})$/,
    trim: true,
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

// Middleware pour mettre à jour la date lors de la mise à jour d'un document
authSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Auth = mongoose.models.Auth || mongoose.model("Auth", authSchema);

export default Auth;
