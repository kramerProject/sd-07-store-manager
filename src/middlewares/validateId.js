const { ObjectId } = require('mongodb');


const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    const code = 422;
    return res.status(code).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    });
  }

  next();
};

module.exports = validateId;
