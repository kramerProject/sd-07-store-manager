const connect = require('./connection');
const { ObjectId } = require('mongodb');


const colName = 'products';

const postNewProduct = async (name, quantity) => {
  const { insertedId } = await connect()
    .then((db) => db.collection(colName).insertOne({ name, quantity }));
  return {
    _id: insertedId,
    name,
    quantity
  };
};

const nameIsUnique = async (name) => {
  const search = await connect()
    .then((db) =>
      db.collection(colName).find({ name: name }).toArray(),
    );
  const uniqueRef = 0;
  return search.length === uniqueRef ? true : false;
};

const getAll = async () => {
  const search = await connect()
    .then((db) =>
      db.collection(colName).find().toArray()
    );
  return JSON.stringify({ products: [...search] });
};

const getById = async (id) => {
  const search = await connect()
    .then((db) => 
      db.collection(colName).findOne({ _id: ObjectId(id) })
    );
  return search;
};

module.exports= {
  postNewProduct,
  nameIsUnique,
  getAll,
  getById
};
