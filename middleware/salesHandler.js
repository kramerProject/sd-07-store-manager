const salesModel = require('../models/salesModel');
const unprocessableEntityStatus = 422;
const errorObj = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  }
};

const saleMiddleware = (req, res, next) => {
  try {
    const saleArray = req.body;
    const ZERO = 0;
    saleArray.map((item) => item.quantity)
      .map((quantity) => {
        if (quantity <= ZERO || typeof quantity !== 'number') {
          return res.status(unprocessableEntityStatus).json(errorObj);
        }
      });
  } catch (err) {
    throw new Error(err);
  }

  next();
};

module.exports = saleMiddleware;
