const unprocessableEntityStatus = 422;
const errorObj = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  }
};

const verifySaleArray = (saleArray) => {
  const ZERO = 0;
  const quantityArray = saleArray.map((item) => item.quantity)
    .map((quantity) => {
      if (quantity <= ZERO || typeof quantity !== 'number') {
        return true;
      }
      return false;
    });
  return quantityArray;
};

const saleMiddleware = (req, res, next) => {
  try {
    const saleArray = req.body;
    const quantityArray = verifySaleArray(saleArray);
    const notValidSaleArray = quantityArray.find(item => item === true);

    if(notValidSaleArray) return res.status(unprocessableEntityStatus).json(errorObj);
  } catch (err) {
    throw new Error(err);
  }

  return next();
};

module.exports = saleMiddleware;
