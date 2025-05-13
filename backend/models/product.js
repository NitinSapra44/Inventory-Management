import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    partyName: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    specialName: { type: String, required: true },
    quantity: { type: Number, required: true },
    photos: { type: [String], required: true },
  },
  { timestamps: true }
);

productSchema.index(
  { partyName: 1, type: 1, size: 1, specialName: 1 },
  { unique: true }
);

export default productSchema;
