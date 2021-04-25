const Product = require('../model/Products');
const validateFields = require('../helper/Validate');

const addProduct = async (name, quantity) => {
  const { status, message } = validateFields(name, quantity);

  if (status === 'error') return { code: 'invalid', message };

  const productExists = await Product.findProductByName(name);

  if (productExists) return { code: 'invalid', message: 'Product already exists' };

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
  if (status === 'error') return { code: 'invalid', message: 'Wrong id format' };

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const { status, message } = validateFields(name, quantity);

  if (status === 'error') return { code: 'invalid', message };

  const { insertedId } = await Product.updateProduct(id, name, quantity);

  return { _id: insertedId, name, quantity };
};

const deleteProduct = async (id) => {
  const product = await Product.findProductById(id);

  const { status } = product;
  if (status === 'error') return { code: 'invalid', message: 'Wrong id' };

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
