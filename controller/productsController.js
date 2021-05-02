const {
  addProductService,
  getAllProductsService
} = require('../services/productsService');

const NEW_ITEM = 201;
const SUCCESS = 200;
const INVALID_DATA = 422;
const INTERNAL_ERROR = 500;

const addProductController = async(req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await addProductService(name, quantity);
    res.status(NEW_ITEM).json(newProduct);
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: error.message,
    });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    const results = await getAllProductsService();
    res.status(SUCCESS).json(results);
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProductController,
  getAllProductsController
};
