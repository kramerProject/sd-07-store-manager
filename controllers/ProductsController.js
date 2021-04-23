const productsServices = require('../services/ProductsServices');
const { SUCCESS, CREATE, UNPROCESS, NOTFOUND } = require('./Status');

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productsServices.createProduct(name, quantity);
    return res.status(CREATE).json(result.message);
  } catch(error) { 
    console.log(error);
    return res.status(UNPROCESS).json(error.message);
  }
};

const getProduct = async (_req, res) => {
  try {
    const products = await productsServices.getProduct();
    return res.status(SUCCESS).json(products.list);
  } catch (error) {
    console.log(error);
    return res.json('Desculpe, algo deu errado :(');
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsServices.getProductById(id);
    return res.status(SUCCESS).json(product.message);
  } catch (error) {
    console.log(error);
    return res.status(UNPROCESS).json(error.message);
  }
};

const updateProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productsServices.updateProductsById(id, name, quantity);
    return res.status(SUCCESS).json(product.message);
  } catch (error) {
    console.log(error);
    return res.status(UNPROCESS).json(error.message);
  }
};

const deleteProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsServices.deleteProductsById(id);
    return res.status(SUCCESS).json(result.message);
  } catch (error) {
    console.log(error); 
    return res.status(UNPROCESS).json(error.message);
  }
};


module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProductsById,
  deleteProductsById,
};