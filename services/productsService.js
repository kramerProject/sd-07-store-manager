const {
  addProductModel,
  findProductModel,
  getAllProductsModel,
  getProductByIdModel,
  updateProductModel,
  deleteProductModel,
} = require('../models/productsModel');

const objErr = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const addProductService = async(name, quantity) => {
  const productExists = await findProductModel(name);
  if (productExists) return false;
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

const updateProductService = async(id, name, quantity) => {
  const minQuantity = 1;
  if (quantity < minQuantity) return false;
  return await updateProductModel(id, name, quantity);
};

const deleteProductService = async(id) => {
  const objDeleted = await deleteProductModel(id);
  if (!objDeleted) {
    objErr.err.message = 'Wrong id format';
    return objErr;
  }
  return objDeleted;
};

module.exports = {
  addProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};
