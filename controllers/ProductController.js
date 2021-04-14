const { Router } = require('express');

const code = require('../returnStatus/status.json');

const ProductService = require('../services/ProductService');

const router = Router();

router.get('/', async (req, res) => {
  const products = await ProductService.getAll();
  console.log('entrei');
  res.status(code.Ok).json(products);
});

module.exports = router;