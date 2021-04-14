const { productModel } = require('../models');
const status = require('../status');

const idValidationMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productModel.getById(id);
    if(!product) return res.status(status.INVALID_DATA).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
    next();
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = idValidationMiddleware;
