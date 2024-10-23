const sequelize = require('sequelize');
const Transaction = require('../models/transaction');

exports.addTransaction = async (req, res) => {
  const { type, category, amount, date, description } = req.body;
  const userId = req.user.id; 
  
  if (!type || !category || !amount || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const transaction = await Transaction.create({
      type,
      category,
      amount,
      date,
      description,
      userId 
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Transaction creation error:', error); 
    res.status(500).json({ error: 'Error creating transaction' });
  }
};


exports.getTransactions = async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;
    const transactions = await Transaction.findAll({
      where: { userId },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json(transactions);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Error retrieving transactions' });
  }
};

exports.getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving transaction' });
  }
};

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    transaction.update({ type, category, amount, date, description });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error updating transaction' });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    transaction.destroy();
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting transaction' });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const income = await Transaction.sum('amount', { where: { type: 'income' } });
    const expense = await Transaction.sum('amount', { where: { type: 'expense' } });
    const balance = income - expense;
    res.json({ totalIncome: income, totalExpense: expense, balance });
  } catch (error) {
    res.status(500).json({ error: 'Error generating summary' });
  }
};

exports.getMonthlyReport = async (req, res) => {
  const { month, year } = req.query;
  const userId = req.user.id;
  
  try {
    const transactions = await Transaction.findAll({
      where: sequelize.and(
        sequelize.where(sequelize.fn('strftime', '%m', sequelize.col('date')), month),
        sequelize.where(sequelize.fn('strftime', '%Y', sequelize.col('date')), year),
        { userId }
      ),
    });

    const report = transactions.reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) acc[category] = 0;
      acc[category] += transaction.amount;
      return acc;
    }, {});

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Error generating report' });
  }
};
