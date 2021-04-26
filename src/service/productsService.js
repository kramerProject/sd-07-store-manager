const { httpStatusCode } = require('../../constants');
const {
  creatProduct,
  getAllProducts,
  deleteProduct,
  getProductById
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
  return {
    products: allProducts,
  };
};

const getProductByIdService = async (id) => {
  productIdValidation(id);
  const producById = await getProductById(id);
  console.log(producById);
  return producById;
};

const deletProduct = async (id) => {
  productIdValidation(id);
  const registredProduct = await deleteProduct(id);
  return registredProduct;
};

module.exports = {
  creatProductService,
  getAllProductService,
  getProductByIdService,
  deletProduct,
};
