import express from "express";
import { AddCustomer } from "../controllers/customer.js";
import { findAllCustomer } from "../controllers/customer.js";
import { findProductsRelatedtoCustomer } from "../controllers/customer.js";
const router = express.Router();

router.post("/addcustomer", AddCustomer);
router.get("/find-customer", findAllCustomer);
router.post("/products", findProductsRelatedtoCustomer);

export default router;
