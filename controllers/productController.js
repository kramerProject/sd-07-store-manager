const { Router } = require('express');
const productService = require('../service/productService');
const midd = require('../helpers');
const router = Router();
const middTest = require('../middlewares/tokenId');
const middlewares = require('../middlewares');
const { route } = require('./salesController');
const STATUS = 200;
const ERROR = 500;
const CREATE = 201;
const NOTEXIT = 422;

const useMidd = midd();

router.get('/', async (req, res) => {
  const product = await productService.getAll();
  res.status(STATUS).json({products: product});
});

router.get('/:id', middlewares.tokenId, async (req, res) => {
  try {
    const productId = await productService.findByid(req.params.id);
    console.log('no controller', productId);
    res.status(STATUS).json(productId);
  } catch (error) {
    res.status(ERROR).json({message: error.message});
  }
});

router.post('/',
  middlewares.tokenName,
  middlewares.tokenExists,
  middlewares.tokenQuantity,
  async (req, res) => {
    const { name, quantity } = req.body;
    const productSalv = await productService.create(name, quantity);
    const _id = productSalv.insertedId;
    res.status(CREATE).json({ _id, name, quantity });
  });

router.put('/:id',
  middlewares.tokenName,
  middlewares.tokenQuantity,
  middlewares.tokenExists,

  async (req, res) => {
    const { id } = req.params;
    console.log('estou no service', id);
    const { name, quantity } = req.body;
    const teste = await productService.productAtual(id, name, quantity);
    console.log(teste);
    // const productAtual = await productService.findByName(name);
    res.status(STATUS).json({_id: id, name, quantity});

  });

router.delete('/:id', middlewares.tokenId, async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await productService.deleteProduct(id);
  res.status(STATUS).json(deleteProduct);
});

module.exports = router;
