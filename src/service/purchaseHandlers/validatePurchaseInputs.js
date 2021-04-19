const { authPdtAmount } = require('../validateInputs');
const { getOnePdt } = require('../../models');

const BAD_INPUT = 'Unprocessable Entity';

const validateProductId = async (pdtId) => {
  const pdtExists = await getOnePdt(pdtId);
  return pdtExists
    ? false
    : { err: 'invalid_data', status: BAD_INPUT,
      clientErr: true, message: 'Wrong PRODUCT id format'  };
};

const validateQtty = (quantity) => {
  return authPdtAmount(quantity)
    // project requirements are not favorable to function reuse
    ? { err: 'invalid_data', status: BAD_INPUT,
      clientErr: true, message: 'Wrong product ID or invalid quantity' }
    : false;
};

module.exports = { validateProductId, validateQtty };
