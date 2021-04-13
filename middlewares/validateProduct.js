const UNPROCESSABLE_ENTITY = 422;
const minLength = 5;
const ONE = 1;

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  if(name.length < minLength) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      error: {

      }
    });
  }

  if(quantity < ONE) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      error: {

      }
    });
  }

  if(typeof quantity === 'string') {
    return res.status(UNPROCESSABLE_ENTITY).json({
      error: {

      }
    });
  }

  next();
};

module.exports = validateProduct;