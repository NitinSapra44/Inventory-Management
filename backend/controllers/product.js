import mongoose from "mongoose";
import productSchema from "../models/product.js";

const Product = mongoose.model("product", productSchema);

function handleImageUpload(req, res) {
  console.log(req.files);
  const fileNames = req.files.map((file) => file.path); // Extract the new filenames
  res.json({ fileNames });
}

async function handleProductAdd(req, res) {
  const { partyName, type, size, specialName, quantity, photos } = req.body;
  try {
    const newProduct = await Product.create({
      partyName,
      type,
      size,
      specialName,
      quantity,
      photos,
    });
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        message: "Duplicate product! This combination already exists.",
      });
    } else {
      res.status(500).json({ message: "Product creation failed" });
    }
  }
}

async function findAllProducts(req, res) {
  const Products = await Product.find();
  res.status(200).json(Products);
}

async function findProductbyId(req, res) {
  const { id } = req.body;
  const ProductbyId = await Product.findById(id);
  if (ProductbyId.type === "Cover") {
    const [length, width, height] = ProductbyId.size.split("X");
    const matchingBottoms = await Product.find({
      type: "Bottom",
      size: { $regex: `^${length}X${width}X` },
      $or: [{ partyName: ProductbyId.partyName }, { partyName: "Common" }],
    });
    return res
      .status(201)
      .json({ cover: ProductbyId, bottom: matchingBottoms });
  }

  return res.status(201).json(ProductbyId);
}

async function productsReadytoPrint(req, res) {
  const Productstoprint = await Product.find({ quantity: { $lt: 1500 } });
  res.status(201).json(Productstoprint);
}

export {
  handleImageUpload,
  handleProductAdd,
  findAllProducts,
  findProductbyId,
  productsReadytoPrint,
};
