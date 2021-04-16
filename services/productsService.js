const productModel = require('../models/productsModel');

const validate = (name, quantity) => {
  const sizeName = 5;
  const ZERO = 0;

  if (name === undefined || name.length < sizeName) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (quantity === undefined || quantity <= ZERO) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  return {};
};

const insertProduct = async (name, quantity) => {
  const productExists = await productModel.searchByName(name);

  if (productExists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  const validations = validate(name, quantity);
  if (validations.err) return validations;
  return await productModel.insertProduct(name, quantity);
};

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return {
    products: products,
  };
};

const findByIdProduct = async (id) => {
  const idProduct = await productModel.findByIdProduct(id);
  console.log(idProduct);
  if (idProduct === '' || idProduct === undefined || idProduct === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return idProduct;
};

module.exports = { insertProduct, getAllProducts, findByIdProduct };
