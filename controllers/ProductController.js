const express = require('express');
const router = express.Router();
const productService = require('../services/ProductService');
const {
  productNameVerify,
  productExists,
  productQuantityVerify,
  productQuantityTypeVerify,
} = require('../middlewares/ProductMiddleware');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

router.post('/',
  productNameVerify,
  productQuantityTypeVerify,
  productQuantityVerify,
  productExists,
  async (req, res) => {
    const { body } = req;
    const newProduct = await productService.create(body);
    res.status(CREATED).json(newProduct);
  }
);

router.get('/:id', async (req, res) => {
  const  id  = req.params.id;
  try {
    const product = await productService.getById(id);
    return res.status(OK).json(product);    
  } catch (error) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });    
  }
});

router.get('/', async (_req, res) => {
  const productList = await productService.getAll();
  res.status(OK).json({ products: productList });
});


module.exports = router;
