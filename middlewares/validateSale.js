const UNPROCESSABLE_ENTITY = 422;
const ONE = 1;

const validateSale = (req, res, next) => {
  const itensSold = req.body;
  const errorObj = { err: { message: '', code: '' } };

  itensSold.forEach(({ quantity }) => {
    if(quantity < ONE || typeof quantity === 'string') {
      errorObj.err.message = 'Wrong product ID or invalid quantity';
      errorObj.err.code = 'invalid_data';
    }
  });

  if(errorObj.err.message) {
    return res.status(UNPROCESSABLE_ENTITY).json(errorObj);
  }

  next();
};

module.exports = validateSale;
