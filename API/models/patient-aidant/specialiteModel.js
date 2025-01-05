import mongoose from "mongoose";

const specialiteSchema = new mongoose.Schema({
  specialiteName: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Specialite", specialiteSchema);
