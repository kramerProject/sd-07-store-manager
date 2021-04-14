const express = require('express');
const router = express.Router();

const SalesService = require('../services/SalesService');
const { validateQuantity } = require('../middlewares/SalesMiddleWare');

const rescue = require('express-rescue');

router.post('/sales', validateQuantity, async (req, res) => {
  const sales = req.body;
  
  try {
    const result = await SalesService.createSale(sales);
    return res.status(201).json(result);
  } catch (error) {
    
    return res.status(401).json(error.message);
  }
});



module.exports = router;