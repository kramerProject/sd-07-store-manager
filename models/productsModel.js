const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const getNewProduct = ({ id, name, quantity }) => {
  return {
    id,
    name,
    quantity,
  }
}

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray())
        .then((products) => products.map(({ _id, name, quantity }) =>
            getNewProduct({
              id: _id,
              name,
              quantity,
            })
        )
    );
}

const createProduct = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => getNewProduct({ id: result.insertedId, name, quantity }))
}

// const findProductById = async (id) => {
//   if (!ObjectId.isValidId(id)) {
//     return null
//   }

//   const productsData = await connection()
//     .then((db) => db.collection('products').findOne(new ObjectId(id)));

//   if(!productsData) return null;

//   const { name, quantity } = productsData;

//   return getNewProduct({ id, name, quantity });
// }

// const findProductByName = async (name) => {
//   const productsData = await connection()
//     .then((db) => db.collection('products').findOne({name}));

//   if(!productsData) return null;

//   const { name, quantity } = productsData;

//   return getNewProduct({ id, name, quantity });
// }

module.exports = {
  getNewProduct,
  getAllProducts,
  createProduct,
  // findProductById,
  // findProductByName,
}
