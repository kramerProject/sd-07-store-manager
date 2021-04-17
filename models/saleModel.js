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

const updateSale = async ({ id, productId, quantity }) => {
	  if (!ObjectId.isValid(id)) return null;

	  const sale = await connection().then((db) =>
		  db
			  .collection('sales')
			  .updateOne({ _id: ObjectId(id) }, { $set: { productId, quantity } })
	  );
	  return sale;
};

const deleteSale = async (id) => {
	  if (!ObjectId.isValid(id)) return null;

	  return await connection().then((db) => {
		  return db.collection('sales').deleteOne({ _id: ObjectId(id) });
	  });
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
};
