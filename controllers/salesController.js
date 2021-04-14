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

module.exports = {
  createSales,
};