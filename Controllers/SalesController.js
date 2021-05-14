const SalesModel = require('../Models/SalesModel');
const SaleService = require('../Services/SaleService');
const status = require('../helpers/statusCode');


const addNewSale = async (req, res) => {
  const { body } = req;
  const itemsInBody = req.body;
  const result = await SaleService.getProductById(itemsInBody[0].productId);
  if (result.quantity < itemsInBody[0].quantity) {
    return res.status(status.notFound).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      }
    });
  }
  const moreAmount = result.quantity - itemsInBody[0].quantity;
  await SaleService.updateProductById(result._id, result.name, moreAmount);
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

const updateSaleById = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const isSale = await SalesModel.getSaleById(id);
  if (!isSale) {
    return res.status(status.unprocess).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  const saleUpdated = await SalesModel.updateSaleById(id, itensSold);
  return res.status(status.ok).json(saleUpdated);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesModel.getSaleById(id);
  if (!sale) {
    return res.status(status.unprocess).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }
  const result = await SaleService.getProductById(sale.itensSold[0].productId);
  const moreAmount = result.quantity + sale.itensSold[0].quantity;
  await SaleService.updateProductById(result._id, result.name, moreAmount);
  const deleted = await SalesModel.deleteSaleById(id);
  return res.status(status.ok).json(deleted);
};

module.exports = {
  addNewSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};
