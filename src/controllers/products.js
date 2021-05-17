const {
  createNewProduct,
  findAll,
  findById,
  updateById,
  removeById } = require('../services/productService');
  
const { StatusCodes: {
  CREATED,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  OK} } = require('http-status-codes');

const newProduct = async (req, res) => {
  try {
    const { name , quantity } = req.body;
    const createdProduct = await createNewProduct(name, quantity);
    const { _id, name : newname, quantity: newquantity } = createdProduct;
    return res.status(CREATED).send({
      _id,
      'name': newname,
      'quantity': newquantity,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const products = await findAll();
    return res.status(OK).send({
      'products': products
    });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const ZERO = 0;
    const product = await findById(id);
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

const setById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    await updateById(id, name, quantity);
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
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await removeById(id);
    return res.status(OK).send(deleted);
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
  deleteById,
};