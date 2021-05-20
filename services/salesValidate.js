const { ObjectId } = require('mongodb');
const { salesModel } = require('../models');

const lessQuantity = 1;

const salesValidate = {
  quantity: (itemsSold) => {
    itemsSold.forEach(({ quantity }) => {
      if (quantity < lessQuantity || !Number.isInteger(quantity))
        throw new Error('Wrong product ID or invalid quantity');
    });
  },

  id: (id) => {
    if (!ObjectId.isValid(id)) throw new Error('Wrong sale ID format');
  },

};

module.exports = salesValidate;
