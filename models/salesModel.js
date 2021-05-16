// const connection = require('./connection');
// // const { ObjectId } = require('mongodb');

// const getNewProduct = ({ id, itensSold }) => {
//   return {
//     id,
//     itensSold: [name, quantity],
//   }
// }


// const getAllProducts = async () => {
//   return connection()
//     .then((db) => db.collection('sales').find().toArray())
//         .then((sales) => sales.map(({ _id, itensSold }) =>
//             getNewProduct({
//               id: _id,
//               itensSold,
//             })
//         )
//     );
// }

// const createSale = async (name, quantity) => {
//   connection()
//     .then((db) => db.collection('sales').insertOne({ name, quantity }))
//     .then((result) => getNewProduct({ id: result.insertedId, name, quantity }))
// }

// module.exports = {
//   getNewProduct,
//   getAllProducts,
//   isValidProduct,
//   findProductById,
//   findProductByName,
//   createProduct,
// }