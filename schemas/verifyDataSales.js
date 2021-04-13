const zero = 0;

const code = {
  invalid_data: 'invalid_data',
};

const message = {
  name_length: '"name" length must be at least 5 characters long',
  product_exists: 'Product already exists',
  quantity_less_than_zero: '"quantity" must be larger than or equal to 1',
  quantity_not_number: '"quantity" must be a number',
  default: 'Wrong product ID or invalid quantity'
};

const isQuantityLessThanZero = (quantity) => (quantity <= zero);
const isNotNumber = (quantity) => (typeof quantity !== 'number');

const verifyDataSales = async ( itensSold ) => {
  for (let index = zero; index < itensSold.length; index += 1 ) {
    if (isQuantityLessThanZero(itensSold[index].quantity))
      return { code: code.invalid_data, message: message.default };
    if (isNotNumber(itensSold[index].quantity))
      return { code: code.invalid_data, message: message.default };
  }
  return {};
};

module.exports = verifyDataSales;
