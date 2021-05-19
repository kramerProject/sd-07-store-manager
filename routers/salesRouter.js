const express = require('express');
const { salesController } = require('../controllers');

const salesRouter = express.Router();

salesRouter.route('/')
  .get(salesController.getAll)
  .post(salesController.create);

salesRouter.use(salesController.errorMiddleware);

module.exports = salesRouter;
