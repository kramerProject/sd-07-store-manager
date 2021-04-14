const Product = require('../models/productsModel');

const create = async (name, quantity) => {
  const { insertedId } = await Product.create(name, quantity);

  const newProduct = {
    _id: insertedId,
    name,
    quantity,
  };

  return { code: 201, newProduct };
};

const findAll = async () => {
  const products = await Product.findAll();
  return { code: 200, products };
};

const findById = async (id) => {
  const product = await Product.findById(id);
  return { code: 200, product };
};

const update = async (id, name, quantity) => {
  const product = await Product.update(id, name, quantity);
  return { code: 200, product };
};

const remove = async (id) => {
  const { deletedCount } = await Product.remove(id);
  console.log('service', deletedCount);
  return { code: 200, deletedCount };
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
