const ProductsModel = require('../model/productsModel');

const UNPROCESSABLE_ENTITY = 422;

const checkDuplicate = async (req, res, next) => {
  const { name } = req.body;

  const allProducts = ProductsModel.getAll();
  const duplicate = allProducts.filter((product) => product.name === name);

  if(duplicate) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      error: {
        message: 'Product already exists',
        code: 'invalid_data',
      }
    });
  }
};

module.exports = checkDuplicate;
