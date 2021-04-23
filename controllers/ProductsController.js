const productsServices = require('../services/ProductsServices');
const { SUCCESS, CREATE, UNPROCESS, NOTFOUND } = require('./Status');

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const results = await productsServices.createProduct(name, quantity);
    res.status(CREATE).json(results.message);
  } catch(error) { 
    console.log(error);
    res.status(UNPROCESS).json(error.message);
  }
};

const getProduct = async (_req, res) => {
  try {
    const product = await productsServices.getProduct();
    res.status(SUCCESS).json(product.list);
  } catch (error) {
    res.status(NOTFOUND).json(error.message);
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsServices.getProductsById(id);
    res.status(SUCCESS).json(product.message);
  } catch (error) {
    res.status(NOTFOUND).json(error.message);
  }
};

const updateProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productsServices.updateProductsById(id, name, quantity);
    res.status(SUCCESS).json(product.message);
  } catch (error) {
    res.status(UNPROCESS).json(error.message);
  }
};

const deleteProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsServices.deleteProductsById(id);
    res.status(SUCCESS).json(product.message);
  } catch (error) {
    res.status(UNPROCESS).json(error.message);
  }
};


module.exports = {
  createProduct,
  getProduct,
  getProductsById,
  updateProductsById,
  deleteProductsById,
};