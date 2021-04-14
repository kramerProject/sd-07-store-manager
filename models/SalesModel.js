const connection = require('../configs/connection');


const createSale = async (itensSold) => {
  const salesRes = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));

  return salesRes.ops[0];
};


module.exports = {
  createSale
};