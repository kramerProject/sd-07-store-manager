const productService = require('../services/productService');
const {StatusCodes} = require('http-status-codes');

const getAllProducts = async (_req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(StatusCodes.OK).json({products});
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await productService.readProductsById(id);

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productService.addProduct(name, quantity);

    return res.status(StatusCodes.CREATED).json(newProduct);
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const products = await productService.updateProductById(id, name, quantity);

    return res.status(StatusCodes.OK).json(products);
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
};

const deleteProduct = async (req, res, next ) => {
  try {
    await productService.deleteProductById(req.params.id);

    return res.status(StatusCodes.OK).end();
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
