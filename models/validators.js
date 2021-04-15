const connectionProject = require('./connectionProject');
const { ObjectId } = require('mongodb');

const getAllProject = async () => {
  return connectionProject()
    .then((db) => db.collection('products').find().toArray())
    .then((documents) => {
      return documents;
    });
};

const getAllSales = async () => {
  return await connectionProject().then((db) => db.collection('sales').find().toArray());
};

const getSallesById = async (id) => {
  if (ObjectId.isValid(id)) {
    return await connectionProject().then((db) =>
      db.collection('sales').find({ _id: ObjectId(id) }),
    );
  }
  return null;
};

const deleteSalesId = async (id) => {
  if (ObjectId.isValid(id)) {
    console.log('passei aqui');
    return connectionProject().then((db) =>
      db.collection('sales').deleteOne({ _id: ObjectId(id) }),
    );

  }
  return null;
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

const insertSales = async (data) => {
  return connectionProject()
    .then((db) => db.collection('sales').insertOne({ itensSold: [...data] }))
    .then((result) => {
      return result.ops[0];
    });
};

const update = async (id, name, quantity) => {
  if (ObjectId.isValid(id)) {
    return connectionProject()
      .then((db) =>
        db.collection('products')
          .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
      )
      .then(() => ({ _id: id, name, quantity }));
  }
};

const updateSalesId = async (id, quantity, productId) => {
  if (ObjectId.isValid(id)) {
    return connectionProject()
      .then((db) =>
        db
          .collection('sales')
          .updateOne(
            { _id: ObjectId(id) }, { $set: { itensSold: [{ productId, quantity }] } }),
      )
      .then((result) => {
        return {
          _id: id,
          itensSold: [
            {
              productId,
              quantity,
            },
          ],
        };
      });
  }
  return null;
};



const remove = async (id) => {
  if (ObjectId.isValid(id)) {
    return connectionProject().then((db) =>
      db.collection('products').remove({ _id: ObjectId(id) }),
    );
  }
};

module.exports = {
  getAllProject,
  insert,
  getById,
  update,
  remove,
  getAllSales,
  insertSales,
  getSallesById,
  updateSalesId,
  deleteSalesId,
};
