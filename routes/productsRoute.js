const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const {
  nameValidate,
  quantityValidate,
  productExistsValidate,
  idValidate,
} = require('../middlewares');

const router = express.Router();

router.get('/products/:id', idValidate, rescue(productsController.getById));
router.get('/products', rescue(productsController.getAll));
router.delete('/products/:id', idValidate, rescue(productsController.deleteProduct));
router.use(nameValidate);
router.use(quantityValidate);
router.put('/products/:id', idValidate, rescue(productsController.update));
router.use(productExistsValidate);
router.post('/products', rescue(productsController.create));

module.exports = router;
