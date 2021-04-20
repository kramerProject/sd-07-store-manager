const productsService = require('../service/productsService');
const status = require('../config/status');

const addProductsController = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsService.addProductService(name, quantity);
    if (newProduct.code) return next(newProduct);
    return res.status(status.CREATED).json(newProduct);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getAllProductsController = async (_req, res, next) => {
  try {
    const list = await productsService.getAllProductsService();
    if (list.code) return next(list);
    return res.status(status.SUCCESS).json(list);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getByIdProductsController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const list = await productsService.getByIdProductsService(id);
    if (list.code) return next(list);
    return res.status(status.SUCCESS).json(list);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const putByIdProductsController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getByIdProductsService(id);
    if(product.code) return next(product);
    const { name, quantity } = req.body;
    const result = await productsService.putByIdProductsService(id, name, quantity);
    if(result.code) return next(result);
    return res.status(status.SUCCESS).json(result);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const excludeController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const val = await productsService.getByIdProductsService(id);
    if(val.code) return next(val);
    const exclude = await productsService.excludeService(id);
    return res.status(status.SUCCESS).json(exclude);
  } catch (error) {
    console.log(error);
    throw new Error(error);  
  };
};

module.exports = {
  addProductsController,
  getAllProductsController,
  getByIdProductsController,
  putByIdProductsController,
  excludeController,
};
