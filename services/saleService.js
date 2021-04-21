const productModel = require('../models/productModel');
const message = require('./messageService.json');

const Model = productModel;

const getAll = async () => {};

const getById = async (id) => {

};

const create = async (name, quantity) => {
  const result = Model.createProduct(name, quantity);

};

const update = async (id, name, album) => {};

const exclude = async (id) => {};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude
};
