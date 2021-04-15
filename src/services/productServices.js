const { countByNameDuplicate } = require('../models/productModel');

const AMOUNT = 1;
const NAME_SIZE = 5;
const COUNT_PRODUCTS = 0;
const statusHttp = {
  C_200: 200,
  C_201: 201,
  C_404: 404,
  C_422: 422,
  C_500: 500,
};

const nameLength = (name) => {
  if (name.length < NAME_SIZE)
    return true;
};

const verifyCountName = async (name) => {
  const countName = await countByNameDuplicate(name);
  if (countName > COUNT_PRODUCTS)
    return true;
};

const quantityIsNumber = (quantity) => {
  if (Number.isInteger(quantity))
    return true;
};

const verifyPositiveInteger = (quantity) => {
  if (quantity < AMOUNT)
    return true;
};

module.exports = services = {
  statusHttp,
  nameLength,
  verifyCountName,
  quantityIsNumber,
  verifyPositiveInteger,
};