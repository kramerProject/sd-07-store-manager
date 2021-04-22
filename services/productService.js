const { ObjectId } = require('mongodb');

const productModel = require('../models/productModel');
const message = require('./messageService.json');

const Model = productModel;

const getAll = async () => {};

const idValid = (id) => {
  if (!ObjectId.isValid(id)) return message.idValid;
  return true;
};

const nameValid = (name) => {
  const five = 5;
  if (name === undefined || name === null) return message.nameExists;
  if (typeof(name) !== 'string') return message.nameString;
  if (name.length <= five) return message.nameLength;
  return true;
};

const quantityValid = (quantity) => {
  const zero = 0;
  if (quantity === null) return message.quntityExists;
  if (typeof quantity !== 'number') return message.quantityNumber;
  if (quantity <= zero) return message.quantityPositive;
  return true;
};

const uniqueValid = async (name) => {
  const products = await Model.getAll();
  const exists = await products
    .find((product) => product.name === name );
  if (exists) return message.nameUnique;
  return true;
};

const getById = (id) => {
  const validateId = idValid(id);
  if (validateId !== false) return validateId;
  return true;
};

const create = async ({ name, quantity }) => { 
  const validateQ = quantityValid(quantity);
  if (validateQ !== true) return validateQ;
  const validateN = nameValid(name);
  if (validateN !== true) return validateN;
  const ValidateU = await uniqueValid(name);
  if (ValidateU !== true) return ValidateU;
  return true;
};

const update = async ({ id, name, quantity }) => {
  const validateId = idValid(id);
  if (validateId !== true) return validateId;
  const validateQ = quantityValid(quantity);
  if (validateQ !== true) return validateQ;
  const validateN = nameValid(name);
  if (validateN !== true) return validateN;
  const ValidateU = await uniqueValid(name);
  if (ValidateU !== true) return ValidateU;
  return true;
};

const exclude = async (id) => {
  const validateId = idValid(id);
  if (validateId !== true) return validateId;
  const product = await Model.getById(id);
  if (product === null) return validateId;
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude
};
