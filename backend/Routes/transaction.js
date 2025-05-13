import express from "express";
import createTransaction from "../controllers/transaction.js";
import { dayBook } from "../controllers/transaction.js";
const router = express.Router();

router.post("/transaction", createTransaction);
router.post("/daybook", dayBook);

export { router };
