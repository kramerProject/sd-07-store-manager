const Product = require('../models/productModel');
const Sale = require('../models/saleModel');
const statusCodes = require('../utils/statusCodes');
const { errorReturn, code, msg } = require('../utils/errorMsg');

const getByIdService = async (id) => {
  const sale = await Sale.getById(id);
  if (!sale) {
    return {
      status: statusCodes.NOT_FOUND,
      msg: errorReturn(code.notFound, msg.saleNotFound),
    };
  }
  return { status: statusCodes.OK, msg: sale };
};

const createSaleService = async (itensSold) => {
  const product = await Product.getById(itensSold[0].productId);
  if (product.quantity < itensSold[0].quantity) {
    return {
      status: statusCodes.NOT_FOUND,
      msg: errorReturn(code.stockProblem, msg.wrongSaleAmount)
    };
  }
  const newQty = product.quantity - itensSold[0].quantity;
  await Product.update(product._id, product.name, newQty);
  const sale = await Sale.create(itensSold);
  return { status: statusCodes.OK, msg: sale };
};

const deleteSaleService = async (id) => {
  const sale = await Sale.getById(id);
  if (!sale) {
    return {
      status: statusCodes.UNPR_ENTITY,
      msg: errorReturn(code.invData, msg.wrongSaleIdFormat)
    };
  }
  const product = await Product.getById(sale.itensSold[0].productId);
  const newQty = product.quantity + sale.itensSold[0].quantity;
  await Product.update(product._id, product.name, newQty);
  const deletedSale = await Sale.exclude(id);
  return { status: statusCodes.OK, msg: deletedSale };
};

module.exports = {
  getByIdService,
  createSaleService,
  deleteSaleService,
};
