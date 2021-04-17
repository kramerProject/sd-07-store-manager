const { ObjectId } = require('bson');
const connection = require('../connection');
const { getSaleById } = require('./getSaleById');

require('dotenv').config();

const deletedSale = async (id, saleData) => {
  return {
    _id: id,
    itensSold:[saleData.itensSold]
  };
};


const deleteSale = async (id) => {
  const sale =  ObjectId(id);
  const document = await getSaleById(id);
  return connection()
    .then((db) =>
      db.collection(process.env.DB_COLLECTION_SALES).deleteOne({ 
        _id: sale
      }),
    )
    .then(() => deletedSale(document._id, document.itensSold))
    .catch((error) => console.log(`Erro no model deleteProduct: ${error}`));
};

module.exports = {
  deleteSale,
};