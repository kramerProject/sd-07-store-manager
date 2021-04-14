const connect = require('../config/connn');
const { ObjectId } = require('mongodb');

// const getAll = async () => {
//   connect().then((db) => db.collection('products').find().toArray());
// };

// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) return null;

//   return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
// };

const add = async (name, quantity) =>
  connect().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });

    // estrutura padrao da biblioteca do node
    // ele retorna de dentro de um atributo de ops um array
    return product.ops[0];
  });

const getByProductName = async (name) => {
  // const product = await connect().then((db) =>
  //   db.collection('products').findOne({ name }),
  // );
  // return product;
  return connect().then((db) => db.collection('products').findOne({ name }));
};

// const update = async(id, name, quantity) => {
//   connect().then(async (db) => {
//     const product = await db
//       .collection('products')
//       // o primeiro campo id é o filtro, em que encontro um item com esse id
//       //em seguida uso o set para mopstrar quais campos quero atualziar
//       .updateOne({ _id: ObjectId(id)}, { $set: { name, quantity } });

//     return { _id: id, name, quantity };
//   });
// };

// const exclude = async(id) => {
//   connect().then( async (db) => {
//     db.collection('products').deleteOne({ _id: ObjectId(id) });
//   });
// };

module.exports = {
  // getAll,
  getByProductName,
  // getById,
  add,
  // update,
  // exclude
};