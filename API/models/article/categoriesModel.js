import mongoose from "mongoose";

const categories = new mongoose.Schema({
  category_tittle: {
    type: String,
    required: true,
    unique: true,
  },
  category_image: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Category", categories);
