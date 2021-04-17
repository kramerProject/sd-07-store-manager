const conn = require('./connection');


const updateProdutsQuantity  = async (productId, quantity, remove) => {
  if (remove) {
    return await conn()
      .then((db) => db.collection('products')
        .updateOne({ _id: productId }, {$set: {$inc: { quantity: -quantity}}}));
  }
  await conn()
    .then((db) => db.collection('products')
      .updateOne({ _id: productId }, {$set: {$inc: { quantity: quantity}}}));
};

const returnSalesMap = ((sales, remove) => sales.map(({productId, quantity}) => {
  if (remove) return updateProdutsQuantity(productId, quantity, remove);
  return updateProdutsQuantity(productId, quantity);}));
const findAll = async () => {
  const result = await conn().then((db) => db.collection('sales').find().toArray());
  return JSON.stringify({ sales: [...result] });
};

const findById = async (id) => {
  const result = await conn()
    .then((db) => db.collection('sales').find({ _id: id }).toArray());
  return result;
};
const insertNewSale = async (sales) => {
  
  const { insertedId } = await conn().then((db) =>
    db.collection('sales').insertOne({ itensSold: [...sales] }),
  );
  return {
    _id: insertedId,
    itensSold: [...sales],
  };
};
const updateById = async (id, sales) => {
  await conn().then((db) =>
    db.collection('sales').updateOne({ _id: id }, { $set: { itensSold: [...sales] } }),
  );
  return {
    _id: id,
    itensSold: [...sales],
  };
};
const removeById = async (id) => {
  const result = await findById(id);
  await conn().then((db) => db.collection('sales').deleteOne({ _id: id }));
  return result;
};

module.exports = {
  insertNewSale,
  findAll,
  findById,
  updateById,
  removeById,
};
