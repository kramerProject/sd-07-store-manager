const productsServices = require('../services/ProductsServices');
const productsModel = require('../models/ProductsModel');

const created = 201;
const serverError = 500;
const OK = 200;
const unprocessable = 422;

const wrongId = {
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  },
};

const createProducts = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const products = await productsServices.createProducts(name, quantity);
    const { http, message } = products;
    return res.status(http).json(message);
  } catch (error) {
    return res.status(serverError).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const results = await productsModel.getAllProducts();
    return res.status(OK).send({products: results});
  } catch (error) {
    console.log(error);
    return res.status(serverError).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await productsModel.getProductById(id);
    if(!results) {
      return res.status(unprocessable).json(wrongId);
    }
    return res.status(OK).json(results);
  } catch (error) {
    console.log(error);
    return res.status(serverError).json({ message: error.message });
  }
};


module.exports = {
  createProducts,
  getAllProducts,
  getProductById,
};
