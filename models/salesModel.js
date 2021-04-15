const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const create = async (products) =>
  connection().then(async (db) => {
    const sale = await db.collection('sales')
      .insertOne({ itensSold: products });

    return sale.ops[0];
  });

// const update = async (id, name, quantity) =>
//   connection().then(async (db) => {
//     await db.collection('products')
//       .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
//     return { id, name, quantity };
//   });

// const getByName = async (name) => {
//   try {
//     const product = await connection().then((db) =>
//       db.collection('products')
//         .findOne({ name }),
//     );
//     return product;
//   } catch (err) {
//     console.error(err);
//     return { err };
//   }
// };

// const getAll = async () =>
//   connection().then(async (db) => {
//     const products = await db.collection('products')
//       .find().toArray();
//     return {products};
//   });

// const getById = async (id) => {
//   const product = await connection().then((db) =>
//     db.collection('products')
//       .findOne(ObjectId(id)),
//   );
//   return product;
// };
// const deleteProduct = async (id) => {
//   const product = await connection().then((db) =>
//     db.collection('products')
//       .findOneAndDelete({ _id: ObjectId(id) }),
//   );
//   return product.value;
// };

module.exports = {
  create,
  // getByName,
  // getAll,
  // getById,
  // update,
  // deleteProduct,
};

