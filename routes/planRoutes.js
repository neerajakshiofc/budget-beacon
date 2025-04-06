// routes/planRoutes.js
const express = require('express');
const router = express.Router();

// Temporary in-memory store
let financialGoals = [
  {
    _id: '1',
    goal: 'Emergency Fund',
    targetAmount: 5000,
    currentAmount: 1000,
    deadline: '2025-12-31',
  },
];

// GET
router.get('/financial-goals', (req, res) => {
  res.json(financialGoals);
});

// POST
router.post('/financial-goals', (req, res) => {
  const { goal, targetAmount, currentAmount, deadline } = req.body;
  const newGoal = {
    _id: Date.now().toString(),
    goal,
    targetAmount,
    currentAmount,
    deadline,
  };
  financialGoals.push(newGoal);
  res.status(201).json(newGoal);
});

// DELETE
router.delete('/financial-goals/:id', (req, res) => {
  const { id } = req.params;
  financialGoals = financialGoals.filter(goal => goal._id !== id);
  res.json({ message: 'Goal deleted' });
});

module.exports = router;
