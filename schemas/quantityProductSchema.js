const {unprocessableEntity, minQuantity} = require('../messages/messageCodes');
const {largerThanOne, mustBeNumber} = require('../messages');
const {objectError, isQuantityLetterThan, isString} = require('../helpers');
const validateQuantity = (quantity) => {

  if(isQuantityLetterThan (quantity, minQuantity)) return {
    code: unprocessableEntity,
    message: objectError(largerThanOne)
  };

  if (isString(quantity)) return {
    code: unprocessableEntity,
    message: objectError(mustBeNumber)
  };

  return false;
};

module.exports = {validateQuantity};
