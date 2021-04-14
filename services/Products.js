const productsModel = require('../models/Products');
const five = 5;
const zero = 0;

const isValid = ( name, quantity ) => {
  console.log(typeof quantity);
  if (!name || typeof name !== 'string' || name.length < five) return false;
  if (!quantity || typeof quantity !== 'number' || name.length <= zero) return false;

  return true;
};

const postNewProduct = (productData) => {
  return {
    success:true,
    productData
  };
};
const createProducts = async ( name, quantity ) => {
  const productValid = isValid(name, quantity);

  if(!productValid) false;
  
  const registeredProduct = await productsModel.createProducts(name, quantity);
  console.log(registeredProduct);

  return postNewProduct({
    _id: registeredProduct.insertedId,
    name,
    quantity,
  });
};

module.exports = {
  createProducts
};