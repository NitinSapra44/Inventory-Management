import mongoose from "mongoose";
import transactionSchema from "../models/transaction.js";
import productSchema from "../models/product.js";

const Transaction = mongoose.model("Transaction", transactionSchema);
const Product = mongoose.model("product", productSchema);

async function createTransaction(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  console.log(req.body);
  const { productId, type, quantity } = req.body;
  try {
    // Step 1: Save the transaction
    const transaction = await Transaction.create(
      [
        {
          productId,
          type,
          quantity,
        },
      ],
      { session }
    );

    // Step 2: Update the product's quantity
    const update =
      type === "print"
        ? { $inc: { quantity: quantity } }
        : { $inc: { quantity: -quantity } };

    const product = await Product.findByIdAndUpdate(productId, update, {
      new: true,
      session,
    });

    await session.commitTransaction();
    session.endSession();
    res.status(202).json(product);
    // return { transaction: transaction[0], updatedProduct: product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

async function dayBook(req, res) {
  const { startDate, endDate } = req.body;
  console.log({ startDate, endDate });
  const transactions = await Transaction.find({
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  }).populate("productId"); // to get partyName, type, etc.

  res.json({ transactions });
}

export default createTransaction;
export { dayBook };
