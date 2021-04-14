const productsModel = require('../models/productsModel');

const addProductService = async (name, quantity) => {
  const prodocutName = await productsModel.getByName(name);
  if (prodocutName) return null;

  return await productsModel.add(name, quantity);
};

module.exports = {
  addProductService,
};
