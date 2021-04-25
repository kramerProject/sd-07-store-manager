const { productService } = require('../service');
const { httpStatusCode } = require('./../../constants');
const creatProductController = async (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    await productService.creatProductService(name, quantity);
    return res.sendStatus(httpStatusCode.CREATED)
      .json(httpStatusCode.UNPROCESSABLE_ENTITY);
  } catch (error) {
    console.log(error.message);
    return next({
      status: httpStatusCode.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message: error.message
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
      status: httpStatusCode.BAD_REQUEST,
      code: 'invalid_data',
      message: error.message
    });
  }
};

module.exports = {
  creatProductController,
  getAllProductController,
};
