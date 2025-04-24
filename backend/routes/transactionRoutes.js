const express = require("express");
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

// Get all transactions
router.get("/", getTransactions);

// Create a new transaction
router.post("/", createTransaction);

// Update a transaction
router.put("/:id", updateTransaction);

// Delete a transaction
router.delete("/:id", deleteTransaction);

module.exports = router;
