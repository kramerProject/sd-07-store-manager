const {
  addProductModel,
  getAllProductsModel,
  getProductByIdModel,
} = require('../models/productsModel');

const objErr = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const addProductService = async(name, quantity) => {
  return await addProductModel(name, quantity);
};

const getAllProductsService = async() => {
  return await getAllProductsModel();
};

const getProductByIdService = async(id) => {
  const objProduct = await getProductByIdModel(id);
  if(!objProduct) {
    objErr.err.message = 'Wrong id format';
    return objErr;
  }
  return objProduct;
};

module.exports = {
  addProductService,
  getAllProductsService,
  getProductByIdService,
};
