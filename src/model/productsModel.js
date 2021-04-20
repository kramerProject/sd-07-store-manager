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

const putById = async (id, name, quantity) => {
  const update = await connect()
    .then((db) =>
      db.collection(colName)
        .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
    )
    .then(() => {
      return {
        _id: id,
        name,
        quantity
      };
    });
  return update;
};

const deleteById = async (id) => {
  const product = await getById(id);
  await connect().then((db) =>
    db.collection(colName).deleteOne({ _id: ObjectId(id) })
  );
  return product;
};

module.exports= {
  postNewProduct,
  nameIsUnique,
  getAll,
  getById,
  putById,
  deleteById
};
