const connect = require('../config/connection');
// const { ObjectId } = require('mongodb');

async function add(name, quantity) {
  connect().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });
    console.log(product);
    return product.ops[0];
  });
}

// async function getAllProducts() {
//   connect().then((db) => db.collection('products').find().toArray());
// }

// async function getById(id) {
//   if (!ObjectId.isValid(id)) return null;
//   return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
// }

// async function update(id, name, quantity) {
//   connect().then(async (db) => {
//     const product = await db
//       .collection('products')
//       .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
//     return { _id: id, name, quantity };
//   });
// }

// async function exclude(id) {
//   connect().then(async (db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
// }


module.exports = {
  add,
  // getAllProducts,
  // getById,
  // update,
  // exclude,
};
