const ProductsService = require('../sevices/productsService');

const POST_SUCESS = 201;
const GET_SUCESS = 200;

const getAllProducts = async (_req, res, next) => {
  try{
    const products = await ProductsService.getAllProducts();
    return res.status(GET_SUCESS).json({ products: products });
  } catch (err) {
    next(err);
  }
};

const findProductById = async (req, res, next) => {
  try{
    const { id } = req.params;
    const product = await ProductsService.findProductById(id);
    return res.status(GET_SUCESS).json(product);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await ProductsService.create(name, quantity);

    return res.status(POST_SUCESS).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try{
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProduct = await ProductsService.update(id, name, quantity);
    return res.status(GET_SUCESS).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

const exclude = async (req, res, next) => {
  try{
    const { id } = req.params;
    const excludeObject = await ProductsService.exclude(id);
    return res.status(GET_SUCESS).json(excludeObject);
  }catch(err){
    next(err);
  }
};

module.exports = {
  create,
  update,
  exclude,
  findProductById,
  getAllProducts,
};
