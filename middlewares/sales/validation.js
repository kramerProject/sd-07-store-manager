const INVALID_DATA = 422;
const minQuantity = 1;

const quantityValidator = async(req, res, next) => {
  const salesItens = req.body;
  if (!salesItens[0].quantity || salesItens[0].quantity < minQuantity) {
    return res.status(INVALID_DATA).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  if (typeof salesItens[0].quantity !== 'number') {
    return res.status(INVALID_DATA).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  next();
};

module.exports = {
  quantityValidator,
};
