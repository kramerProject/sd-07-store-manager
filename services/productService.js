const model = require('../models/productModel');

const createNewProduct = async (name, quantity) => {
  const { insertedId } = await model.createNewProduct(name, quantity);

  return {
    id: insertedId,
    name,
    quantity,
  };
};

const searchProduct = async (name) => {
  const result = await model.searchProduct(name);

  return result;
};

const getAllProducts = async () =>{
  const products = await model.getAllProducts();
  const objectArrayProducts = {products: [...products]};
  return objectArrayProducts;
};

const findByProductId = async (id) => await model.findByProductId(id);

module.exports = {
  createNewProduct,
  searchProduct,
  getAllProducts,
  findByProductId,
};
