const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const validators = require('./validators');
const search = require('./search');
const { ObjectId } = require('mongodb');
const Status = require('../middleWare/Status');
const validationsProducts = require('../middleWare/validationsProducts');
const connectionProject = require('./connectionProject');
app.use(express.json());
const zero = 0;

const salesCreate = async (req, res, next) => {
  const data = req.body;
  const qtdIsValid =
    data.filter((e) => e.quantity <= zero).length <= zero &&
    data.filter((e) => typeof e.quantity === 'string').length <= zero;
  if (!qtdIsValid) {
    return res.status(Status.Unprocessable_Entity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  const collection = await validators.getAllProject();
  let valido = zero;
  data.map((data) => {
    collection.map((produtos) => {
      if (data.productId.toString() === produtos._id.toString()) {
        valido += 1;
      }
    });
  });
  if (valido !== data.length) {
    return res.status(Status.Unprocessable_Entity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  const salesList = await validators.insertSales(data);

  return res.status(Status.OK).json(salesList);
};

const salesList = async (req, res) => {
  const xablau = await search.getAllSales();
  return res.status(Status.OK).json(xablau);
};

const salesListId = async (req, res) => {
  const { id } = req.params;
  const xablau = await validators.getSallesById(id);
  if (xablau === null)
    return res.status(Status.Not_Found).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
};

const updateSalesId = async (req, res) => {
  const { id } = req.params;
  const { quantity, productId } = req.body[0];
  if (!quantity || quantity < 1 || typeof quantity !== 'number') {
    return res.status(Status.Unprocessable_Entity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  const response = await validators.updateSalesId(id, quantity, productId);
  if (response === null)
    return res.status(Status.Unprocessable_Entity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  return res.status(Status.OK).json(response);
};

const deleteSalesId = async (req, res) => {
  const { id } = req.params;
  console.log('id', id);
  // const xablau = await validators.getSallesById(id);
  // console.log('xablau', xablau);
  // if (xablau === null) {
  //   return res.status(Status.Unprocessable_Entity).json({
  //     err: {
  //       code: 'invalid_data',
  //       message: 'Wrong sale ID format',
  //     },
  //   });
  // }
  const response = await validators.deleteSalesId(id);
  console.log('response', response);
  if (response === null) {
    return res.status(Status.Unprocessable_Entity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
  console.log('response', response);
  return res.status(Status.OK).json({ message: 'deletado' });
};

module.exports = {
  salesCreate,
  salesList,
  salesListId,
  updateSalesId,
  deleteSalesId,
};
