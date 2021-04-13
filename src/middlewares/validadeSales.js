const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../controllers/status');

function validateQuantity(quantity) {
  if (typeof quantity !== 'number') 
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      err_number: UNPROCESSABLE_ENTITY,
    };

  if (quantity < 1)
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      err_number: UNPROCESSABLE_ENTITY,
    };
}

function validateSales(body) {
  if (body.productId === undefined)
    throw {
      err: {
        code: 'invalid_data',
        message: '"productId" is required',
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
  
  validateQuantity(body.quantity);
}

module.exports = (req, res, next) => {
  const sales = req.body;
  for (const sale of sales) {
    try {
      validateSales(sale);
    } catch ({ err, err_number }) {
      return res.status(err_number).json({ err });    
    }
  }
  
  next();
};
