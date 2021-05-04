const Sale = require('../models/saleModel');
const saleService = require('../services/saleService');
const httpCodes = require('../helper/httpCodes');


const {
  SUCCESS,
  INVALID_DATA,
  INTERNAL_SERVER_ERROR } = httpCodes;

const getAllSales = async (req, res) => {
  try {
    const results = await Sale.getAllSales();
  
    return res.status(SUCCESS).json(results);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const newSale = async (req, res) => {
  const sales = req.body;

  const verifications = saleService.verifyEntries(sales);
  try {
    if (verifications) {
      throw Error(verifications);
    }
    const newSale = await Sale.newSale(sales);
    return res.status(SUCCESS).json(newSale);
  } catch (err) {
    return res.status(INVALID_DATA).json({
      err: {code: 'invalid_data', message: err.message }
    });
  }
};

module.exports = {
  getAllSales,
  newSale,
};