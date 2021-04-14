const ProductsService = require('../sevices/productsService');

const POST_SUCESS = 201;
const GET_SUCESS = 200;

const getAllProducts = async (_req, res, next) => {
  try{
    const products = await ProductsService.getAllProducts();
    res.status(GET_SUCESS).json({ products: products });
  } catch (err) {
    next(err);
  }
};

const findProductById = async (req, res, next) => {
  try{
    const { id } = req.params;
    const product = await ProductsService.findProductById(id);
    res.status(GET_SUCESS).json(product);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await ProductsService.create(name, quantity);

    res.status(POST_SUCESS).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try{
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProduct = await ProductsService.update(id, name, quantity);
    res.status(GET_SUCESS).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  update,
  findProductById,
  getAllProducts,
};
