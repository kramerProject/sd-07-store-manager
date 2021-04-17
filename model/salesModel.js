const conn = require('./connection');


const insertNewSale = async (sales) => {
  const { insertedId } = await conn().then((db) =>
    db.collection('sales').insertOne({ itensSold: [...sales] }),
  );
  return {
    _id: insertedId,
    itensSold: [...sales]
  };
};

module.exports = {
  insertNewSale,
};