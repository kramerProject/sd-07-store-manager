const validate = require('../schemas/productSchema');

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  const validations = validate.validateProduct(name, quantity);
  
  if (validations.err) {
    return res
      .status(validations.code)
      .json({err: validations.err});
  }
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  const validations = validate.validateId(id);

  if (validations.err) {
    return res
      .status(validations.code)
      .json({err: validations.err});
  }
  next();
};

module.exports = {
  validateProduct,
  validateId
};