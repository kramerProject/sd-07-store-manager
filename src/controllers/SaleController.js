const statusCode = require('../../helpers/HTTPStatus');
const errorMessages = require('../../helpers/errorMessages');
const saleService = require('../services/SaleService');

const invalidData = 'invalid_data';

const errorMessage = {
  'err': {
    code: invalidData,
    message: errorMessages.wrongProductIdOrInvalidQuantity
  }
};

const getAllSales = async (_req, res) => {
  try {
    const allSales = await saleService.getAllSales();  
    res.status(statusCode.SUCCESS).json({ sales: allSales });
  } catch (err) {
    errorMessage.err.message = err.message;
    res.status(statusCode.UNPROCESSABLE).json(errorMessage);  
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const saleById = await saleService.getSaleById(id);
    res.status(statusCode.SUCCESS).json(saleById);
  } catch (err) {
    errorMessage.err.code = 'not_found';
    errorMessage.err.message = 'Sale not found';
    res.status(statusCode.NOTFOUND).json(errorMessage);        
  }
};

const createSale = async (req, res) => {
  try {
    const sales = req.body;
    const newSales = await saleService.createSale(sales);
    res.status(statusCode.SUCCESS).json(newSales);
  } catch (err) {
    res.status(statusCode.UNPROCESSABLE).json(errorMessage);        
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    //const updatedProduct = await productService.updateProduct(id, name, quantity);
    res.status(statusCode.SUCCESS).json('teste');
  } catch (err) {    
    errorMessage.err.message = err.message;
    res.status(statusCode.UNPROCESSABLE).json(errorMessage);        
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await saleService.deleteSale(id);
    res.status(statusCode.SUCCESS).json(deletedSale);
  } catch (err) {
    errorMessage.err.code = invalidData;
    errorMessage.err.message = err.message;
    res.status(statusCode.UNPROCESSABLE).json(errorMessage);        
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
};