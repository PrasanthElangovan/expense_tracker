const express = require('express');
const {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
  getMonthlyReport,
} = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/transactions', authMiddleware, addTransaction);
router.get('/transactions', authMiddleware, getTransactions);
router.get('/transactions/:id', authMiddleware, getTransactionById);
router.put('/transactions/:id', authMiddleware, updateTransaction);
router.delete('/transactions/:id', authMiddleware, deleteTransaction);
router.get('/summary', authMiddleware, getSummary);
router.get('/report', authMiddleware, getMonthlyReport);

module.exports = router;
