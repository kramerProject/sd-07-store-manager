const {unprocessableEntity, minQuantity} = require('../messages/messageCodes');
const {invalidQuantity, invalidData} = require('../messages');
const {objectError, isQuantityLetterThan, isString} = require('../helpers');
const validateQuantity = (quantity) => {

  if(isQuantityLetterThan (quantity, minQuantity) || isString(quantity)) return {
    code: unprocessableEntity,
    message: objectError(invalidData, invalidQuantity)
  };

  return false;
};

module.exports = {validateQuantity};
