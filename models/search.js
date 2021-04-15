const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const validators = require('./validators');
const { ObjectId } = require('mongodb');
const Status = require('../middleWare/Status');

const getAll = async (req, res, next) => {
  const collection = await validators.getAllProject();
  return res.status(Status.OK).send({ products: collection });
};

const getAllSales = async () => {
  const array = await validators.getAllSales();
  const xablauFormatado = { sales: array };
  return xablauFormatado;
};

const getById = async (req, res) => {
  const { id } = req.params;
  const collection = await validators.getById(id);
  if (!collection) {
    return res.status(Status.Unprocessable_Entity).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  return res.status(Status.OK).send(collection[0]);
};

module.exports = {
  getAll,
  getById,
  getAllSales,
};
