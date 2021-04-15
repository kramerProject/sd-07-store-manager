const { 
  createProduct, 
  listProducts, 
  getProduct,
  updateProduct,
  deleteProduct } = require('../services/productsService');

const SignProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const statusErr = 500;
  try {
    const data = await createProduct(name, quantity);
    return res.status(data.code).json(data.data);
  } catch (error) {
    console.error(err.message);
    return res.status(statusErr).json('Error');
  }
};

const setProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const statusErr = 500;
  try {
    const data = await updateProduct(name, quantity, id);
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

const excludeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await deleteProduct(id);
    return res.status(data.code).json(data.data);
  } catch (error) {
    throw new Error(error);
  }
};

const allProducts = async (req, res) => {
  const codeSuccess = 200;
  const products = await listProducts();
  return res.status(codeSuccess).json({'products': products});
};

module.exports = {
  SignProduct,
  ProductById, 
  allProducts,
  setProduct,
  excludeProduct,
};