const { ObjectId } = require('mongodb');


const validateIdSale = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    console.log(`Entrei no Validador de id. id: ${id}`);
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  next();
};

module.exports = validateIdSale;