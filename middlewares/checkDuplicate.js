const ProductsModel = require('../model/productsModel');

const UNPROCESSABLE_ENTITY = 422;
const ZERO = 0;

const checkDuplicate = async (req, res, next) => {
  const { name } = req.body;

  const allProducts = await ProductsModel.getAll();
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
