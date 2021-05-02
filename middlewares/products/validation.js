const {
  getAllProductsService
} = require('../../services/productsService');

const INVALID_DATA = 422;
const minLength = 5;
const minQuantity = 1;

const nameValidator = async(req, res, next) => {
  const { name } = req.body;
  if(!name || name.length < minLength) {
    res.status(INVALID_DATA).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  const results = await getAllProductsService();
  const duplicateName = results.some(item => item.name === name);
  if (duplicateName) {
    return res.status(INVALID_DATA).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  next();
};

const quantityValidator = async(req, res, next) => {
  const { quantity } = req.body;
  if(!quantity || quantity.length < minQuantity) {
    res.status(INVALID_DATA).send({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }
  if (typeof quantity !== 'number') {
    res.status(INVALID_DATA).send({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }
  next();
};

module.exports = {
  nameValidator,
  quantityValidator,
};
