const connection = require('../config/connection');
const { ObjectId } = require('mongodb');
const createProduct = async (name, quantity) => {
  const checkNameExistis = await connection().then((db) =>
    db.collection('products').findOne({ name: name }),
  );
  if (checkNameExistis) return null;
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return {
    _id: result.insertedId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const result = await connection()
    .then((db) => db.collection('products').find().toArray());

  return {
    products: result,
  };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)),
  );

  if (!result) return null;
  return result;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const resultCheck = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)),
  );
  if (!resultCheck) return null;
  await connection().then((db) =>
    db.collection('products').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name: name,
          quantity: quantity,
        },
      },
    ),
  );
  return {
    _id: id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const resultCheck = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)),
  );
  if (!resultCheck) return null;
  await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

  return resultCheck;
};

const updateQuantity = async (id, qtd, check) => {
  if (!ObjectId.isValid(id)) return null;
  const resultCheck = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)),
  );

  if (!resultCheck) return null;
  if (check === 'sum') {
    await connection().then((db) =>
      db.collection('products')
        .updateOne({ _id: ObjectId(id) }, { $inc: { quantity: -qtd } }),
    );
    return true;
  }

  if (check === 'subtract') {
    await connection().then((db) =>
      db.collection('products')
        .updateOne({ _id: ObjectId(id) }, { $inc: { quantity: qtd } }),
    );
    return true;
  }
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
  updateQuantity,
};
