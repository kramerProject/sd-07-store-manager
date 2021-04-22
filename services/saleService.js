const { ObjectId } = require('mongodb');

const productModel = require('../models/productModel');
const message = require('./messageService.json');

const Model = productModel;

const getAll = async () => {};

const idValid = (id) => {
  if (!ObjectId.isValid(id)) return message.saleIsValid;
  return true;
};

const quantityValid = (quantity) => {
  const zero = 0;
  if (quantity === null) return message.saleIdOrQuantValid;
  if (typeof quantity !== 'number') return message.saleIdOrQuantValid;
  if (quantity <= zero) return message.saleIdOrQuantValid;
  return true;
};

const getById = async (id) => {
  const validateId = idValid(id);
  if (validateId !== true) return validateId;
  return true;
};

const create = async (sale) => {
  const validatedQ = sale.map((item) => quantityValid(item.quantity));
  if (validatedQ !== true) return validatedQ[0];
  const validatedId = sale.map((item) => idValid(item.id));
  if (validatedId !== true) return validatedId[0];
  return true;
};

const update = async ({id, sale}) => {
  const validateId = idValid(id);
  if (validateId !== true) return validateId;
  if (sale) {    
    const validatedQ = sale.map((item) => quantityValid(item.quantity));
    if (validatedQ !== true) return validatedQ[0];
    const validatedId = sale.map((item) => idValid(item.id));
    if (validatedId !== true) return validatedId[0];
  }
  if (!sale) return message.saleIsValid;
  return true;
};

const exclude = async (id) => {
  const validateId = idValid(id);
  if (validateId !== true) return message.idValidDeletion;
  const sale = await Model.getById(id);
  console.log('sale', sale);
  if (sale === null) return message.saleIsValid;
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude
};
