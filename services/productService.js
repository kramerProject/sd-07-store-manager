const ProductModel = require('../models/productModel');
const five = 5;
const zero = 0;

const addProduct = async (name, quantity) => {
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

  const newProduct = await ProductModel.addProduct(name, quantity);
  return { code: 201, newProduct };
};

const getAll = async () => {
  const products = await ProductModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await ProductModel.getById(id);
  if(product === null) 
    return { code: 422,
      message: 'Wrong id format' };

  return {code: 200, product};
};

const updateProduct = async (id, name, quantity) => {
  if(name.length < five) 
    return { code: 422,
      message: '"name" length must be at least 5 characters long' };

  if(quantity < zero || quantity === zero) 
    return { code: 422,
      message: '"quantity" must be larger than or equal to 1' };

  if(typeof quantity === 'string')
    return { code: 422,
      message: '"quantity" must be a number' };

  const newProduct = await ProductModel.updateProduct(id, name, quantity);
  return { code: 200, newProduct };
};

module.exports = {
  addProduct,
  getAll,
  getById,
  updateProduct,
};