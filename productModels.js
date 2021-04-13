const conn = require('./connection');

const addProduct = async (name, quantity) => {
  const item = await conn.then((db) =>
    db.collection('products').insertOne({ name, quantity }));

  return { _id: item.insertedId, name, quantity };
};

module.exports = {
  addProduct,
};
