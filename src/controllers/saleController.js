const saleModel = require('../models/saleModel');

const saleServices = require('../services/saleServices');

const { C_200, C_404, C_422, C_500 } = saleServices.statusHttp;

const getAllSales = async (req, res) => {
  try {
    const sales = await saleModel.getAllSales();
    return res
      .status(C_200)
      .send([{ sales }]);
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
    const sales = await saleServices.create(sold);
    if (sales.isError)
      return res
        .status(C_422)
        .send(sales);
    return res
      .status(C_200)
      .send(sales);
  } catch (error) {
    console.error(error);
    return res
      .status(C_500)
      .json({ message: error.message });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await saleServices.getSaleById(id);
    return res
      .status(C_200)
      .send([{ sales }]);
  } catch (error) {
    console.error(error);
    return res
      .status(C_404)
      .json({ message: error.message });
  }
};

module.exports = {
  getAllSales,
  createSale,
  getSaleById,
};