const { salesModel } = require('../models');
const STATUS_CODE = require('../helper');

/*

  - Será validado que não é possível cadastrar compras com uma string no campo quantidade

  - Será validado que é possível criar uma compra com sucesso
  - Será validado que é possível criar várias compras com sucesso
*/

const checkProductQuantity = (quantity) => {
  const ZERO = 0;
  if (parseInt(quantity, 10) <= ZERO) throw ({
    status: STATUS_CODE.UNPROCESSABLE_ENTITY,
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  });
};

const checkIfQuantityIsString = (quantity) => {
  if (typeof quantity !== 'number') throw ({
    status: STATUS_CODE.UNPROCESSABLE_ENTITY,
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  });
};

const salesRegistration = async (sale) => {
  sale.forEach((el) => {
    checkProductQuantity(el.quantity);
    checkIfQuantityIsString(el.quantity);
  });

  const result = await salesModel.salesRegistration(sale);
  return result;
};

module.exports = {
  salesRegistration
};