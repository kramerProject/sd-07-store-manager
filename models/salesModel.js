const connection = require('../config/connection');

const create = async (body) => {

  const sale = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: [...body] }),
  );

  return { _id: sale.insertedId, itensSold: [...body] };
};

module.exports = { create };
