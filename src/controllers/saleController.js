const saleModel = require('../models/saleModel');

const services = require('../services/saleServices');

const {
  statusHttp,
} = services;

const { C_200, C_422, C_500 } = statusHttp;

const getAllSales = async (req, res) => {
  try {
    const result = await saleModel.getAllSales();
    return res
      .status(C_200)
      .send([{ result }]);
  } catch (error) {
    console.error(error);
    return res
      .status(C_500)
      .json({ message: error.message });
  }
};

const createSale = async (req, res) => {
  const sold = req.body;
  try {
    const result = await services.create(sold);
    console.log('console result controller', result);
    if (result.isError)
      return res
        .status(C_422)
        .send(result);
    return res
      .status(C_200)
      .send(result);
  } catch (error) {
    console.error(error);
    return res
      .status(C_500)
      .json({ message: error.message });
  }
};

module.exports = {
  getAllSales,
  createSale,
};