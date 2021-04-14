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

const update = async (id, name, quantity) => {
  if (ObjectId.isValid(id)) {
    return connectionProject()
      .then((db) => db.collection('products')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
        
      ).then(() => ({ _id: id, name, quantity }));
  }
};

const remove = async (id) => {
  if (ObjectId.isValid(id)) {
    return connectionProject()
      .then((db) => db.collection('products')
        .remove({ _id: ObjectId(id) })
        
      );
  }
};

module.exports = {
  getAllProject,
  insert,
  getById,
  update,
  remove,
};
