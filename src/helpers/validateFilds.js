const { messageError } = require('./MessageResponse');

const { numbers } = require('./Numbers');

const validateFields = (name, quantity) => {
  if (name.length <= numbers.CINCO) {
    return messageError('"name" length must be at least 5 characters long');
  }
  if (parseInt(quantity) <= numbers.ZERO) {
    return messageError('"quantity" must be larger than or equal to 1');
  }
  if (isNaN(parseInt(quantity))) {
    return messageError('"quantity" must be a number');
  }
  return {
    status: 'success',
  };
};

module.exports = {
  validateFields,
};
