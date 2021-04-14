const { isSaleValid } = require('../service');

const NOT_FOUND = 404;

const checkStock = async (req, res, next) => {
  const itensSold = req.body;

  const isValid = isSaleValid(itensSold);

  if(!isValid) {
    return res.status(NOT_FOUND).json({
      err: {
        message: 'Such amount is not permitted to sell',
        code: 'stock_problem',
      },
    });
  };
  
  next();
};

module.exports = checkStock;