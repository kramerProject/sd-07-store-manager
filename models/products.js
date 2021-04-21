const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products')
      .find().toArray());
};

const create = async (name, quantity) => {
  const product  = await connection()
    .then((db) =>
      db.collection('products')
        .insertOne({ name, quantity })
    );
  return product ;
};

const findByid = async (id) => {
  return await connection()
    .then((db) => db.collection('products')
      .findOne(ObjectId(id)));
};

// const findByName = async(name) => {
//   return await connection()
//     .then((db) => db.collection('products')
//       .findOned({ name }));
// };

const productAtual = async (id, name, quantity) => {
  return await connection()
    .then((db) =>
      db.collection('products')
        .updateOne(
          { _id: ObjectId(id) }, { $set: { name, quantity } }));
};

const deleteProduct = async (id) => {
  return await connection()
    .then((db) => db.collection('products')
      .deleteOne( { _id: ObjectId(id) }));
};


module.exports = {
  getAll,
  create,
  findByid,
  //findByName,
  productAtual,
  deleteProduct,
};
