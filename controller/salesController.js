const SalesModel = require('../model/salesModel');
const rescue = require('express-rescue');

const CREATED = 201;
const OK = 200;
const UNPROCESSABLE_ENTITY = 422;

const insertSale = rescue(async (req, res) => {
  
  const saleArray = req.body;
  const newSale = await SalesModel.insert(saleArray);

  return res.status(OK).json(newSale.ops[0]);
});

module.exports = {
  insertSale,
};
