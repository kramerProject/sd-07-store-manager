const productModel = require('../models/products');

const validation = (name, quantity) => {
  const FIVE = 5;
  const ZERO = 0;

  if (name.length < FIVE || typeof name !== 'string') {
    const ERR_MESSAGE = '\"name\" length must be at least 5 characters long';
    throw new Error(ERR_MESSAGE);
  }
  if (typeof quantity !== 'number') {
    const ERR_MESSAGE = '\"quantity" must be a number';
    throw new Error(ERR_MESSAGE);
  }
  if (quantity < ZERO || quantity === ZERO) {
    const ERR_MESSAGE = '\"quantity" must be larger than or equal to 1';
    throw new Error(ERR_MESSAGE);
  }
};

const createProduct = async (name, quantity ) => {
  validation(name, quantity);
  const product = await productModel.getByName(name);

  if (product) {
    const ERR_MESSAGE = 'Product already exists';
    throw new Error(ERR_MESSAGE);
  }

  return productModel.postdata(name, quantity);
};

const getAllProducts = async () => {
  const products = await productModel.getAll();
  const allProducts = {
    products,
  };
  return allProducts;
};

const getProductsId = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  await productModel.editdata(id, name, quantity);
  const updatedProduct = {
    _id: id,
    name,
    quantity
  };
  return updatedProduct;
};

const deleteProduct = async (id) => {
  // const product = await productModel.getById(id);
  // if (!productID)
  //   throw { code: 'invalid_data', message: 'Wrong id format' };
  return await productModel.deletedata(id);
  // return product;
  // console.log('service');
  // const product = await getProductsId(id);
  // if (!product) {
  //   const ERROR_MESSAGE = 'Wrong id format';
  //   throw new Error(ERROR_MESSAGE);
  // }
  // await productModel.deletedata(product);
  // return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsId,
  updateProduct,
  deleteProduct
};