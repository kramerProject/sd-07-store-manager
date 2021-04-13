var express = require('express');
var router = express.Router();
const Product = require('../controllers/productController');

router.route('/')
  .get(Product.findAll)
  .post(Product.create);

router.route('/:id')
  .get(Product.findById)
  .put(Product.update)
  .delete((req, res) => {
    const { id } = req.params;
    res.send(`Remove o produto de id ${id}`);
  });


module.exports = router;