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

const updateProduct = async (id, name, quantity) => {
  const validations = validate(name, quantity);
  if (validations.err) return validations;
  await productModel.updateProduct(id, name, quantity);
  const upProduct = await findByIdProduct(id);
  return upProduct;
};

const deleteProduct = async (id) => {
  const prodDelete = await productModel.findByIdProduct(id);
  if (prodDelete === '' || prodDelete === undefined || prodDelete === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  await productModel.deleteProduct(id);
  return prodDelete;
};

module.exports = {
  insertProduct,
  getAllProducts,
  findByIdProduct,
  updateProduct,
  deleteProduct,
};
