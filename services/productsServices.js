const productModel = require('../models/productsModel');

const addWithValidation = async (name, quantity) => {
  const regraQtdCaractere = 5;
  const qtdMinima = 1;
  if (name.length <= regraQtdCaractere) {
    return {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }

  if (quantity < qtdMinima) {
    return {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }

  if (typeof(quantity) != 'number') {
    return {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }

  const products = await productModel.getAll();
  const zero = 0;
  for (let i = zero; i < products.length; i += 1) {
    if (name === products[i].name) {
      return {
        code: 'invalid_data',
        message: 'Product already exists',
      };
    }
  }

  const newProduct = await productModel.add(name, quantity);
  return newProduct;
};

const getAllWithValidation = async () => {
  const products = await productModel.getAll();
  return products;
};

const getOneWithValidation = async (id) => {
  const product = await productModel.getOne(id);
  if (!product) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return product;
};

const updateWithValidation = async (id, name, quantity) => {
  // VALIDAÇÕES
  const regraQtdCaractere = 5;
  const qtdMinima = 1;
  if (name.length <= regraQtdCaractere) {
    return {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }

  if (quantity < qtdMinima) {
    return {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }

  if (typeof(quantity) != 'number') {
    return {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  // 
  const updatedProduct = await productModel.updateOne(id, name, quantity);
  return updatedProduct;
};

module.exports = {
  addWithValidation,
  getAllWithValidation,
  getOneWithValidation,
  updateWithValidation,
};
