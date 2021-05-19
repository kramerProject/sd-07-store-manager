const express = require('express');
const { salesController } = require('../controllers');

const salesRouter = express.Router();

salesRouter.route('/')
  .get(salesController.getAll)
  .post(salesController.create);

salesRouter.route('/:id')
  .get(salesController.getById)
  .put(salesController.update)
  .delete(salesController.exclude);

salesRouter.use(salesController.errorMiddleware);

module.exports = salesRouter;
