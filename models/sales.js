const { ObjectId } = require('bson');
const connection = require('./connection');
const { getProductById, updateProduct } = require('./products');

const updateQuantityWhenSold = async (sales) => {
  const zero = 0;
  for (let index = zero; index < sales.length; index += 1) {
    //venda
    const { productId } = sales[index];
    const quantitySold = sales[index].quantity;
    //produto ou estoque
    const product = await getProductById(productId);
    const { name, quantity } = product[0];
    //update
    const newQuantity = quantity - quantitySold;
    await updateProduct(name, newQuantity, productId);
    if (newQuantity <= zero) return null;
  }
};

const updateQuantityWhenDeletedSold = async (id) => {
  const saleId = await getSaleById(id);
  if (!saleId) return false;
  const sales = saleId[0].itensSold;
  const zero = 0;
  for (let index = zero; index < sales.length; index += 1) {
    //venda
    const { productId } = sales[index];
    const quantitySold = sales[index].quantity;
    //produto ou estoque
    const product = await getProductById(productId);
    const { name, quantity } = product[0];
    //update
    const newQuantity = quantity + quantitySold;
    await updateProduct(name, newQuantity, productId);
  }
};

const createSale = async (sales) => {
  const newSale = {
    itensSold: sales,
  };
  const sale = await connection().then((db) => {
    return db.collection('sales').insertOne(newSale);
  });
  return sale.ops[0];
};

const getAllSales = async () => {
  const allSales = await connection().then((db) => {
    return db.collection('sales').find().toArray();
  });
  return allSales;
};

const getSaleById = async (id) => {
  return await connection()
    .then((db) => {
      return db
        .collection('sales')
        .find({ _id: ObjectId(id) })
        .toArray();
    })
    .catch((rej) => {
      return false;
    });
};

const updateSale = async (id, itensSold) => {
  const update = await connection().then((db) => {
    return db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          itensSold,
        },
      },
    );
  });
  return connection().then((db) =>
    db
      .collection('sales')
      .find({ _id: ObjectId(id) })
      .toArray(),
  );
};

const deleteSale = async (id) => {
  return await connection()
    .then(async (db) => {
      const target = await db
        .collection('sales')
        .find({ _id: ObjectId(id) })
        .toArray();
      await connection().then((db) => {
        db.collection('sales').deleteOne({ _id: ObjectId(id) });
      });
      return target;
    })
    .catch((rej) => {
      return false;
    });
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  updateQuantityWhenSold,
  updateQuantityWhenDeletedSold,
};
