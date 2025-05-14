import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { router as UserRouter } from "./Routes/user.js";
import { router as ProductRouter } from "./Routes/product.js";
import { router as TransactionRouter } from "./Routes/transaction.js";
import CustomerRouter from "./Routes/customer.js";
import cookieParser from "cookie-parser";

//Directory Settings
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

mongoose
  .connect(process.env.url)
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => console.error(err));

//Important Middlewares
app.use(
  cors({
    origin: "https://inventory-management-frontend-eugc.onrender.com", // Your frontend URL
    credentials: true, // If using cookies/auth headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/user", UserRouter);
app.use("/product", ProductRouter);
app.use("/", TransactionRouter);
app.use("/customer", CustomerRouter);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
