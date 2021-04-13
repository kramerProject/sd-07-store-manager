const express = require('express');

const salesModel = require('../model/salesModel');
const salesServices = require('../services/salesServices');
const { validateSales, verifyStock } = require('../middlewares');

const codesHTTP = require('../schemas/codesHTTP');

const router = express.Router();

router.post('/', validateSales, verifyStock, async (req, res) => {
  try {
    await salesServices.subtractProduct(req.body);
    const newSale = await salesModel.addSale(req.body);
    return res.status(codesHTTP.ok).json(newSale);

  } catch (error) {
    return res.status(codesHTTP.serverError).json({ message: 'Algo deu errado' });
  }

});

router.get('/', async (_req, res) => {
  try {
    const sales = await salesModel.getAll();
    if (sales) return res.status(codesHTTP.ok).json({ sales });
  } catch (error) {
    return res.status(codesHTTP.serverError).json({ message: 'Algo deu errado' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await salesModel.getById(id);
    if (sale) return res.status(codesHTTP.ok).json(sale);

  } catch (error) {
    return res.status(codesHTTP.badRequest).json(
      {
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }
      }
    );
  }
});

router.put('/:id', validateSales, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSale = await salesModel.updateSale(id, req.body);
    return res.status(codesHTTP.ok).json(updatedSale);
    
  } catch (error) {
    return res.status(codesHTTP.serverError).json({ message: 'Algo deu errado' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSale = await salesModel.deleteSale(id);
    await salesServices.sumProduct(deletedSale.itensSold);
    return res.status(codesHTTP.ok).json(deletedSale);
  } catch (error) {
    return res.status(codesHTTP.unprocessable).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }
});

module.exports = router;
