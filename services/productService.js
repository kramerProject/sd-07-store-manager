const model = require('../models/productModel');

const createNewProduct = async (name, quantity) => {
  const { insertedId } = await model.createNewProduct(name, quantity);

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const searchProduct = async (name) => await model.searchProduct(name);

const getAllProducts = async () => {
  const products = await model.getAllProducts();
  const objectArrayProducts = {products: [...products]};
  return objectArrayProducts;
};

const findByProductId = async (id) => await model.findByProductId(id);

const updateProduct = async (id, nameProduct, quantityProduct) =>
  await model.updateProduct(id, nameProduct, quantityProduct);

module.exports = {
  createNewProduct,
  searchProduct,
  getAllProducts,
  findByProductId,
  updateProduct,
};
