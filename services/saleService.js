const sale = require('../models/saleModel');
const { ObjectId } = require('mongodb');

const createSale = async (products) => {
  newSale = await sale.create(products);

  return newSale;
};

const getAllSale = async () => {
  const list = await sale.getAll();

  return  list;

};

const getOneSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const list = await sale.getById(id);
  if (!list) return null;
  
  return  list;
  
};
/*
const updateProduct = async (id, name, quantity) => {

  const objProduct = await product.getById(id);
  if(!objProduct) {
    return null;
  }

  const productUpdate = await product.update({id, name, quantity});

  return productUpdate;
};

const deleteOneProduct = async (id) => {

  const productDeleted = await product.exclude(id);
  
  return  productDeleted;
};

*/
module.exports = {
  createSale,
  getAllSale,
  getOneSale,
  //updateProduct,
  //deleteOneProduct
};