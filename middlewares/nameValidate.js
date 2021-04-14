const { UNPROCESSABLE_ENTITY } = require('../utils/statusCode.json');

const nameValidate = async (req, res, next) => {
  const { name } = req.body;
  const err = new Error();
  err.code = 'invalid_data';
  err.statusCode = UNPROCESSABLE_ENTITY;

  try {
    const MIN_CHARACTERS = 5;
    err.message = '"name" length must be at least 5 characters long';
    if (name === undefined) {
      next(err);
      return;
    }
    if (name.length < MIN_CHARACTERS) next(err);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = nameValidate;
