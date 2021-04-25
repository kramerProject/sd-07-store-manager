const { get } = require('frisby');
const { httpStatusCode } = require('../../constants');
const {
  creatProduct,
  getAllProducts,
  deleteProduct
} = require('../models/productsModel');
const {
  nameValidator,
  quantityValidation,
  productIdValidation
} = require('../validations/products');

const PRODUC_DONT_EXISTS = 0;

const creatProductService = async (name, quantity) => {
  quantityValidation(quantity);
  nameValidator(name);
  let registredProduct = await getAllProducts();
  registredProduct = registredProduct.filter((product) => product.name === name);
  if (registredProduct.length > PRODUC_DONT_EXISTS) {
    throw new Error('Product already exists');
  }
  const newProduct = await creatProduct(name, quantity);
  return newProduct;
};

const getAllProductService = async () => {
  const allProducts = await getAllProducts();
  if (!allProducts.length) throw new Error('Product not fount');
  return allProducts;
};

const deletProduct = async (id) => {
  productIdValidation(id);
  let registredProduct = await deletProduct(id);
  registredProduct = registredProduct.filter((product) => product.id === Object(id));
  if (registredProduct.length > PRODUC_DONT_EXISTS) {
    throw new Error('Product not found');
  }
};

module.exports = {
  creatProductService,
  getAllProductService,
  deletProduct,
};
