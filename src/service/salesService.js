const { ObjectID } = require('bson');
const { salesModel, productsModel } = require('../models');
const { idOrQtdValidate, saleIdValidate } = require('../validations/sales');

const MIN_STOCK = 0;

const updateStock = async (salesInfo) => {
  for (sale of salesInfo) {
    const { productId, quantity } = sale;
    saleIdValidate(productId);
    const produc = await productsModel.getProductById(productId);
    const newStock = {
      name: produc.name,
      quantity: produc.quantity - quantity,
    };
    if(newStock.quantity > MIN_STOCK)
      throw new Error('Such amount is not permitted to sell');
    await productsModel.updateProduct(productId, newStock.name, newStock.quantity);
  }
};

const creatSales = async (saleInfo) => {
  saleInfo.map((element) => idOrQtdValidate(element.productId, element.quantity));
  const createdSale = await salesModel.creatSale( saleInfo);
  return createdSale;
};

const getSales = async () => {
  const salesListed = await salesModel.getAllSales();
  if (salesListed.length < 1) throw new Error('Sale not found');
  return {
    sales: salesListed,
  };
};

const getSaleById = async (id) => {
  if(!ObjectID.isValid(id)) throw new Error('Sale not found');
  const saleById = await salesModel.getSaleById(id) || [];
  if (Object.keys(saleById).length < 1) throw new Error('Sale not found');
  return {
    sales: saleById,
  };
};

const updateSale = async (id, salesInfo) => {
  salesInfo.map((element) => idOrQtdValidate(element.productId, element.quantity));
  const updatedSale = await salesModel.updateSale(id, salesInfo) || [];
  return updatedSale;
};

const deleteSale = async (id) => {
  saleIdValidate(id);
  const deletedSale = await salesModel.deleteSale(id);
  return deletedSale.result[0];
};

module.exports = {
  creatSales,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
};
