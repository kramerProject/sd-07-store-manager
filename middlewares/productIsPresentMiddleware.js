const productModel = require('../model/produtcModel');
const unprocessableEntity = 422;

const productIsPresentMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const isPresent = await productModel.deleteProduct(id);
  if ( !id || id === null || !isPresent) {
    return res.status(unprocessableEntity).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  next();
};

module.exports = productIsPresentMiddleware;
