import mongoose from "mongoose";

const patientAidantSchema = new mongoose.Schema({
  patientAidant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  specialites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialite",
    },
  ],
  photo: {
    type: String,
    default: null,
  },
});

export default mongoose.model("PatientAidant", patientAidantSchema);
