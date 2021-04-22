const status422 = 422;

const salesMiddleware = async (req, res, next) => {
  const sale = req.body;
  const minValue = 1;
  const invalidQuantity = sale.find((sale) => sale.quantity < minValue);
  const invalidType = sale.find((sale) => typeof sale.quantity === 'string');

  if (invalidQuantity) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    });
  }

  if (invalidType) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    });
  }


  next();
};

module.exports = salesMiddleware;
