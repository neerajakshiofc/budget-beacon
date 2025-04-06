const express = require('express');
const router = express.Router(); // ✅ DEFINE ROUTER
const yahooFinance = require('yahoo-finance2').default;

// Route: GET /api/stock-suggestions?symbol=TCS
router.get('/api/stock-suggestions', async (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ message: 'Stock symbol is required' });
  }

  try {
    const data = await yahooFinance.quote(symbol);
    if (!data || !data.regularMarketPrice) {
      return res.status(404).json({ message: 'Stock data not found for the symbol.' });
    }

    const stockData = {
      symbol: data.symbol,
      latestPrice: data.regularMarketPrice,
      change: data.regularMarketChangePercent,
    };

    res.json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
