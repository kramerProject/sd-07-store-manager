const helper = require('../helpers/isValid');
const code = require('../returnStatus/status.json');

const middlewareNameIsString = (req, res, next) => {
  const { name } = req.body;
  const nameIsString = helper.nameIsAString(name);

  if (nameIsString) {
    next();
  } else {
    res.status(code.Unauthorized).json({
      err: {
        code: 'invalid_data',
        message: 'name must be a string'
      }
    });

  }
};

module.exports = middlewareNameIsString;
