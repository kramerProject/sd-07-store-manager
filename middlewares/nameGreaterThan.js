const helper = require('../helpers/isValid');
const code = require('../returnStatus/status.json');

const nameGreateThanMiddleware = (req, res, next) => {
  const { name } = req.body;

  const NameValid = helper.nameIsOk(name);

  if (NameValid) {
    return next();

  } else {
    res.status(code.Unprocessable_Entity).json({
      'err': {
        'code': 'invalid_data',
        'message': '"name" length must be at least 5 characters long'
      }
    });
  }
};

module.exports = nameGreateThanMiddleware;
