const connection = require('../config/connection');
const { ObjectID } = require('mongodb');

const insertSales = async (itensSold) => {
  try {
    const db = await connection();
    const sales = await db.collection('sales').insertOne({
      itensSold: [...itensSold],
    });

    return sales.ops[0];
  } catch (error) {
    console.error({ message: 'Sem conexão com o banco' });
  }
};

const showAllSales = async () => {
  try {
    const db = await connection();
    const allSales = await db.collection('sales').find().toArray();
    return allSales;
  } catch (error) {
    console.error({
      message: 'Não tem produto com esse nome no banco',
    });
  }
};

const showSalesId = async (id) => {
  try {
    const db = await connection();
    const sale = await db
      .collection('sales')
      .findOne({ _id: ObjectID(id) });
    return sale;
  } catch (error) {
    console.error({
      message: 'Não tem produto com esse nome no banco',
    });
  }
};
module.exports = {
  insertSales,
  showAllSales,
  showSalesId,
};
