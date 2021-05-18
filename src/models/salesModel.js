const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  let output = []; 
  await connection()
    .then((db) => db.collection('sales').insertOne({itensSold}))
    .then(result => output = result.ops[0]);
  return output;
};

const getAll = async () => {
  let output = [];
  await connection()
    .then((db) => db.collection('sales').find({}).toArray())
    .then(result => {
      output = result;
    });
  return output;
};

const getById = async (id) => {
  let output= [];
  if (!ObjectId.isValid(id)) {
    return output;
  }
  await connection()
    .then((db) => db.collection('sales').findOne({_id: ObjectId(id)}))
    .then((result) => { output = result; });
    
  return output;
};

// const getByName = async (name) => {
//   return connection()
//     .then((db) => db.collection('products').find({name}).toArray())
//     .then((result) => { return result[0]; });
// };




// const setById = async (id, newName, newQuantity) => {
//   if (!ObjectId.isValid(id)) {
//     return null;
//   }

//   connection().then(db =>{
//     db.collection('products').updateOne(ObjectId(id),
//       {
//         $set:{
//           name: newName,
//           quantity: newQuantity,
//         }  
//       });
//   });
// };
const deleteById = async (id) => {
  console.log('test', !ObjectId.isValid(id));
  if (!ObjectId.isValid(id)) {
    return null;
  }

  await connection().then(db => {
    db.collection('sales').deleteOne({_id: ObjectId(id)});
  });
  return [];
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
};
