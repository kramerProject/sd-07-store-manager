const modelSales = require('../models/salesModel');
const validationSales = require('../services/saleService');

const OK = 200;
const INTERNAL_SERVER_ERROR = 500;

const insertSale = async (req, res) => {
  try {
    const arrayOfSales = req.body;
    const result = await validationSales.insertSale(arrayOfSales);

    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};


module.exports = {
  insertSale,
};

