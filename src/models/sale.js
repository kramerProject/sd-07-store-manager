const connection = require('./connection');

const create = async (soldProducts) =>
  connection()
    .then ((db) => db
      .collection('sales')
      .insertOne({ itensSold: [...soldProducts] }
      )
    );

module.exports = {
  create,
};