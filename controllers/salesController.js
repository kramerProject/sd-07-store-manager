const { Router } = require('express');
const salesService = require('../service/salesService');
const midd = require('../helpers');
const router = Router();
const middlewares = require('../middlewares');

const STATUS = 200;
const ERROR = 500;
const CREATE = 201;
const NOTEXIT = 422;

const useMidd = midd();

router.get('/', async (req, res) => {
  const sale = await salesService.getAll();
  res.status(STATUS).json({sales: sale});
});

router.get('/:id',middlewares.tokenNotFound, async (req, res) => {
  try {
    const saleId = await salesService.findByid(req.params.id);
    res.status(STATUS).json(saleId);
  } catch (error) {
    res.status(ERROR).json({message: error.message});
  }
});

router.post('/', middlewares.tokenSales, middlewares.tokenIsvalid, async (req, res) => {
  const sales = req.body;
  const salesSalv = await salesService.create(sales);
  const _id = salesSalv.insertedId;
  res.status(STATUS).json({ _id, itensSold: sales });
});

router.delete('/:id', middlewares.tokenDelete,   async (req, res) => {
  const { id } = req.params;
  const deletesale = await salesService.deleteSales(id);
  res.status(STATUS).json(deletesale);
});



module.exports = router;
