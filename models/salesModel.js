const connection = require('../config/conn');

const createSalesModel = async(salesArrayOfItens) => {
  const db = await connection();
  const product = await db
    .collection('sales')
    .insertOne({ itensSold: [...salesArrayOfItens] });
  return product.ops[0];
};

module.exports = { createSalesModel };
