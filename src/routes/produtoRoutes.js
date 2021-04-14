const express = require('express');
const { validNewProduct } = require('../middlewares');
const produtoController =  require('../controllers/produtoController');

const router = express.Router();

router.get('/products', produtoController.getAll);
router.get('/products/:id', produtoController.getById);
router.delete('/products/:id', produtoController.deleteById);
router.use(validNewProduct.checkName);
router.use(validNewProduct.checkQuantity);
router.put('/products/:id',produtoController.update);
router.use(validNewProduct.checkExist);
router.post('/products', produtoController.createProduct);

module.exports = router;