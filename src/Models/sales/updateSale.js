const { ObjectId } = require('bson');
const connection = require('../connection');
require('dotenv').config();

const getSale = (id, result) => {
  return { _id: id, itensSold: [result] };
};
const updateSale = async (id, updateData) => {
  const params = { $set: { itensSold: updateData  } };
  const options = { upsert: true };
  const filter = {_id: ObjectId(id)};
  return connection()
    .then((db) =>
      db.collection(process.env.DB_COLLECTION_SALES)
        .updateOne(filter, params, options),
    )
    .then((result) => getSale(id, updateData))
    .catch((error) => `Erro na model updateSale: ${error}`);
};

module.exports = {
  updateSale,
};
