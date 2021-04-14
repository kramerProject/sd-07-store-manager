const { countByNameDuplicate } = require('../models/productModel');

const nameValidationsMiddleware = async (req, res, next) => {
  const { name } = req.body;
  const UNPROCESSABLE = 422;
  const verifyCountName = await countByNameDuplicate(name);
  try {
    const SIZE = 5;
    const COUNT = 0;
    if (name.length < SIZE) {
      return res
        .status(UNPROCESSABLE)
        .send({
          err: {
            code: 'invalid_data',
            message: '"name" length must be at least 5 characters long',
          }
        });
    }
    if (verifyCountName > COUNT) {
      console.log('Console count', verifyCountName);
      return res
        .status(UNPROCESSABLE)
        .send({
          err: {
            code: 'invalid_data',
            message: 'Product already exists',
          }
        });
    }
    next();

  } catch (error) {
    next({
      err: {
        code: error.code,
        message: error.message,
      }
    });
  }
};

module.exports = nameValidationsMiddleware;