const connection = require('../connection');
const { validationsToAdd } = require('./saleErrors');
const { ObjectId } = require('mongodb');

const addSale = async (body) => {
  const isNotValid = await validationsToAdd(body);
  if (isNotValid) throw new Error('Wrong product ID or invalid quantity');

  await connection().then((db) => db.collection('sales').insertMany(body));

  return { _id: body[0].productId, itensSold: body };
};

const getAllSales = async () => {
  const sold = await connection().then((db) => db.collection('sales').find({}).toArray());

  return { _id: sold[0].productId, itensSold: sold };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Sale not found');

  const sold = await connection().then((db) => 
    db.collection('sales').findOne(ObjectId(id)));

  return { _id: sold[0].productId, itensSold: sold };
};

// const uptadeProduct = async (id, name, quantity) => {
//   const isNotValid = await validationsToUpdate(name, quantity);
//   if (isNotValid) throw new Error(isNotValid);

//   await connection().then((db) => db.collection('products')
//     .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
//   );

//   return { _id: ObjectId(id), name, quantity };
// };

// const deleteProduct = async (id) => {
//   if (!ObjectId.isValid(id)) throw new Error('Wrong id format');

//   return await connection().then((db) => {
//     const itemId = new ObjectId(id);
//     return db.collection('products').findOneAndDelete({ _id: itemId })
//       .then((result) => result.value);
//   });
// };

module.exports = {
  addSale,
  getAllSales,
  getSaleById
  // uptadeProduct,
  // deleteProduct
};
