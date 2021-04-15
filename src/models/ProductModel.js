const conn = require('../../helpers/conn');

const createProduct = async(name, quantity) => {
  return (
    conn().then(async (db) => {
      const newProduct = await db.collection('products').insertOne({ name, quantity });
      //console.log(newProduct.ops[0]);     
      return newProduct.ops[0];
    })
  );    
};

module.exports = {
  createProduct
};