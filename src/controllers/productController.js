const productModel = require('../models/productModel');
const { SUCCESS, SERVER_ERROR, SEMANTIC_ERROR } = require('../data/httpStatus');

const postProducts = async (req, res) => {
  try {

  } catch (error) {

  }
};

const getAllProducts = async (_req, res) => {
  try {
    const results = await productModel.getAllProducts();

    res.status(SUCCESS).json(results);
  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR).json({ message: 'server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.getProductById(id);

    res.status(SUCCESS).json(result);
  } catch (error) {
    console.error(error);
    res.status(SEMANTIC_ERROR)
      .json({ 'err': { 'code': 'invalid_data', 'message': 'Wrong id format' } });
  }
};

module.exports = {
  getAllProducts,
  getProductById
};
