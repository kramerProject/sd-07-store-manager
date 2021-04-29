const { httpStatusCode } = require('../../constants');
const { productsModel } = require('../models');
const {
  nameValidator,
  quantityValidation,
  productIdValidation
} = require('../validations/products');

const PRODUC_DONT_EXISTS = 0;

const creatProductService = async (name, quantity) => {
  quantityValidation(quantity);
  nameValidator(name);
  let registredProduct = await productsModel.getAllProducts();
  registredProduct = registredProduct.filter((product) => product.name === name);
  if (registredProduct.length > PRODUC_DONT_EXISTS) {
    throw new Error('Product already exists');
  }
  const newProduct = await productsModel.creatProduct(name, quantity);
  return newProduct;
};

const getAllProductService = async () => {
  const allProducts = await productsModel.getAllProducts();
  return {
    products: allProducts,
  };
};

const getProductByIdService = async (id) => {
  productIdValidation(id);
  const producById = await productsModel.getProductById(id);
  return producById;
};

const deletProductService = async (id) => {
  productIdValidation(id);
  let registredProduct = await productsModel.getAllProducts();
  registredProduct = registredProduct.filter((product) => product.id === id);
  if (registredProduct.length > PRODUC_DONT_EXISTS) {
    throw new Error('Produc not found');
  }
  const delectedProduct = await productsModel.deleteProduct(id);
  return delectedProduct;
};

const updateProductServide = async (id, name, quantity) => {
  productIdValidation(id);
  quantityValidation(quantity);
  nameValidator(name);
  await productsModel.updateProduct(id, name, quantity);
  const updatedProduct = await productsModel.getProductById(id);
  return updatedProduct;
};

module.exports = {
  creatProductService,
  getAllProductService,
  getProductByIdService,
  deletProductService,
  updateProductServide,
};
