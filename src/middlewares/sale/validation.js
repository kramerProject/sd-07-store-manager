const { getOne } = require("../../models/product");

const INVALID_DATA = 422;

const saleValidation = async (req, res, next) => {
  const productIds = req.body.map((product) => product.productId);
  productIds.forEach(async id => {
    const product = await getOne(id);
    if (product === null) {
      return res.status(INVALID_DATA).json(
        {
          err: {
            code: 'invalid_data',
            message: 'Wrong product ID or invalid quantity'
          }
        }
      );
    } 
  });
  next();
};

module.exports = {
  saleValidation
};
