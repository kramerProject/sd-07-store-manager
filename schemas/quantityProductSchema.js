const {unprocessableEntity, minQuantity} = require('../messages/messageCodes');
const {largerThanOne, mustBeNumber, invalidData} = require('../messages');
const {objectError, isQuantityLetterThan, isString} = require('../helpers');
const validateQuantity = (quantity) => {

  if(isQuantityLetterThan (quantity, minQuantity)) return {
    code: unprocessableEntity,
    message: objectError(invalidData,largerThanOne)
  };

  if (isString(quantity)) return {
    code: unprocessableEntity,
    message: objectError(invalidData, mustBeNumber)
  };

  return false;
};

module.exports = {validateQuantity};
