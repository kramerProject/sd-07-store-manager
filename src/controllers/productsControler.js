const getStatusCode = require('http-status-codes');
const { creatProductService } = require('../service');
const creatProductController = (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    const createdProduct = creatProductService(name, quantity);
    console.log(name);
    return res.status(getStatusCode.CREATED).send(createdProduct);
  } catch (error) {
    console.error(error);
    next({
      status: getStatusCode.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message: error.message,
    });
  }
};

module.exports = {
  creatProductController,
};
