const Sales = require('../Models/Sales');
const Products = require('../Models/Products');

const status = {
  ok: 200,
};

const create = async (product) => {
  const result = await Sales.create(product);
  return {code: status.ok , message:result};
};

module.exports = {
  create,
};