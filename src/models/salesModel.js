const getConnection = require('./connection');
const { ObjectId } = require('mongodb');

const getSales = async () => 
  getConnection('sales').then(db => db.find().toArray());

async function getSaleById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection('sales');
  const sale = await db.find(ObjectId(id)).toArray();

  return sale[0];
};

async function newSale(array) {
  const verifyIds = array.some(({ productId: id }) => !ObjectId.isValid(id));
  if (verifyIds) return null;

  const db = await getConnection('sales');
  const response = await db.insertOne({ itensSold: array });
  return response.ops[0];
};

async function updateSale(id, array) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection('sales');
  await db.updateOne({ _id: ObjectId(id) }, { $set: { itensSold: array } });

  return { _id: id, itensSold: array };
};

const deleteSale = async (id) => getConnection('sales')
  .then(db => db.deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getSales,
  getSaleById,
  newSale,
  updateSale,
  deleteSale
};
