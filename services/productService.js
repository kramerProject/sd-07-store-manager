const Product = require('../models/productModel');
const statusCodes = require('../utils/statusCodes');
const { errorReturn, code, msg } = require('../utils/errorMsg');

const getByIdService = async (id) => {
  const product = await Product.getById(id);
  if (!product) {
    return {
      status: statusCodes.UNPR_ENTITY,
      msg: errorReturn(code.invData, msg.wrongProdIdFormat)
    };
  }
  return { status: statusCodes.OK, msg: product };
};

const deleteProductService = async (id) => {
  const product = await Product.exclude(id);
  if (!product) {
    return {
      status: statusCodes.UNPR_ENTITY,
      msg:  errorReturn(code.invData, msg.wrongProdIdFormat)
    };
  }
  return { status: statusCodes.OK, msg: product };
};

module.exports = {
  getByIdService,
  deleteProductService,
};
