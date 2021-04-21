const productModel = require('../models/productModel');
const message = require('./messageService.json');

const Model = productModel;

const getAll = async () => {};

const getById = async (id) => {

};

const nameValid = (name) => {
  const five = 5;
  if (name === undefined || name === null) return message.nameExists;
  if (typeof(name) !== 'string') return message.nameString;
  if (name.length <= five) return message.nameLength;
  return false;
};

const quantityValid = (quantity) => {
  const zero = 0;
  if (quantity === null) return message.quntityExists;
  if (typeof quantity !== 'number') return message.quantityNumber;
  if (quantity <= zero) return message.quantityPositive;
  return false;
};

const uniqueValid = async (name) => {
  const products = await Model.getAll();
  const exists = await products
    .find((product) => product.name === name );
  if (exists) return message.nameUnique;
  return false;
};

const create = async ({ name, quantity }) => { 
  const validateQ = quantityValid(quantity);
  if (validateQ !== false) return validateQ;
  const validateN = nameValid(name);
  if (validateN !== false) return validateN;
  const ValidateU = await uniqueValid(name);
  if (ValidateU !== false) return ValidateU;
  return true;
};

const update = async ({ id, name, album }) => {};

const exclude = async (id) => {};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude
};
