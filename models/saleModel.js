// findOneAndUpdate, comando usado em updateSale:
// https://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate

// findOneAndDelete, comando usado em updateSale:
// https://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndDelete

const connection = require('./conn');

const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  const allSales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return {
    sales: allSales
  };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection().then((db) =>
  		db.collection('sales').findOne(ObjectId(id))
  	);
};

const createSale = async (reqSale) => {
  const newItem = { itensSold: reqSale};
  const sale = await connection().then((db) =>
  		db
  			.collection('sales')
  			.insertOne({ ...newItem })
  );

	  return {
    _id: sale.insertedId,
    ...newItem
  };
};

const updateSale = async ({ id, reqSale }) => {
  if (!ObjectId.isValid(id)) return null;

	  const updatedItem = await connection().then((db) =>
		  db
			  .collection('sales')
			  .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { 'itensSold': reqSale } },
        { returnOriginal: false }
      ));
	  return updatedItem ['value']; // pra retornar apenas chave value
};

const deleteSale = async (id) => {
	  if (!ObjectId.isValid(id)) return null;

	  const deletedItem = await connection().then((db) =>
		  db
      .collection('sales')
      .findOneAndDelete(
        { _id: ObjectId(id) }
      ));
  return deletedItem ['value']; // pra retornar apenas chave value
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
};
