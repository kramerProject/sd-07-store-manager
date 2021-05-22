const ProductsModel = require('../models/productsModel');

const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INVALID_DATA = 422;

const createProductController = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductsModel.createProduct(name, quantity);
  return res.status(CREATED).send(newProduct);
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProd = await ProductsModel.updateProduct(id, name, quantity);
    return res.status(SUCCESS).send(updatedProd);
  } catch (err) {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductsModel.deleteProduct(id);
    return res.status(SUCCESS).send({ message: 'Product deleted successfully' });
  } catch (err) {
    return res.status(INVALID_DATA).
      send({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        }
      });
  }
};

const getAllProductsController = async(req, res) => {
  const allProducts = await ProductsModel.getAllProducts();
  const result = {products: allProducts };
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
  return res.status(SUCCESS).json(product);
};

module.exports = {
  createProductController,
  getAllProductsController,
  productByIdController,
  updateProductController,
  deleteProductController,
};
