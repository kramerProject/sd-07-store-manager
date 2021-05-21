const { salesModel } = require('../models');
const productService = require('./productService');
const salesValidate = require('./salesValidate');

const getAll = async () => ({ sales: await salesModel.getAll() });

const getById = async (id) => {
  return salesModel.getById(id)
    .then((result) => {
      if (!result) {
        throw new Error('Sale not found');
      } else {
        return result;
      }
    });
};

const create = async (itensSold) => {
  salesValidate.quantity(itensSold);
  await salesValidate.stock(itensSold);
  await productService.updateQuantityStock(itensSold);
  return salesModel.create(itensSold);
};

const update = async (id, itensSold) => {
  salesValidate.quantity(itensSold);
  await salesValidate.stock(itensSold);
  await productService.updateQuantityStock(itensSold);
  return salesModel.update(id, itensSold);
  
};

const exclude = async (id) => {
  salesValidate.id(id);
  const ONE = 1;
  // return salesModel.exclude(id);
  // await productService.updateQuantityStock(itensSold, ONE);
  return salesModel.exclude(id)
    .then(async (result) => {
      await productService.updateQuantityStock([
        { _id: result._id, quantity: result.quantity }
      ], ONE);
      console.log(result.documents);
      return result;
    });
};

module.exports = { getAll, getById, create, update, exclude };
