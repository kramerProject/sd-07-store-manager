const Connect = require('../Config/Connect');
const ObjectId = require('mongodb').ObjectID;

const create = async (product) => {
  return Connect()
    .then(db => db.collection('sales')
      .insertOne({itensSold: []}))
    .then(response => {
      product.forEach(item => 
        pushProducts(response.insertedId, item.productId, item.quantity)
      );
      return getBySaleId(response.insertedId);
    })
    .catch(err => console.log(err.message));
};

const pushProducts = async (id, productId, quantity) => {
  return Connect()
    .then(db => db.collection('sales')
      .updateOne({_id: ObjectId(id)}, {$push: { itensSold: 
        {productId: ObjectId(productId), quantity}}}))
    .then(response => response)
    .catch(err => console.log(err));
};

const getBySaleId = async (id) => {
  return Connect()
    .then(db => db.collection('sales')
      .findOne({_id: ObjectId(id)}))
    .then(result => result)
    .catch(err => console.log(err));
};

const getSales = async () => {
  return Connect()
    .then(db => db.collection('sales')
      .find()
      .toArray())
    .then(result => result)
    .catch(err => console.log(err));
};

const updateSale = async (id, sale) => {
  return Connect()
    .then(db => db.collection('sales')
      .updateOne({_id: ObjectId(id)}, {$set: { itensSold: sale}}))
    .then(response => getBySaleId(id))
    .then(response => response)
    .catch(err => console.log(err));
};

const deleteSale = async (id) => {
  return Connect()
    .then(db => db.collection('sales')
      .findOneAndDelete({_id: ObjectId(id)}))
    .then(response => response.value)
    .catch(err => console.log(err));
};

module.exports = {
  create,
  getSales,
  getBySaleId,
  updateSale,
  deleteSale,
};