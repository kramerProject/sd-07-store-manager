const getConnection = require('./connection');

const insertPurchase = async (productList) => {
  const connection = await getConnection();
  try {
    const purchaseInsertionRes = await connection.collection('sales')
      .insertOne({ itensSold: productList });
    return purchaseInsertionRes.ops;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = insertPurchase;
