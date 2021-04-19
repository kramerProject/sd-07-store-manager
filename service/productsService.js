const productsModel = require('../models/productsModel');
const status = require('../config/status');

const ONE = 1;
const FIVE = 5;
const validateProductService = (name, quantity) => {
  if (!name || name.length < FIVE) {
    return {
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    };
  }
  if (!quantity || quantity < ONE) {
    return {
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '"quantity" must be larger than or equal to 1',
    };
  }
  if (typeof quantity !== 'number') {
    return {
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '"quantity" must be a number',
    };
  }
  return 'Validado';
};

const addProductService = async (name, quantity) => {
  const validate = validateProductService(name, quantity);
  if (validate.code) {
    return validate;
  }
  const getProductsByName = await productsModel.findProductsByNameModel(name);
  if (getProductsByName !== null) {
    return {
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: 'Product already exists',
    };
  }
  const result = await productsModel.addProductModel(name, quantity);
  return result;
};

const getAllProductsService = async () => {
  const getAllProducts = await productsModel.findAllProductsModel();
  return {
    products: getAllProducts,
  };
};

const getByIdProductsService = async (id) => {
  const getByIdProduct = await productsModel.findByIdProductsModel(id);
  if (!getByIdProduct) {
    return {
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: 'Wrong id format',
    };
  }
  return getByIdProduct;
};

const putByIdProductsService = async (id, name, quantity) => {
  const validate = validateProductService(name, quantity);
  if (validate.code) {
    return validate;
  }
  const result = productsModel.updatePoductModel(id, name, quantity);
  return result;
};

const excludeService = async (id) => {
  const excludeId = productsModel.excludeModel(id);
  return excludeId;
};

module.exports = {
  validateProductService,
  getAllProductsService,
  getByIdProductsService,
  addProductService,
  putByIdProductsService,
  excludeService,
};
