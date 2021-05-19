const express = require('express');
const { salesModel } = require('../models');

const salesRouter = express.Router();

const SUCCESS = 200;
const FAIL = 500;

salesRouter.get('/', async (_req, res) => {
  try {
    const sales = await salesModel.getAll();
    res.status(SUCCESS).send(sales);
  } catch(error) {
    res.status(FAIL).send({ message: 'Erro ao procurar sales' });
  }
});

module.exports = salesRouter;
