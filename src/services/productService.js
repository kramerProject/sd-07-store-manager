const productModel = require('../models/productModel');

const create = async (name, quantity) => {
  await productModel.create(name, quantity);  
  const product =  await productModel.findByName(name);

  return product;
};

const findAll = async () => {
  return {
    products: await productModel.findAll(),
  };
};

const findById = async (id) => {
  const product = await productModel.findById(id);

  return product;
};

const update = async (id, name, quantity) => {
  await productModel.update(id, name, quantity);

  return { _id: id, name, quantity };
};

const exclude = async (id) => {
  const product = await productModel.findById(id);
  await productModel.exclude(id);

  return product;
};


const updateProductsSales = async (id, quantity) => {
  const product = await productModel.findById(id);

  const saleQuantity = product.quantity + quantity;

  await productModel.update(id, product.name, saleQuantity);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
  updateProductsSales,
};
