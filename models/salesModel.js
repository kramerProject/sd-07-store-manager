const { ObjectId } = require('mongodb');
const connection = require('./connection');

const updateSale = async(id, name, quantity) => {
  await connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity }}));
  return { _id: id, name, quantity };
};

const createSale = async (itemsSold) => {
  const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: itemsSold }));
    console.log(newSale.ops[0]);
  return { _id: newSale.ops[0]._id, itensSold: itemsSold };
};

const getAllSales = async () => {
  const getSales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return { sales: getSales }
};

const saleById = async (id) => {
  const saleData = await connection()
    .then((db) => db.collection('sales').findOne({_id: ObjectId(id)}))
    .catch((err) => console.log(err));
  console.log({saleData})

  if(!saleData) {
    return {
      err: {
        code: 'not_found',
        message: 'Wrong id format',
      }
    };
  }
  return saleData;
};

module.exports = {
  getAllSales,
  createSale,
  saleById,
  updateSale,
};
