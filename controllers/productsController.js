const {
  addProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
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
    const products = await getAllProductsService();
    res.status(SUCCESS).json({products});
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: error.message,
    });
  }
};

const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getProductByIdService(id);
    if(result.err) { // Referência: Vanessa Naara
      return res.status(INVALID_DATA).json(result);
    }
    return res.status(SUCCESS).json(result);
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: error.message,
    });
  }
};

const updateProductController = async(req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const result = await updateProductService(id, name, quantity);
    return res.status(SUCCESS).json(result);
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: error.message,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductService(id);
    if(result.err) {
      return res.status(INVALID_DATA).json(result);
    }
    res.status(SUCCESS).end();
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};
