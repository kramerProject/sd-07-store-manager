
const STATUS = 422;
const ZERO = 0;

const RESULT = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  }

};
const tokenSales = (req, res, next) => {
  const test = req.body;
  const quantity = test.some((sales)=> sales.quantity <= ZERO);
  if( quantity) {
    return res.status(STATUS).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    });
  }
  next();
};
module.exports = tokenSales;

