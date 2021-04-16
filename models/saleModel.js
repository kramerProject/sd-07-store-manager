const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addSaleDB = async (itensSold) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold }), 
  );
  const data = {
    _id: insertedId,
    itensSold
  }; 
  return data;
};

const getSaleDB = async (id) => {
  const saleById = await connection().then((db) =>
    db.collection('sales').findOne(ObjectId(id)),
  );
  return saleById;
};

const gelAllSalesDB = async () => {
  const allSales = await connection().then((db) =>
    db.collection('sales').find().toArray());
    // console.log(`allSales em gelAllSalesDB: ${allSales}`);
  return { sales: allSales};
};

const updateSaleDB = async (itensSold, salesId) => {
  const updatedSale = await connection().then((db) =>
    db.collection('products').updateOne(
      { id: salesId },
      { $set:  { itensSold: itensSold }}),
  );
  console.log(`updateSaleDB em model, updatedSale: ${updatedSale}`);
  // console.log(`updateSaleDB em model, updatedProduct: ${updatedProduct}`);
  const data = {
    _id: salesId,
    itensSold: itensSold
  }; 
  return data;
};

const deleteSaleDB = async (id) => {
  const deletedProduct = await connection().then((db) =>
    db.collection('products').deleteOne( {id: ObjectId(id)} ),
  );
  // console.log(`deletedProduct em deleteProductDB: ${deletedProduct}`);
  return deletedProduct;
  // await console.log('Tá deletado, acredita!');
};

module.exports = {
  addSaleDB, getSaleDB, gelAllSalesDB, updateSaleDB, deleteSaleDB
};
