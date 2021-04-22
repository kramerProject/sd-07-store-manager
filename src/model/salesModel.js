const connect = require('./connection');
const { ObjectId } = require('mongodb');

const colName = 'sales';

const postNewSale = async (order) => {
  // Cada venda deve ter um id que seja único e gerado no momento em que o recurso for criado;
  const { insertedId } = await connect().then((db) =>
    db.collection(colName).insertOne({ itensSold: [...order] }),
  );
  // A resposta do endpoint em caso de sucesso deve ser a(s) venda(s) criada(s).
  return {
    _id: insertedId,
    itensSold: [...order],
  };
};

const getAll = async () => {
  const search = await connect().then((db) => db.collection(colName).find().toArray());
  return JSON.stringify({ sales: [...search] });
};

const getById = async (id) => {
  const search = await connect().then((db) =>
    db.collection(colName).findOne({ _id: ObjectId(id) }),
  );
  return search;
};

const putSale = async (id, newSale) => {
  const update = await connect()
    .then((db) =>
      db.collection(colName)
        .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: [...newSale] } })
    )
    .then(() => {
      return {
        _id: id,
        itensSold: [...newSale]
      };
    });
  return update;
};

const deleteSale = async (id) => {
  const sale = await getById(id);
  await connect().then((db) =>
    db.collection(colName).deleteOne({ _id: ObjectId(id) })
  );
  return sale;
};

module.exports = {
  postNewSale,
  getAll,
  getById,
  putSale,
  deleteSale
};
