const conn = require('./connection');

const insertNewProduct = async (name, quantity) => {
  const { insertedId } = await conn().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const findAll = async () => {
  const result = await conn().then((db) => db.collection('products').find().toArray());
  return JSON.stringify({ products: [...result] });
};

const findById = async (id) => {
  const result = await conn()
    .then((db) => db.collection('products').find({ _id: id }).toArray());
  return result[0];
};

const verifyName = async (name) => {
  const emptyResult = 0;
  const result = await conn().then((db) =>
    db.collection('products').find({ name: name }).toArray(),
  );
  return result.length !== emptyResult ? true : false;
};

module.exports = {
  insertNewProduct,
  verifyName,
  findAll,
  findById,
};
