
const lessQuantity = 1;

const salesValidate = {
  quantity: (itemsSold) => {
    itemsSold.forEach(({ quantity }) => {
      if (quantity < lessQuantity || !Number.isInteger(quantity))
        throw new Error('Wrong product ID or invalid quantity');
    });
  },
};

module.exports = salesValidate;
