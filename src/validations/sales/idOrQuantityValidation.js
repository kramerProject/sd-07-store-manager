const { ObjectId } = require('mongodb');

const idOrQtdValidate = (id, quanity) => {
  if (!ObjectId.isValid(id) || +quanity < 1 || typeof quanity !== 'number') {
    throw new Error('Wrong product id or invalidy quantity');
  }
  return false;
};

module.exports = idOrQtdValidate;
