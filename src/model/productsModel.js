const connect = require('./connection');

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

module.exports= {
  postNewProduct,
  nameIsUnique
};
