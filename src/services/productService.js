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

const findAll = async () => await Product.findAll();

const findById = async (id) => await Product.findById(id);

const update = async (id, name, quantity) => await Product.update(id, name, quantity);