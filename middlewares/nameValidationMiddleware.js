const { productService } = require('../services');
const { productModel } = require('../models');
const status = require('../status');

const nameValidationMiddleware = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { method } = req;
    const countProductByName = await productModel.countByName(name);
    console.log(method);
   
    if (!productService.nameIsString(name)) return res.status(status.INVALID_DATA).send({
      err: {
        code: 'invalid_data',
        message: '"name" length must be a string'
      }
    });

    if (!productService.validNameSize(name)) return res.status(status.INVALID_DATA).send({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
    if ( method === 'POST' && !productService.nameIsUnique(countProductByName)) 
      return res.status(status.INVALID_DATA).send({
        err: {
          code: 'invalid_data',
          message: 'Product already exists'
        }
      });
    next();
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

module.exports = nameValidationMiddleware;
