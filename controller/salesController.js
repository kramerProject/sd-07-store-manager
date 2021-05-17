const SalesModel = require('../models/salesModel');

const SUCCESS = 200;
// const CREATED = 201;
// const BAD_REQUEST = 400;
// const NOT_FOUND = 404;
// const INVALID_DATA = 422;

const createSaleController = async (req, res) => {
  try{
    const itemsSold = req.body;
    const sale = await SalesModel.createSale(itemsSold);
    return res.status(SUCCESS).send(sale);
  } catch(err) {
    console.error(err);
  }
};

module.exports = {
  createSaleController,
};
