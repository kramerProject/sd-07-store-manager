const salesModel = require('../models/salesModel');
const salesServices = require('../services/salesServices');

const {
  STATUS_200,
  STATUS_201,
  STATUS_204,
  STATUS_404,
  STATUS_422,
  CODE_ERROR } = require('../valuesGlobal');

const rescue = require('express-rescue');


const getAllSales = rescue(async (req, res) => {
  try {
    const sales = await salesModel.getAll();
    res.status(STATUS_200).json({ sales: sales });
  } catch (err) {
    throw new Error(err);
  }
});

const getSaleById = rescue(async (req, res) => {
  try {
    const { id } = req.params;

    const result = await salesModel.getById(id);

    if (!result) {
      return res.status(STATUS_422).send({ err: {
        code: CODE_ERROR,
        message: 'Wrong id format'}});
    }

    res.status(STATUS_200).json(result);
  } catch (err) {
    throw new Error(err);
  }
});

const addSale = rescue(async (req, res) => {
  try {
    const { body: itensSold } = req;
    const newSale = await salesServices.addSale(itensSold);

    if (newSale.cod_err) {
      return res.status(STATUS_422).send({ err: {
        code: CODE_ERROR,
        message: newSale.message}});
    }

    res.status(STATUS_200).json(newSale);
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
});

const updateSale = rescue(async (req, res) => {
  try {
    const { itensSold } = req.body;
    const { id } = req.params;

    const sale = await salesModel.update(id, itensSold);

    res.status(STATUS_200).json(sale);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteSale = rescue(async (req, res) => {
  try {
    await salesModel.exclude(req.params.id);

    res.status(STATUS_200).end();
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  updateSale,
  deleteSale,
};
