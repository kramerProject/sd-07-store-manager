const { Router } = require('express');

const ProductController = require('../Controller/ProductController');

const ProductRoute = Router();

ProductRoute
  
  .post('/',  (ProductController.createProduct));
/*
ProductController
  .get('/search', CrushController.searchCrush);
  
ProductController 
  .get('/:id', CrushController.getOneCrush)
  .put('/:id', CrushController.editCrush)
  .delete('/:id', CrushController.deleteCrush); 
  */
module.exports = ProductRoute;
