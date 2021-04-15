const salesModel = require('../model/salesModel');
const unprocessableEntity = 422;

const deleteSaleMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const isPresent = await salesModel.deleteSale(id);
  if ( !id || id === null || !isPresent) {
    return res.status(unprocessableEntity).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
  next();
};

module.exports = deleteSaleMiddleware;
