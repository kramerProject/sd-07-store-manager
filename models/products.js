const { ObjectId } = require('bson');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const newProduct = {
    name,
    quantity,
  };
  connection().then((db) => {
    db.collection('products').insertOne(newProduct);
  });
  return connection().then((db) => db.collection('products').find({ name }).toArray());
};

const getAllProducts = async () => {
  const allProducts = await connection().then((db) => {
    return db.collection('products').find().toArray();
  });
  return allProducts;
};

const getProductById = async (id) => {
  return await connection()
    .then((db) => {
      return db
        .collection('products')
        .find({ _id: ObjectId(id) })
        .toArray();
    })
    .catch((rej) => {
      return false;
    });
};

const updateProduct = async (name, quantity, id) => {
  await connection()
    .then((db) => {
      db
        .collection('products')
        .updateOne({ _id: ObjectId(id) }, 
          { $set: { name, quantity } 
          });
    });
  return connection().then((db) =>
    db
      .collection('products')
      .find({ _id: ObjectId(id) })
      .toArray(),
  );
};

const deleteProduct = async (id) => {
  return await connection()
    .then(async (db) => {
      const target = await db
        .collection('products')
        .find({ _id: ObjectId(id) })
        .toArray();
      await connection().then((db) => {
        db.collection('products').deleteOne({ _id: ObjectId(id) });
      });
      return target;
    })
    .catch((rej) => {
      return false;
    });
};

const isNameExists = async (name) => {
  const numberDoc = await connection().then(async (db) => {
    return await db.collection('products').find({ name }).count();
  });
  if (numberDoc >= 1) return true;
  return false;
};

module.exports = {
  createProduct,
  isNameExists,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
