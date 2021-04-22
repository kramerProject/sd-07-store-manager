const Products = require('../models/products');

var isNaN = function (value) {
  var n = Number(value);
  return n !== n;
};

const validate = (name, quantity) => {
  const quantidadeZero = 0;
  const cincoCaracteres = 5;
  switch (true) {
  case name === undefined || name.length <= cincoCaracteres:
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  case quantity <= quantidadeZero:
    return { code: 422, message: '"quantity" must be larger than or equal to 1' };
  case isNaN(quantity):
    return { code: 422, message: '"quantity" must be a number' };
  default:
    return {};
  }
};

const createProduct = async (name, quantity) => {
  //validações e manipulação do modelo

  const validations = validate(name, quantity);

  if (validations.message) return validations;

  if (await Products
    .isNameExists(name)) 
    return { code: 422, 
      message: 'Product already exists' };

  const result = await Products.createProduct(name, quantity);

  return { code: 201, result };
};

const getAllProducts = async () => {
  const result = await Products.getAllProducts();
  return { code: 200, result };
};

const getProductById = async (id) => {
  const result = await Products.getProductById(id);
  if (result === false) return { code: 422, message: 'Wrong id format' };

  return { code: 200, result };
};

const updateProduct = async (name, quantity, id) => {
  const validations = validate(name, quantity);

  if (validations.message) return validations;

  const result = await Products.updateProduct(name, quantity, id);

  console.log('result is', result);

  return { code: 200, result };
};

const deleteProduct = async (id) => {
  const result = await Products.deleteProduct(id);

  if (result === false) return { code: 422, message: 'Wrong id format' };

  return { code: 200, result };
};

module.exports = { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct };
