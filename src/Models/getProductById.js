const { ObjectId } = require('bson');
const connection = require('../Models/connection');
require('dotenv').config();

const getProduct = (id, name, quantity) => {
  return {_id: id, name, quantity};
};
const getProductById = async (id) => {
  const params = ObjectId(id);
  return connection()
    .then((db) =>
      db.collection(process.env.DB_COLLECTION).findOne({ 
        _id: params, 
      }),
    )
    .then((result) => getProduct(result._id,result.name,result.quantity ))
    .catch((error) => `Erro na model getIdProduct: ${error}`);
};

module.exports = {
  getProductById,
};