const {unprocessableEntity, minQuantity} = require('../messages/messageCodes');
const {invalidQuantity} = require('../messages');
const {objectError, isQuantityLetterThan, isString} = require('../helpers');
const validateQuantity = (quantity) => {

  if(isQuantityLetterThan (quantity, minQuantity) || isString(quantity)) return {
    code: unprocessableEntity,
    message: objectError(invalidQuantity)
  };

  return false;
};

module.exports = {validateQuantity};
