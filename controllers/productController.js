const productService = require('../services/productService');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE = 422;

const createProduct = async (req, res) => {
  const product = req.body;

  try {
    const response = await productService.createProduct(product);

    res.status(CREATED).json(response);
  } catch (err) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      }
    });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await productService.findById(id);

    res.status(OK).json(response);
  } catch (err) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      }
    });
  }
};

const findAll = async (_req, res) => {
  try {
    const response = await productService.findAll();

    res.status(OK).json(response);
  } catch (err) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      }
    });
  }
};

const updateProduct = async (req, res) => {
  const product = req.body;
  const { id } = req.params;

  try {
    const result = await productService.updateProduct(id, product);

    res.status(OK).json(result);
  } catch (err) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      }
    });
  }
};

module.exports = {
  createProduct,
  getById,
  findAll,
  updateProduct,
};
