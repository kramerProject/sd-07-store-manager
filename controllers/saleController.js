const connect = require('../db');
const status = require('http-status');
const sale = require('../services/salesService');

const create = async (req, res) => {
  try {
    const sales = req.body;
    const result = await sale.insertSale(sales);
    console.log(result);
    return res.status(status.OK).json(result[0]);
  } catch (error) {
    
  }
};

module.exports = {
  create,
};