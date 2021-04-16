const { ObjectId } = require('mongodb');


const validateIdSaleDelete = async (req, res, next) => {
  const { id } = req.params;
  const UnprocessableEntry = 422;
  if (!ObjectId.isValid(id)) {
    // console.log(`Entrei no Validador de id. id: ${id}`);
    return res.status(UnprocessableEntry).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
  next();
};

module.exports = validateIdSaleDelete;