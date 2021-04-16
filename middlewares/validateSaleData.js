const UnprocessableEntry = 422;

const validateSaleData = async (req, res, next) => {
  const itensSold = req.body;
  // console.log(`Middleware validateSaleData: itensSold ${req.body[0].productId}`);
  if (itensSold[0].quantity <= 0) {
    return res.status(UnprocessableEntry).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  if (typeof itensSold[0].quantity === 'string') {
    return res.status(UnprocessableEntry).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

module.exports = validateSaleData;