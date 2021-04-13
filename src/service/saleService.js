const checkSale = async (req, res, next) => {
  const sale = req.body;
  sale.forEach((product) => {
    if (typeof product.quantity !== 'number' || product.quantity <= 0) {
      res.status(422).send({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
      return null;
    }
  });
  next();
};

module.exports = { checkSale };
