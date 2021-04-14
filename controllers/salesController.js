const SalesModel = require('../models/salesModel');
const Service = require('../service/service');
const status = require('../utils/status');

const addSales = async (req, res) => {
  const { body } = req;
  const itemSold = req.body;
  const product = await Service.getProductById(itemSold[0].productId);
  if (product.quantity < itemSold[0].quantity) {
    return res.status(status.notFound).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      }
    });
  }
  const newQuantity = product.quantity - itemSold[0].quantity;
  await Service.updateProduct(product._id, product.name, newQuantity);
  const newSale = await SalesModel.addSale(body);
  return res.status(status.ok).json(newSale);
};

const getAllSales = async (req, res) => {
  const sales = await SalesModel.getAllSales();
  return res.status(status.ok).json({ sales });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesModel.getSaleById(id);
  if (!sale) {
    return res.status(status.notFound).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }
  res.status(status.ok).json(sale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const isThereSale = await SalesModel.getSaleById(id);
  if (!isThereSale) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  const saleUpdated = await SalesModel.updateSale(id, itensSold);
  return res.status(status.ok).json(saleUpdated);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesModel.getSaleById(id);
  if (!sale) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }
  const product = await Service.getProductById(sale.itensSold[0].productId);
  const newQuantity = product.quantity + sale.itensSold[0].quantity;
  await Service.updateProduct(product._id, product.name, newQuantity);
  const saleDeleted = await SalesModel.deleteSale(id);
  return res.status(status.ok).json(saleDeleted);
};

module.exports = {
  addSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
