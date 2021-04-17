const Connect = require('../Config/Connect');
const ObjectId = require('mongodb').ObjectID;

const create = async (product) => 
  Connect()
    .then(db => db.collection('sales')
      .insertOne({itensSold: [...product]}))
    .catch(err => console.log(err.message));

const getBySaleId = async (id) =>
  Connect()
    .then(db => db.collection('sales')
      .findOne({_id: ObjectId(id)}))
    .catch(err => console.log(err));

const getSales = async () => 
  Connect()
    .then(db => db.collection('sales')
      .find()
      .toArray())
    .catch(err => console.log(err));

const updateSale = async (id, sale) =>
  Connect()
    .then(db => db.collection('sales')
      .findOneAndUpdate(
        {_id: ObjectId(id)}, {$set: { itensSold: sale}}, {returnOriginal: false}
      ))
    .catch(err => console.log(err));

const deleteSale = async (id) => 
  Connect()
    .then(db => db.collection('sales')
      .findOneAndDelete({_id: ObjectId(id)}))
    .then(response => response.value)
    .catch(err => console.log(err));


module.exports = {
  create,
  getSales,
  getBySaleId,
  updateSale,
  deleteSale,
};