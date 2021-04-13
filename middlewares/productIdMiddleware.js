const productModel = require('../model/produtcModel');
const unprocessableEntity = 422;


const productIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const isPresent = await productModel.showProductId(id);
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

module.exports = productIdMiddleware;
