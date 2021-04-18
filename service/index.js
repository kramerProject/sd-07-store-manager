const productModel = require('../models/productModels');

const validationFail = (name, quantity, nameOfProduct) => {
  if(name.length < 5) return '"name" length must be at least 5 characters long';
  if (nameOfProduct) return 'Product already exists';
};

const createProducts = async (name, quantity) => {
  const nameOfProduct = await connection()
    .then((db) => db.collection('products').find({ name }));

  const validationsFail = await validationFail(name, quantity, nameOfProduct);
  if (validationsFail != undefined) throw new Error(validationsFail);
  
  const response = await productModel.createProducts(name, quantity);
  return response;
};

module.exports = { createProducts };
