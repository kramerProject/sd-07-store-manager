const { Router } = require('express');
const midd = require('../helpers/middlewaresHelpers');

const code = require('../returnStatus/status.json');

const ProductService = require('../services/ProductService');

const middleware = midd();
const router = Router();

router.get('/', async (req, res) => {
  const products = await ProductService.getAll();

  res.status(code.Ok).json(products);

});

router.post('/', middleware, async (req, res) => {
  const { name, quantity } = req.body;
  
  try {
    const result = await ProductService.create(name, quantity);
    
    const _id = result.insertedId;
    res.status(code.Created).json({ _id , name, quantity });

  } catch (error) {
    res.status(code.Internal_Server_Error).json({ message: error});
  }
});

module.exports = router;