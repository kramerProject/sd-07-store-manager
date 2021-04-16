const { insertProduct } = require('../services/productServices');
const httpStatus = {
  SUCCESS: 200,
  UNPROCESSABLE_ENTITY: 422,
  CREATED: 201,
};

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const addProduct = await insertProduct(name, quantity);
    return res.status(httpStatus.CREATED).json(addProduct);
  } catch (error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        'code': 'invalid_data',
        'message': error.message,
      }
    });
  }
};

module.exports = {
  createProduct,
};