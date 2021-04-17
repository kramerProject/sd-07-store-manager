const express = require('express');
const router = express.Router();

const SalesService = require('../services/SalesService');
const SalesModel = require('../models/SalesModel');
const SalesSchema = require('../schemas/SalesSchema');
const ApiStatusCode = require('../enums/ApiStatusCode');

const { validateQuantity,
  validateSalesExistance,
  errors } = require('../middlewares/SalesMiddleWare');

const rescue = require('express-rescue');

router.post('/sales', validateQuantity, async (req, res) => {
  const sales = req.body;
  
  try {
    const result = await SalesService.createSale(sales);
    return res.status(ApiStatusCode.SUCCESS).json(result);
  } catch (error) {
    return res.status(ApiStatusCode.UNAUTHORIZED).json(error.message);
  }
});

router.get('/sales', async (req, res) => {
  try {
    const result = await SalesService.getSales();
    return res.status(ApiStatusCode.SUCCESS).json(result);
  } catch (error) {
    return res.status(ApiStatusCode.UNAUTHORIZED).json(error.message);
  }
});

router.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const code = 'not_found';
  
  try {
    const result = await SalesService.getSalesById(id);
    return res.status(ApiStatusCode.SUCCESS).json(result);
  } catch (error) {
    return res.status(ApiStatusCode.NOT_FOUND)
      .json({ err: { code, message: errors.SALE_NOTFOUND}});
  }
});

router.put('/sales/:id', validateQuantity, async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  
  try {
    const result = await SalesModel.updateSale(id, sales);
    return res.status(ApiStatusCode.SUCCESS).json(result);
  } catch (error) {
    return res.status(ApiStatusCode.NOT_FOUND)
      .json({ err: { code, message: errors.SALE_NOTFOUND}});
  }
});

router.delete('/sales/:id', validateSalesExistance, async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await SalesService.deleteSales(id);
    return res.status(ApiStatusCode.SUCCESS).json(result);
  } catch (error) {
    return res.status(ApiStatusCode.WRONG_PRODUCT_FORMAT)
      .json(SalesSchema.errors.WRONG_ID_FORMAT);
  }
});


module.exports = router;