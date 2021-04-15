const ProductModel = require('../models/productModel');
const five = 5;
const zero = 0;

const add = async (name, quantity) => {
  if(name.length < five) 
    return { code: 422,
      message: '"name" length must be at least 5 characters long' };

  if(quantity < zero || quantity === zero) 
    return { code: 422,
      message: '"quantity" must be larger than or equal to 1' };

  if(typeof quantity === 'string')
    return { code: 422,
      message: '"quantity" must be a number' };

  const searchProduct = await ProductModel.findByName(name);
  if (searchProduct !== null)
    return { code: 422,
      message: 'Product already exists' };

  const newProduct = await ProductModel.add(name, quantity);
  return { code: 201, newProduct };
};

module.exports = {
  add,
};