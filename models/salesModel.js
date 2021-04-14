const connection = require('../config/connections');

const createSales = async (itensSold) => {
  const newSale = await connection().then((db) =>
    db.collection('products').insertOne({ itensSold }),
  );
  return { _id: newSale.insertedId, itensSold };
};

module.exports = {
  createSales,
};