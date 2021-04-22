const sales = require('../services/salesService');
const codes = require('../services/codes');
const products = require('../services/productService');

const addSales = async (req, res) => {
  try {
    const { body } = req;
    const updateQuantity = await products.updateQuantity(body, 'sum');
    if (updateQuantity.err) return res.status(codes.notFound).json(updateQuantity);
    const result = await sales.addSales(body);
    if (result.err) return res.status(codes.unprocessableEntity).json(result);
    res.status(codes.SUCCESS).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await sales.getAll();
    return res.status(codes.SUCCESS).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sales.getById(id);
    if (result.err) return res.status(codes.notFound).json(result);
    res.status(codes.SUCCESS).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const updateSale = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    await products.updateQuantity(body, 'sum');
    const result = await sales.updateSale(id, body);
    if (result.err) return res.status(codes.unprocessableEntity).json(result);
    res.status(codes.SUCCESS).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sales.deleteSale(id);

    if (result.err) return res.status(codes.unprocessableEntity).json(result);
    await products.updateQuantity(result.itensSold, 'subtract');
    res.status(codes.SUCCESS).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addSales,
  getAll,
  getById,
  updateSale,
  deleteSale,
};
