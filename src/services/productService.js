const productModel = require('../models/productModel');

const create = async (name, quantity) => {
  const product = await productModel.create(name, quantity);  

  return { _id: product.insertedId, name, quantity };
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

  const saleQuantity = await product.quantity + quantity;

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
