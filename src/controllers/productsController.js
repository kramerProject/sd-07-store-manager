const productsModel = require('../models/productsModel');
const productsService = require('../services/productsService');
const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

const createProduct = async (req,res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productsService.createProduct(name, quantity);

    if (result.err) {
      return res.status(UNPROCESSABLE_ENTITY).json(result);
    }

    return res.status(CREATED).json(result);

  } catch (error) {
    console.error(error);

    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const results = await productsService.getAllProducts();

    res.status(OK).json(results);
  } catch (error) {
    console.error(error);

    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsService.getProductById(id);

    if (result.err) {
      return res.status(UNPROCESSABLE_ENTITY).json(result);
    }

    res.status(OK).json(result);
  } catch (error) {
    console.error(error);
    
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const result = await productsService.updateProduct(id, name, quantity);

    if (result.err) {
      return res.status(UNPROCESSABLE_ENTITY).json(result);
    }

    return res.status(OK).json(result);
  } catch (error) {
    console.error(error);
    
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsService.getProductById(id);

    if (result.err) {
      return res.status(UNPROCESSABLE_ENTITY).json(result);
    }

    await productsModel.exclude(id);

    return res.status(OK).json(result);
  } catch (error) {
    console.error(error);
    
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};