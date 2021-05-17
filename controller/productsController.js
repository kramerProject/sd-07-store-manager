const ProductsModel = require('../models/productsModel');

const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const INVALID_DATA = 400;

const createProductController = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductsModel.createProduct(name, quantity);
  console.log(await newProduct);
  return res.status(CREATED).send(newProduct);
};

const getAllProductsController = async(req, res) => {
  const allProducts = await ProductsModel.getAllProducts();
  return res.status(SUCCESS).send(allProducts);
};

const productByIdController = async(req, res) => {
  const {id} = req.params;
  const product = await ProductsModel.productById(id);
  return res.status(SUCCESS).json(product);
};

module.exports = {
  createProductController,
  getAllProductsController,
  productByIdController,
};
