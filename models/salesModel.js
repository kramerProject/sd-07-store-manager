const connection = require('../configurations/connection');
const { ObjectId } = require('mongodb');

const { DB_NAME_SALES } = process.env;

const createNewSale = async (arraySales) => {
  const db = await connection();
  // A desestruturacao foi sugestão do Thadeu
  return await db.collection(DB_NAME_SALES).insertOne({ itensSold: [...arraySales] });
};

const getAllSales = async () => {
  const db = await connection();
  return await db.collection(DB_NAME_SALES).find().toArray();
};

const getSaleById = async (id) => {
  const db = await connection();
  return await db.collection(DB_NAME_SALES).findOne(new ObjectId(id));
};

const updateSaleById = async (id, arraySales) => {
  const db = await connection();
  const updated = await db
    .collection(DB_NAME_SALES)
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: arraySales } });

  if (!updated) return null;
  return {
    _id: id,
    itensSold: arraySales,
  };
};

const deleteSaleById = async (id) => {
  const db = await connection();
  const deleted = await db.collection(DB_NAME_SALES).deleteOne({ _id: ObjectId(id) });
  if (deleted.deletedCount !== 1) return null;
  return id;
};

module.exports = {
  createNewSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};
