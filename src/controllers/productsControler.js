const { productService } = require('../service');
const { httpStatusCode } = require('./../../constants');
const creatProductController = async (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    const createdProduct = await productService.creatProductService(name, quantity);
    if (createdProduct) return res.status(httpStatusCode.CREATED).json(createdProduct);
  } catch (error) {
    console.log(error.message);
    next({
      status: httpStatusCode.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message: error.message,
    });
  }
  next();
};

const getAllProductController = async (req, res, next) => {
  try {
    const listedProducts = await productService.getAllProductService();
    return res.status(httpStatusCode.OK).json(listedProducts);
  } catch (error) {
    console.log(error.message);
    return next({
      status: httpStatusCode.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message: error.message,
    });
  }
};

const deletProductController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const delectedProduct = await productService.deletProductService(id);
    return res.status(httpStatusCode.OK).json(delectedProduct);
  } catch (error) {
    console.log(error.message);
    return next({
      status: httpStatusCode.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message: error.message,
    });
  }
};

const getProductByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const productById = await productService.getProductByIdService(id);
    return res.status(httpStatusCode.OK).json(productById);
  } catch (error) {
    console.log(error.message);
    return next({
      status: httpStatusCode.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message: error.message,
    });
  }
};

const updateProductController = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const updatedProduct = await productService.updateProductServide(id, name, quantity);
    return res.status(httpStatusCode.OK).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    return next({
      status: httpStatusCode.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message: error.message,
    });
  }
};

module.exports = {
  creatProductController,
  getAllProductController,
  getProductByIdController,
  deletProductController,
  updateProductController,
};
