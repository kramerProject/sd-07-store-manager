const { ObjectId } = require('mongodb');


const validateIdSale = async (req, res, next) => {
  const { id } = req.params;
  const notFound = 404;
  if (!ObjectId.isValid(id)) {
    console.log(`Entrei no Validador de id. id: ${id}`);
    return res.status(notFound).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  next();
};

module.exports = validateIdSale;