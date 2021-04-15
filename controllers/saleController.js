const { Router } = require('express');
const saleService = require('../services/saleService');
const { UNPROCESSABLE_ENTITY, NOT_FOUND , OK } = require('../helpers/status');
const { validateSaleMiddleware } = require('../middlewares');
const saleRouter = new Router();

saleRouter.post('/', validateSaleMiddleware, async (req, res) => {
  try {
    const sales = req.body;
    const registeredSales = await saleService.registerSale(sales);
    res.status(OK).json(registeredSales);
  } catch (err) {
    throw new Error(err);
  }
});

saleRouter.get('/', async (_req, res) => {
  try {
    const salesData = await saleService.getAll();
    res.status(OK).json({ sales: salesData });
  } catch (err) {
    throw new Error(err);
  }
});

saleRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const saleData = await saleService.getById(id);
    if (!saleData) {
      return res.status(NOT_FOUND).json({
        err: {
          code: 'not_found',
          message: 'Sale not found',
        }
      });
    }
    res.status(OK).json(saleData);
  } catch (err) {
    throw new Error(err);
  }
});

saleRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await saleService.getById(id);
    if (!exists) return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    });
    await saleService.removeSale(id);
    res.status(OK).json(exists);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = saleRouter;
