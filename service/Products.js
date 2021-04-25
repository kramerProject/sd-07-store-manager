const Product = require('../model/Products');
const validateFields = require('../helper/validateFields');

const addProduct = async (name, quantity) => {
  const { status, message } = validateFields(name, quantity);

  if (status === 'error') return { code: 'invalid_data', message };

  const productExists = await Product.findProductByName(name);

  if (productExists) return { code: 'invalid_data', message: 'Product already exists' };

  const { insertedId } = await Product.addProduct(name, quantity);

  return { _id: insertedId, name, quantity };
};

const findAllProducts = async () => {
  const products = await Product.findAllProducts();

  return products;
};

const findProductById = async (id) => {
  const product = await Product.findProductById(id);

  const { status } = product;
  if (status === 'error') return { code: 'invalid_data', message: 'Wrong id format' };

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const { status, message } = validateFields(name, quantity);

  if (status === 'error') return { code: 'invalid_data', message };

  const { insertedId } = await Product.updateProduct(id, name, quantity);

  return { _id: insertedId, name, quantity };
};

const deleteProduct = async (id) => {
  const product = await Product.findProductById(id);

  const { status } = product;
  if (status === 'error') return { code: 'invalid_data', message: 'Wrong id' };

  await Product.deleteProduct(id);

  return product;
};

module.exports = {
  addProduct,
  findAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
