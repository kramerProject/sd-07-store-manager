const { httpStatusCode } = require('../../constants');
const {
  creatProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  updateProduct,
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
  return producById;
};

const deletProductService = async (id) => {
  productIdValidation(id);
  let registredProduct = await getAllProducts();
  registredProduct = registredProduct.filter((product) => product.id === id);
  if (registredProduct.length > PRODUC_DONT_EXISTS) {
    throw new Error('Produc not found');
  }
  const delectedProduct = await deleteProduct(id);
  return delectedProduct;
};

const updateProductServide = async (id, name, quantity) => {
  productIdValidation(id);
  quantityValidation(quantity);
  nameValidator(name);
  await updateProduct(id, name, quantity);
  const updatedProduct = await getProductById(id);
  return updatedProduct;
};

module.exports = {
  creatProductService,
  getAllProductService,
  getProductByIdService,
  deletProductService,
  updateProductServide,
};
