const validate = require('../schemas/saleSchema');

const validateSale = (req, res, next) => {
  const { body } = req;

  const validations = validate.validateSale(body);

  if (validations.err) {
    return res
      .status(validations.code)
      .json({ err: validations.err });
  }

  next();
};

const validateProduct = (req, res, next) => {
  const { body } = req;

  const validations = validate.isExistingProduct(body);

  if (validations.err) {
    return res
      .status(validations.code)
      .json({ err: validations.err });
  }

  next();
};

module.exports = {
  validateSale,
  validateProduct,
};