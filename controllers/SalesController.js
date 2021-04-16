const express = require('express');
const router = express.Router();
const salesService = require('../services/SalesService');
const {
  saleProductQuantityVerify,
  saleProductQuantityTypeVerify,
  saleVerify,
} = require('../middlewares/SalesMiddlewares');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;

router.post('/', saleVerify, async (req, res) => {
  const { body: itens } = req;
  const sale = await salesService.create(itens);
  res.status(OK).json(sale);
});


router.get('/:id', async (req, res) => {
  const  id  = req.params.id;
  try {
    const sale = await salesService.getById(id);
    return res.status(OK).json(sale);    
  } catch (error) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });    
  }
});

router.get('/', async (_req, res) => {
  const sales = await salesService.getAll();
  res.status(OK).json({ sales });
});

router.put('/:id', saleVerify, async (req, res) =>{
  const { body: itens } = req;
  const { id } = req.params;
  const updatedSale = await salesService.update(id, itens);
  if (updatedSale) return res.status(OK).json({ _id: id, itensSold: itens });
  return res.status(NOT_FOUND).json({ message: 'Venda não encontrada' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesService.getById(id);
    const deletedSale = await salesService.remove(id);
    if (deletedSale) return res.status(OK).json(sale);
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  } catch (error) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });    
  }
});

module.exports = router;
