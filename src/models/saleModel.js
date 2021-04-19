const conn = require('../../config/conn');

const postSales = async (sales) => {
  const sale = await conn().then((db) =>
    db.collection('sales').insertOne({ itensSold: sales }));

  return { _id: sale.insertedId, itensSold: sales };
};

module.exports = {
  postSales,
};
