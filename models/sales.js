const connection = require('./connection');
const { ObjectId } = require('mongodb');

const SALES_COLLECTION = 'sales';

const createSale = (productArray) => {
  return connection()
    .then((db) => db.collection(SALES_COLLECTION).insertOne({
      itensSold: productArray,
    }))
    .then((result) => ({
      _id: result.insertedId,
      itensSold: productArray,
    }));
};

const findById = (id) => {
  return connection()
    .then((db) => db.collection(SALES_COLLECTION).findOne({_id: ObjectId(id) }));
};

const getAll = () => {
  return connection()
    .then((db) => db.collection(SALES_COLLECTION).find().toArray())
    .then((result) => ({
      sales: result,
    }));
};

const updateSales = (id, sales) => {
  return connection()
    .then((db) => db.collection(SALES_COLLECTION).updateOne(
      {_id: ObjectId(id)},
      {
        $set: {
          'itensSold.$[element].quantity': sales.quantity,
        },
      },
      { arrayFilters: [{ 'element._id': ObjectId(sales.id) }] }
    ))
    .then((result) => {
      console.log('result', result);
      console.log('sales', sales);
      return {
        _id: id,
        itensSold: [
          {
            productId: sales.productId,
            quantity: sales.quantity,
          }
        ],
      };
    });
};

// const deleteProduct = (id) => {
//   return connection()
//     .then((db) => db.collection(PRODUCTS_COLLECTION).deleteOne({_id: ObjectId(id)}));
// };

module.exports = {
  createSale,
  updateSales,
  findById,
  getAll,
  // updateProduct,
  // deleteProduct,
};
