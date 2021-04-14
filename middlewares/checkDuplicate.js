const Model = require('../model');

const UNPROCESSABLE_ENTITY = 422;
const ZERO = 0;

const checkDuplicate = async (req, res, next) => {
  const { name } = req.body;

  const allProducts = await Model.getAll('products');
  const duplicate = allProducts.filter((product) => product.name === name);

  if(duplicate.length !== ZERO) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        message: 'Product already exists',
        code: 'invalid_data',
      }
    });
  }

  next();
};

module.exports = checkDuplicate;
