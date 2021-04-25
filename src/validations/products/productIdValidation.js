const { ObjectId } = require('mongodb');

const productIdValidation = (id) => {
  console.log(ObjectId.isValid(id));
  console.log(ObjectId(id));
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  return false;
};

module.exports = productIdValidation;
