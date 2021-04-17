const saleModel = require('../models/SaleModel');
const productService = require('./ProductService');
const errorMessage = require('../../helpers/errorMessages');

const validatorIdAndQuanity = (productId, quantity) => {
  const ONE = 1; 
  if (typeof quantity !== 'number' || quantity < ONE) {      
    throw new Error(errorMessage.wrongProductIdOrInvalidQuantity);
  }
  productService.getProductById(productId);
};


// const getProductByName = async (name) => {
//   const productExist = await productModel.getProductByName(name);
//   if (productExist) {
//     throw new Error(errorMessage.productAlreadyExists);
//   }
// };

const validatorSaleExists = (sale) => {
  if(!sale) {
    throw new Error(errorMessage.idSaleNonExistent);
  }
};

const getAllSales = async () => {
  const allSales = await saleModel.getAllSales();
  return allSales;
};

const getSaleById = async (id) => {
  const saleById = await saleModel.getSaleById(id);
  validatorSaleExists(saleById);
  return saleById;
};

const createSale = async (sales) => {

  sales.forEach(sale => {
    const { productId, quantity } = sale;
    validatorIdAndQuanity(productId, quantity);    
  });
  
  
  const newSales = await saleModel.createSale(sales);
  return newSales;
};

const updateSale = async (id, productId, quantity) => {
  //validatorNameAndQuanity(name, quantity);

  const updatedSale = await saleModel.updateSale(id, productId, quantity);
  return updatedSale;
};

const deleteSale = async (id) => {    
  const deletedSale = await saleModel.deleteSale(id);
  validatorSaleExists(deletedSale);
  return deletedSale;
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
};