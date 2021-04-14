const productsModel = require('../model/productsModel');

const subtractProduct = async (itensSold) => {
  itensSold.forEach(item => productsModel.subtractProduct(item));
};

const sumProduct = async (itensSold) => {
  itensSold.forEach(item => productsModel.sumProduct(item));
};

module.exports = {
  subtractProduct,
  sumProduct
};
