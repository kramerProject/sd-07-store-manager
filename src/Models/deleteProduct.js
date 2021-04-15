const { ObjectId } = require('bson');
const connection = require('../Models/connection');
const { getProductById } = require('./getProductById');

require('dotenv').config();

const deletedProduct = async (id, name, quantity) => {
  return {
    _id: id,
    name,
    quantity: Number(quantity)
  };
};


const deleteProduct = async (id) => {
  const product =  ObjectId(id);
  const document = await getProductById(id);
  console.log(document);
  return connection()
    .then((db) =>
      db.collection('products').deleteOne({ 
        _id: product
      }),
    )
    .then((result) => deletedProduct(document._id, document.name, document.quantity))
    .catch((error) => console.log(`Erro no model deleteProduct: ${error}`));
};

module.exports = {
  deleteProduct,
};