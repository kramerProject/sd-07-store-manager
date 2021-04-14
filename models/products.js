const connection = require('./connection');

const { ObjectId } = require('mongodb');

const { throwError } = require('../utils/errorHandler');

const { status, errors } = require('../utils/status');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('StoreManager').find().toArray())
    .then((value) => {
      return value.map(({ _id, name, quantity }) => {
        return {
          _id,
          name,
          quantity,
        };
      });
    });
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const ident = String(id);
  return await connection().then((db) =>
    db
      .collection('StoreManager')
      .findOne(ObjectId(ident))
      .then((result) => result),
  );
};

const getByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('StoreManager').findOne({ name }))
    .then((result) => result);
  if (product === null) return [];
  return product;
};

const postdata = async (name, quantity) => {
  // console.log(name, quantity);
  const createdProduct = await connection()
    .then((db) =>
      db.collection('StoreManager').insertOne({
        name,
        quantity
      }),
    );
  return createdProduct;
};

const editdata = async (id, name, quantity) => {
  // if (!ObjectId.isValid(id)) return null;
  const updatedProduct = await connection().then((db) =>
    db.collection('StoreManager')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return updatedProduct;
};

const deletedata = async (id) => {
  // if (!ObjectId.isValid(id)) return null;
  const deletedProduct = await connection()
    .then((db) => {
      db.collection('StoreManager').deleteOne({ _id: ObjectId(id) });
    })
    .catch((err) => {
      throw new throwError(status.unprocessableEntity, errors.wrongId);
    });
  return deletedProduct;
};

module.exports = {
  getAll,
  getById,
  getByName,
  postdata,
  editdata,
  deletedata,
};