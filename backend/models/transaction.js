import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  type: { type: String, enum: ["print", "dispatch"] },
  quantity: Number,
  date: { type: Date, default: Date.now },
});

export default transactionSchema;
