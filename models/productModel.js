const connection = require("../config/conn");
const { ObjectId } = require("mongodb");

const create = async (name, quantity) => {
	const product = await connection().then((db) =>
		db.collection("products").insertOne({ name, quantity })
	);

	return { _id: product.insertedId, name, quantity };
};


module.exports = {	
	create,
};