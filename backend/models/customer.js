import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  Name: { type: String, required: true, unique: true },
  Address: { type: String },
  GSTIN: { type: String },
});

export default customerSchema;
