const { Router } = require('express');
const service = require('../services/salesService');

const sales = Router();

const statusCode = {
  OK: 200,
  CREATED: 201,
};

sales.get('/', async (_req, res) => {
  const sales = await service.getSales();
  return res.status(statusCode.OK).json({ sales });
});

sales.post('/', async (req, res, next) => {
  try {
    const savedSale = await service.newSale(req.body);
    return res.status(statusCode.OK).json(savedSale);
  } catch(e) {
    next(e);
  }
});

sales.get('/:id', async (req, res, next) => {
  try {
    const sale = await service.getSaleById(req.params.id);
    return res.status(statusCode.OK).json(sale);
  } catch (e) {
    next(e);
  }
});

sales.put('/:id', async (req, res, next) => {
  try {
    const updatedSale = await service.updateSale(req.params.id, req.body);
    return res.status(statusCode.OK).json(updatedSale);
  } catch (e) {
    next(e);
  }
});

sales.delete('/:id', async (req, res, next) => {
  try {
    const deletedSale = await service.deleteSale(req.params.id);
    return res.status(statusCode.OK).json(deletedSale);
  } catch (e) {
    next(e);
  }
});

module.exports = sales;
