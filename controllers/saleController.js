const express = require('express');

const router = express.Router();

const service = require('../services/saleService');

const { SUCCESS, CREATE } = require('../messages/messageCodes');

const saleMiddleware = require('../middlewares/saleMiddleware');
const idMiddleware = require('../middlewares/idMiddleware');

router.post('/sales', saleMiddleware, async (request, response) => {

  const sales = request.body;

  const sale = await service.createNewSale(sales);

  return response.status(SUCCESS).json(sale);
});


router.get('/sales', async (_request, response) => {
  response.status(SUCCESS).json(await service.getAllSales());
});

router.get('/sales/:id', idMiddleware, async (request, response) => {
  const { id } = request.params;
  response.status(SUCCESS).json(await service.findBySaleId(id));
});

/*
router.put('/sales/:id', productMiddleware, idMiddleware,
  async (request, response) => {
    const { id } = request.params;
    const { name, quantity} = request.body;
    response.status(SUCCESS).json(await service.updateProduct(id, name, quantity));
  });

router.delete('/sales/:id', idMiddleware, async (request, response) => {
  const { id } = request.params;

  response.status(SUCCESS).json(await service.deleteProduct(id));
});
*/

module.exports = router;
