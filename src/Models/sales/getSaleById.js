const { ObjectId } = require('bson');
const connection = require('../connection');
require('dotenv').config();

const getSale = (id, result,) => {
  return {_id: id, itensSold: result};
};
const getSaleById = async (id) => {
  const params = ObjectId(id);
  return connection()
    .then((db) =>
      db.collection('sales').findOne({ 
        _id: params, 
      }),
    )
    .then((result) => getSale(result._id, result ))
    .catch((error) => `Erro na model getSaleById: ${error}`);
};

module.exports = {
  getSaleById,
};