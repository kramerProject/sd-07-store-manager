const ProductsModel = require('../models/productsModel');
// const ProductService = require('../services/products');

const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const INVALID_DATA = 422;

const createProductController = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductsModel.createProduct(name, quantity);
  return res.status(CREATED).send(newProduct);
};

const getAllProductsController = async(req, res) => {
  const allProducts = await ProductsModel.getAllProducts();
  const result = {products: allProducts }
  return res.status(SUCCESS).send(result);
};

const productByIdController = async(req, res) => {
  const {id} = req.params;
  const product = await ProductsModel.productById(id);
  if (!product) {
    return res.status(INVALID_DATA)
      .send({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        }
      });
  }
  console.log(product);
  return res.status(SUCCESS).json(product);
};

module.exports = {
  createProductController,
  getAllProductsController,
  productByIdController,
};
