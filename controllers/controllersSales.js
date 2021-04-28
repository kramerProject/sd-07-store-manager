const ModelSales = require('../models/modelSales');
const Services = require('../services/services');
const status = require('../utils/status');

const addNewSales = async (req, res) => {
  const { body } = req;
  const itemsInBody = req.body;
  const product = await Services.getProductById(itemsInBody[0].productId);
  if (product.quantity < itemsInBody[0].quantity) {
    return res.status(status.notFound).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      }
    });
  }
  const moreAmount = product.quantity - itemsInBody[0].quantity;
  await Services.updateProduct(product._id, product.name, moreAmount);
  const newSale = await ModelSales.addSale(body);
  return res.status(status.ok).json(newSale);
};

const getSales = async (req, res) => {
  const sales = await ModelSales.getSales();
  return res.status(status.ok).json({ sales });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await ModelSales.getSaleById(id);
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
  const isSale = await ModelSales.getSaleById(id);
  if (!isSale) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  const saleUpdated = await ModelSales.updateSale(id, itensSold);
  return res.status(status.ok).json(saleUpdated);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const sale = await ModelSales.getSaleById(id);
  if (!sale) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }
  const product = await Services.getProductById(sale.itensSold[0].productId);
  const moreAmount = product.quantity + sale.itensSold[0].quantity;
  await Services.updateProduct(product._id, product.name, moreAmount);
  const deleted = await ModelSales.deleteSale(id);
  return res.status(status.ok).json(deleted);
};

module.exports = {
  addNewSales,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
};
