const helper = require('../helpers/isValid');
const code = require('../returnStatus/status.json');

const middlewareIsInteger = (req, res, next) => {
  const { quantity } = req.body;
  const IsInteger = helper.IsInteger(quantity);

  if (IsInteger) {
    next();
  } else {
    res.status(code.Unprocessable_Entity).json({
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      }
    });
  }

};

module.exports = middlewareIsInteger;