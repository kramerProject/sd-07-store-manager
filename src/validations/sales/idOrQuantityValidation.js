const { ObjectId } = require('mongodb');

const idOrQtdValidate = (id, quanity) => {
  if (!ObjectId.isValid(id) || +quanity < 1 || typeof quanity !== 'number') {
    throw new Error('Wrong product ID or invalid quantity');
  }
  return false;
};

module.exports = idOrQtdValidate;
