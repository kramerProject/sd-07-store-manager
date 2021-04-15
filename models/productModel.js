const connection = require('./conn');

const { ObjectId } = require('mongodb');

const getAllProducts = async () =>
  await connection()
    .then((db) => db.collection('products').find().toArray());

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection().then((db) =>
  		db.collection('products').findOne(ObjectId(id))
  	);
};

const getProductByName = async (name) => {
  return await connection().then((db) =>
    db
      .collection('products')
      .findOne({name})
  );
};

const createProduct = async (name, quantity) => {
  	const product = await connection().then((db) =>
  		db
  			.collection('products')
  			.insertOne({ name, quantity })
  );

	  return { _id: product.insertedId, name, quantity };
};

const updateProduct = async ({ id, name, quantity }) => {
	  if (!ObjectId.isValid(id)) return null;

	  const product = await connection().then((db) =>
		  db
			  .collection('products')
			  .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
	  );
	  return product;
};

const deleteProduct = async (id) => {
	  if (!ObjectId.isValid(id)) return null;

	  return await connection().then((db) => {
		  return db.collection('products').deleteOne({ _id: ObjectId(id) });
	  });
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct
};
