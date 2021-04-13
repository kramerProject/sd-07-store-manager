const ProductService = require('../services/ProductService');
const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../controllers/status');

async function validadeName(name) {
  const minLength = 5;
  if (name.length < minLength)
    throw {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
      err_number: UNPROCESSABLE_ENTITY,
    };

  const ZERO = 0;
  const alreadyExists = await ProductService.get('name', name);
  if (alreadyExists.length !== ZERO)
    throw {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
      err_number: UNPROCESSABLE_ENTITY,
    };
}

function validateQuantity(quantity) {
  if (typeof quantity !== 'number') 
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
      err_number: UNPROCESSABLE_ENTITY,
    };

  if (quantity < 1)
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
      err_number: UNPROCESSABLE_ENTITY,
    };
}

async function validateProduct(body) {
  if (body.name === undefined)
    throw {
      err: {
        code: 'invalid_data',
        message: '"name" is required',
      },
      err_number: BAD_REQUEST,
    };

  if (body.quantity === undefined)
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" is required',
      },
      err_number: BAD_REQUEST,
    };

  await validadeName(body.name);
  validateQuantity(body.quantity);
}

module.exports = async (req, res, next) => {
  try {
    await validateProduct(req.body);
    next();
  } catch ({ err, err_number }) {
    return res.status(err_number).json({ err });
  }
};
