const sale = require('../models/saleModel');

const createSale = async (products) => {
  newSale = await sale.create(products);

  return newSale;
};
/*
const getAllProduct = async () => {

  const list = await product.getAll();
  
  return  {products: list};
};

const getOneProduct = async (id) => {

  const list = await product.getById(id);
  
  return  list;
};

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
  //getAllProduct,
  //getOneProduct,
  //updateProduct,
  //deleteOneProduct
};