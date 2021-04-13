const Products = require('../models/Products');
const five = 5;
const zero = 0;

const isValid = ( name, quantity ) => {
  console.log(typeof quantity);
  if (!name || typeof name !== 'string' || name.length < five) return false;
  if (!quantity || typeof quantity !== 'int' || name.length === zero) return false;

  return true;
};

const createProducts = async ( name, quantity ) => {
  const productValid = isValid(name, quantity);

  if(!productValid) false;
  
  const { insertedId } = await Products.create(name, q);

  return getNewProduct({
    id: insertedId,
    name,
    quantity,
  });
};

module.exports = {
  createProducts
};