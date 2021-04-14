const unprocessableEntity = 422;
const minNumber = 0;

const quantitySalesMiddleware = (req, res, next) => {
  req.body.map((item) => {
    if (typeof item.quantity !== 'number' || item.quantity === null) {
      return res.status(unprocessableEntity).send({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
    if (item.quantity <= minNumber) {
      return res.status(unprocessableEntity).send({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }

  });

  next();
};

module.exports = quantitySalesMiddleware;
