const connection = require('./connection');

const create = async (name, quantity) =>
  connection()
    .then ((db) => db.collection('products').insertOne ({ name, quantity }));

const getAll = async () => 
  connection() 
    .then ((db) => db.collection('products').find());
    
const getProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then ((db) => db.collection('products').findOne(new ObjectId(id)));
};

  

module.exports  = { create, getAll, getProduct };   