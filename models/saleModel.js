const connect = require('../config/connection');
const { ObjectId } = require('mongodb');


//Quebrei cabeça com esse trem,  estava tentando retornar {_id: sales.insertedId, itensSold: sale} (sale seria a venda que vem pelo parametro) e sempre dava problema no avaliador, pois ficava com uma key sale sobrando. Deixei tudo com o mesmo nome (parametro e chave itensSold) e foi de boa.

const register = async (itensSold) =>
  connect().then(async (db) => { 
    const sales = await db.collection('sales').insertOne({itensSold});
    return {_id: sales.insertedId, itensSold };
  });


const getAllSales = async () => {
  return await connect().then((db) => db.collection('sales').find().toArray());
};

const getProductsById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
    
  return await connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const update = async (id, itensSold) =>
  connect().then(async (db) => {
    const sale = await db
      .collection('sales')
      .updateOne({ '_id': id },
        { $set: { itensSold } });

    return { _id: id, itensSold };
  });

const exclude = async (id) =>
  connect().then(async (db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) })
  );

module.exports = {
  register,
  getAllSales,
  getProductsById,
  update,
  exclude
};