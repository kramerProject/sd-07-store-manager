const productsModel = require('../model/products.js');
const productsService = require('../services/product.js');

const CREATE = 201;
const OK = 200;
const ERROR = 400;
const CONFLICT = 409;
const INVALID_DATA = 422;
const INTERNAL_SERVER_ERROR = 500;


const getAll = async (req, res) => {
  try {
    const results = await productsModel.getAll();

    return res.status(OK).json({products: results});
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const resultName = await productsService.validateName(name);
  const resultAlready = await productsService.validateAlreadyExists(name);
  const resultQuantity = await productsService.validateQuantity(quantity);
  try {
    if (resultName || resultAlready || resultQuantity) {
      throw Error(resultName  || resultAlready || resultQuantity);
    }
    const newProduct = await productsModel.addProduct(name, quantity);
    return res.status(CREATE).json(newProduct);
  } catch (err) {
    return res.status(INVALID_DATA).json({
      err: {code: 'invalid_data', message: err.message }
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsModel.getById(id);

    if (!result) throw Error('Wrong id format');

    return res.status(OK).json(result);
  } catch (err) {
    return res.status(INVALID_DATA).json({
      err: {code: 'invalid_data', message: err.message }
    });
  }
};

const update = async (req, res) => {
  const { name, quantity } = req.body;
  const {id} = req.params;
  const resultName = await productsService.validateName(name);
  const resultQuantity = await productsService.validateQuantity(quantity);
  try {
    if (resultName || resultQuantity) {
      throw Error(resultName || resultQuantity);
    }
    const editedProduct = await productsModel.update(name, quantity, id);
    return res.status(OK).json(editedProduct);
  } catch (err) {
    return res.status(INVALID_DATA).json({
      err: {code: 'invalid_data', message: err.message }
    });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await productsModel.getById(id);
  try {
    if (!result) throw Error('Wrong id format');
    await productsModel.remove(id);
    return res.status(OK).json(result);
  } catch (err) {
    return res.status(INVALID_DATA).json({
      err: {code: 'invalid_data', message: err.message }
    });
  }
};
module.exports = {
  getAll,
  addProduct,
  getById,
  update,
  remove,
};
