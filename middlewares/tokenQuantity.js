const STATUS = 422;

const tokenQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if(typeof quantity === 'string') {
    return res.status(STATUS).send({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',

      }
    });
  }
  next();
};

module.exports = tokenQuantity;
