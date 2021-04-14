const ProductsModel = require('../models/productsModel');

const serviceValidadeProduct = async (name, quantity) => {
  const MIN_PRODUCT_NAME_LENGTH = 5;
  if (name.length < MIN_PRODUCT_NAME_LENGTH)
    throw {
      code: 'invalid_data',
      message: '\"name\" length must be at least 5 characters long'
    };

  if (quantity < 1)
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    };

  if (!Number.isInteger(quantity))
    throw { code: 'invalid_data', message: '"quantity" must be a number' };

  if (await ProductsModel.getProductByName(name))
    throw { code: 'invalid_data', message: 'Product already exists' };

  return await ProductsModel.add(name, quantity);
};

module.exports = serviceValidadeProduct;
