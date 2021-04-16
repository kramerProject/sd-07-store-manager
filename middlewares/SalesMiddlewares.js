const salesService = require('../services/SalesService');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

const saleProductQuantityVerify = (req, res, next) => {
  const { body: itens } = req;
  (salesService.quantityVerify(itens))
    ? next()
    : res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
};

const saleProductQuantityTypeVerify = (req, res, next) => {
  const { body: itens } = req;
  (salesService.typeVerify(itens))
    ? next()
    : res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
};

const saleUpdate = (req, res, next) => {
  const { body: itens } = req;
  (salesService.typeVerify && salesService.quantityVerify)
    ? next()
    : res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
};

const productExists = async (req, res, next) => {
  const { name } = req.body;
  try {

    (await productService.productExists(name))
      ? res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Product already exists'
        }
      })
      : next();     
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'erro interno'});
  }
};

module.exports = {
  productExists,
  saleUpdate,
  saleProductQuantityVerify,
  saleProductQuantityTypeVerify,
};
