const productsModel = require('../model/productsModel');
const { ObjectId } = require('mongodb');
const Joi = require('@hapi/joi');


const validateNameAndQuantity = (name, quantity) => {
  const MIN_NAME_LENGTH = 5;
  const MIN_QTD_LENGTH = 1;
  const schema = Joi.object({
    name: Joi.string().min(MIN_NAME_LENGTH).required(),
    quantity: Joi.number().min(MIN_QTD_LENGTH).required(),
  });

  const { error } = schema.validate({ name, quantity });
  if (error) {
    const { details: [{ message }] } = error;
    const errorMessage = JSON.stringify({
      err: {
        'code': 'invalid_data',
        'message': message
      }
    });
    throw new Error(errorMessage);
  }
};

const isProductExist = async (name) => {
  const { getProductByName } = productsModel;
  const product = await getProductByName(name);
  if (product) {
    const errorMessage = JSON.stringify({
      'err': {
        'code': 'invalid_data',
        'message': 'Product already exists'
      }
    });
    throw new Error (errorMessage);
  }
};

const addProduct = async (name, quantity) => {
  const { addProduct } = productsModel;
  
  await isProductExist(name);
  validateNameAndQuantity(name, quantity);

  const newProduct = await addProduct(name, quantity);
  return newProduct;
};

module.exports = {
  addProduct,
};