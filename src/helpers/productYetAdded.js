const conn = require('../../config/conn');

const productYetAdded = async (name) => {
  const query = await conn()
    .then((db) =>
      db.collection('products')
        .findOne({ 'name': name }));

  return query ? true : false;
};

module.exports = productYetAdded;
