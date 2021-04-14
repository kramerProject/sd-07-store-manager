const { 
  createProduct, 
  listProducts, 
  getProduct } = require('../services/productsService');

const SignProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const statusErr = 500;
  try {
    const data = await createProduct(name, quantity);
    res.status(data.code).json(data.data);
  } catch (error) {
    console.error(err.message);
    res.status(statusErr).json('Error');
  }
};

const ProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getProduct(id);
    return res.status(data.code).json(data.data);
  } catch (error) {
    throw new Error(error);
  }
};

const allProducts = async (req, res) => {
  const codeSuccess = 200;
  const products = await listProducts();
  return res.status(codeSuccess).json(products);
};

module.exports = {
  SignProduct,
  ProductById, 
  allProducts,
};