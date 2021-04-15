const { Router } = require('express');

const code = require('../returnStatus/status.json');

const SalesService = require('../services/SalesService');

const router = Router();

router.get('/', async (req, res) => {
  const sales = await SalesService.getAll();
  res.status(code.Ok).json(sales);
});

module.exports = router;