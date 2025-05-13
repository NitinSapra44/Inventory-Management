import mongoose from "mongoose";
import customerSchema from "../models/customer.js";
import productSchema from "../models/product.js";

const Customer = mongoose.model("customer", customerSchema);
const Product = mongoose.model("product", productSchema);

async function AddCustomer(req, res) {
  const { name, GSTIN, address } = req.body;
  try {
    const customer = await Customer.create({
      Name: name,
      Address: address,
      GSTIN,
    });
    return res.status(201).json(customer);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(409).json({ Message: "Customer already exists" });
    }

    console.error("Error while adding customer:", error.message);
    return res.status(500).json({ Message: "Error registering customer" });
  }
}

async function findAllCustomer(req, res) {
  const customers = await Customer.find();
  res.status(201).json(customers);
}

async function findProductsRelatedtoCustomer(req, res) {
  const { id } = req.body;
  const customer = await Customer.findById(id);
  const relatedProducts = await Product.find({ partyName: customer.Name });
  return res.status(202).json(relatedProducts);
}

export { AddCustomer, findAllCustomer, findProductsRelatedtoCustomer };
