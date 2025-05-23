const Transaction = require("../models/Transactions");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.createTransaction = async (req, res) => {};
exports.updateTransaction = async (req, res) => {};
exports.deleteTransaction = async (req, res) => {};
