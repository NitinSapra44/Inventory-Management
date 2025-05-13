import express from "express";
import upload from "../multerConfig.js";
import { handleImageUpload } from "../controllers/product.js";
import { handleProductAdd } from "../controllers/product.js";
import { findAllProducts } from "../controllers/product.js";
import { findProductbyId } from "../controllers/product.js";
import { productsReadytoPrint } from "../controllers/product.js";
const router = express.Router();

router.post("/photo-upload", upload.array("photos"), handleImageUpload);
router.post("/add-product", handleProductAdd);
router.get("/find-products", findAllProducts);
router.post("/find-product-by-id", findProductbyId);
router.get("/find-products-ready-to-print", productsReadytoPrint);
export { router };
