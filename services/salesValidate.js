const { ObjectId } = require('mongodb');

const lessQuantity = 1;

const salesValidate = {
  quantity: (itemsSold) => {
    itemsSold.forEach(({ quantity }) => {
      if (quantity < lessQuantity || !Number.isInteger(quantity))
        throw new Error('Wrong product ID or invalid quantity');
    });
  },

  id: (id) => {
    if (!ObjectId.isValid(id)) throw new Error('Sale not found');
  },
};

module.exports = salesValidate;
