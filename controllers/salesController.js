const salesServices = require('../services/salesServices');
const salesModel = require('../models/salesModel');
const createSales = async (req, res) => {
  try {
    const sales = await salesServices.createSales(req.body);
    const { http, message } = sales;
    return res.status(http).json(message);
  } catch (error) {
    console.error(error);
    return res.status(serverError).json({ message: error.message });
  }
};

const getAllSales = async (req, res) => {
  try {
    const results = await salesModel.getAllSales();
    return res.status(200).send({sales: results});
  } catch (error) {
    console.log(error);
    return res.status(serverError).json({ message: error.message });
  }
};

module.exports = {
  createSales,
  getAllSales
};