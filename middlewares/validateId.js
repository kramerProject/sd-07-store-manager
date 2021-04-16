const { ObjectId } = require('mongodb');


const validateId = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    console.log(`Entrei no Validador de id. id: ${id}`);
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  next();
};

module.exports = validateId;