const Sales = require('../models/Sales');

const getAll = async () => {
  return await Sales.getAll();
};

module.exports = {
  getAll,
};