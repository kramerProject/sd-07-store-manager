const { ObjectId } = require('mongodb');
const { productsModel } = require('../models');

const lessQuantity = 1;
const zero = 0;

// pode virar uma query.
const getQuantityById = (id) => productsModel.getById(id)
  .then((result) => result ? result.quantity : null);


const salesValidate = {
  quantity: (itemsSold) => {
    itemsSold.forEach(({ quantity }) => {
      if (quantity < lessQuantity || !Number.isInteger(quantity))
        throw new Error('Wrong product ID or invalid quantity');
    });
  },

  stock: async (itemsSold) => {
    const promises = itemsSold.map( async ({ productId, quantity }) => {
      const stockQuantity = await getQuantityById(productId);
      if ((stockQuantity - quantity) < zero) {
        throw new Error('Such amount is not permitted to sell');
      }
    });

    await Promise.all(promises);
  },

  id: (id) => {
    if (!ObjectId.isValid(id)) throw new Error('Wrong sale ID format');
  },

};

module.exports = salesValidate;
