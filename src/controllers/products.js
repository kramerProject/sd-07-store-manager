const {
  createNewProduct,
  findAll,
  findById,
  updateById } = require('../services/productService');
  
const { StatusCodes: {
  CREATED,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  OK} } = require('http-status-codes');

const newProduct = (req, res) => {
  try {
    const { name , quantity } = req.body;
    const createdProduct = createNewProduct(name, quantity);
    return res.status(CREATED).send(createdProduct);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const getAll = (req, res) => {
  try {
    const products = findAll();
    return res.status(OK).send(products);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const getById = (req, res) => {
  try {
    const { id } = req.params;
    const ZERO = 0;
    const product = findById(id);
    if (product.length === ZERO) {
      return res.status(UNPROCESSABLE_ENTITY).send({
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong id format'
        }
      });
    }
    return res.status(OK).send(product);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const setById = (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    updateById(id, name, quantity);
    return res.status(OK).send({
      '_id': id,
      name,
      quantity,
    });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error.message);
  }
};

module.exports = {
  newProduct,
  getAll,
  getById,
  setById,
};