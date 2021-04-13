const productsModel = require('../model/productsModel');

const zero = 0;

const subtractProduct = async (itensSold) => {
  for( let index = zero; index < itensSold.length; index += 1) {
    await productsModel.subtractProduct(itensSold[index]);
  }
};

const sumProduct = async (itensSold) => {
  for( let index = zero; index < itensSold.length; index += 1) {
    await productsModel.sumProduct(itensSold[index]);
  }
};

module.exports = {
  subtractProduct,
  sumProduct
};
