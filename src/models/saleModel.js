const conn = require('../../config/conn');

const postSales = async (sales) => {
  const sale = await conn().then((db) =>
    db.collection('sales').insertOne({ itensSold: sales }));

  return { _id: sale.insertedId, itensSold: sales };
};

const getAllSales = async () => await conn()
  .then((db) =>
    db.collection('sales')
      .find()
      .toArray());

const getSalesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return await conn()
    .then((db) =>
      db.collection('sales')
        .findOne(new ObjectId(id)));
};

module.exports = {
  postSales,
  getAllSales,
  getSalesById,
};
