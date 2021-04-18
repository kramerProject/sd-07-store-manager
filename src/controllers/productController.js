const productModel = require('../models/productModel');
const {
  SUCCESS,
  SERVER_ERROR,
  SEMANTIC_ERROR,
  NEW_RESOURCE,
  UNPROCESSABLE_ENTITY,
} = require('../data/httpStatus');
const productYetAdded = require('../helpers/productYetAdded');

const nameMinLength = 5;
const quantityMinLength = 0;

const postProducts = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    let errorMesssage = {
      'err': { 'code': 'invalid_data', 'message': '' }
    };

    const findProduct = await productYetAdded(name);

    if (name.length < nameMinLength) {
      errorMesssage.err.message = '\"name\" length must be at least 5 characters long';
      res.status(UNPROCESSABLE_ENTITY).json(errorMesssage);

    } else if (findProduct) {
      errorMesssage.err.message = 'Product already exists';
      res.status(UNPROCESSABLE_ENTITY).json(errorMesssage);

    } else if (quantity <= quantityMinLength) {
      errorMesssage.err.message = '\"quantity\" must be larger than or equal to 1';
      res.status(UNPROCESSABLE_ENTITY).json(errorMesssage);

    } else if (typeof quantity === 'string') {
      errorMesssage.err.message = '\"quantity\" must be a number';
      res.status(UNPROCESSABLE_ENTITY).json(errorMesssage);

    } else {
      const results = await productModel.postProducts(name, quantity);
      res.status(NEW_RESOURCE).json(results);
    }

  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR).json({ message: 'server error' });
  }
};

const getAllProducts = async (_req, res) => {
  try {
    const results = { products: await productModel.getAllProducts() };

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

    if (result.products === null) {
      res.status(SEMANTIC_ERROR)
        .json({ 'err': { 'code': 'invalid_data', 'message': 'Wrong id format' } });

    } else {
      res.status(SUCCESS).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(SEMANTIC_ERROR)
      .json({ 'err': { 'code': 'invalid_data', 'message': 'Wrong id format' } });
  }
};


const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    let errorMesssage = {
      'err': { 'code': 'invalid_data', 'message': '' }
    };

    if (name.length < nameMinLength) {
      errorMesssage.err.message = '\"name\" length must be at least 5 characters long';
      res.status(UNPROCESSABLE_ENTITY).json(errorMesssage);

    } else if (quantity <= quantityMinLength) {
      errorMesssage.err.message = '\"quantity\" must be larger than or equal to 1';
      res.status(UNPROCESSABLE_ENTITY).json(errorMesssage);

    } else if (typeof quantity === 'string') {
      errorMesssage.err.message = '\"quantity\" must be a number';
      res.status(UNPROCESSABLE_ENTITY).json(errorMesssage);

    } else {
      const results = await productModel.updateProducts(id, name, quantity);
      res.status(SUCCESS).json(results);
    }

  } catch (error) {
    console.error(error);
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.deleteProducts(id);

    if (result === null) {
      res.status(UNPROCESSABLE_ENTITY)
        .json({ 'err': { 'code': 'invalid_data', 'message': 'Wrong id format' } });

    } else {
      res.status(SUCCESS).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(UNPROCESSABLE_ENTITY)
      .json({ 'err': { 'code': 'invalid_data', 'message': 'Wrong id format' } });
  }
};

module.exports = {
  postProducts,
  getAllProducts,
  getProductById,
  updateProducts,
  deleteProducts
};
