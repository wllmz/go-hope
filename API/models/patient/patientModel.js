import mongoose from "mongoose";

const patientAidantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Le titre est requis"],
    trim: true,
  },
  hasCertification: {
    type: Boolean,
    required: [true, "Veuillez indiquer si vous avez une certification"],
  },
  certificateUrl: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "La description est requise"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
});

export default mongoose.model("PatientAidant", patientAidantSchema);
