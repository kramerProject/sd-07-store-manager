const salesModel = require('../models/salesModel');
const salesServices = require('../services/salesServices');

const {
  STATUS_200,
  STATUS_404,
  STATUS_422,
  NOT_FOUND,
  CODE_ERROR } = require('../valuesGlobal');

const rescue = require('express-rescue');


const getAllSales = rescue(async (req, res) => {
  try {
    const sales = await salesModel.getAll();
    res.status(STATUS_200).json({ sales: sales });
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
});

const getSaleById = rescue(async (req, res) => {
  try {
    const { id } = req.params;

    const result = await salesModel.getById(id);

    if (!result) {
      return res.status(STATUS_404).send({ err: {
        code: NOT_FOUND,
        message: 'Sale not found'}});
    }

    res.status(STATUS_200).json(result);
  } catch (err) {
    console.error(err.message);
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
    await salesServices.normalize();

    res.status(STATUS_200).json(newSale);
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
});

const updateSale = rescue(async (req, res) => {
  try {
    const { body: itensSold } = req;
    const { id } = req.params;

    const sale = await salesServices.updateSale(id, itensSold);

    if (sale.cod_err) {
      return res.status(STATUS_422).send({ err: {
        code: CODE_ERROR,
        message: sale.message}});
    }

    res.status(STATUS_200).json(sale);
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
});

const deleteSale = rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesModel.getById(id);

    if (!result) {
      return res.status(STATUS_422).send({ err: {
        code: CODE_ERROR,
        message: 'Wrong sale ID format'}});
    }

    await salesServices.normalizeDelete();

    await salesModel.exclude(req.params.id);

    res.status(STATUS_200).end();
  } catch (err) {

    console.error(err.message);
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
