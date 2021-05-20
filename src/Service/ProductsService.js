const productModel = require('../Models/ProductsModel');
const { validateFields } = require('../helpers/validateFilds');

async function create({ name, quantity }) {
  try {
    validateFields(name, quantity);
    await productModel.getByName(name);
    const product = await productModel.create({ name, quantity });
    return product.ops[0];
  } catch (error) {
    throw new Error('Validation error');
  }
}
async function getAll() {
  try {
    const products = await productModel.getAll();
    return products.toArray();
  } catch (error) {
    throw new Error('Products not found');
  }
}

module.exports = {create, getAll};
