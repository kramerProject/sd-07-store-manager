const helper = require('../helpers/isValid');
const code = require('../returnStatus/status.json');

const middlewareNameGreaterThan = (req, res, next) => {
  const { quantity } = req.body;

  const quantityValid = helper.quantityIsOk(quantity);

  if (quantityValid) {
    return next();
  } else {
    res.status(code.Unprocessable_Entity).json({
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be larger than or equal to 1'
      }
    });
  }
};

module.exports = middlewareNameGreaterThan;