const connectionProject = require('./connectionProject');
const { ObjectId } = require('mongodb');

const getAllProject = async () => {
  return connectionProject()
    .then((db) => db.collection('products').find().toArray())
    .then((documents) => {
      return documents;
    });
};

const getById = async (id) => {

  if (ObjectId.isValid(id)) {
    return connectionProject()
      .then((db) =>
        db
          .collection('products')
          .find({ _id: ObjectId(id) })
          .toArray(),
      )
      .then((documents) => {
        return documents;
      });
  }
  return null;
};

const insert = async (name, quantity) => {
  return connectionProject()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));
};

module.exports = {
  getAllProject,
  insert,
  getById,
};
