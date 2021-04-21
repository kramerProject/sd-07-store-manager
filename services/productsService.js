const Joi = require('@hapi/joi');
const { ObjectId } = require('mongodb');

const CODES = require('../configurations/statusCodes');
const ProductsModel = require('../models/productsModel');

const isDataValid = (object) => {
  const minimalLengthOfName = 5;
  const dataSchema = Joi.object({
    name: Joi.string().min(minimalLengthOfName).required().messages({
      'string.base': '{{ #label }} shoul\'be a type of "text"',
    }),
    quantity: Joi.number().min(1).required(),
  }).messages({
    'any.required': '{{ #label }} is required',
    'string.min': '{{ #label }} length must be at least {{ #limit }} characters long',
    'number.min': '{{ #label }} must be larger than or equal to {{ #limit }}',
  });
  return dataSchema.validate(object);
};

const createNewProduct = async (name, quantity) => {
  const { error } = isDataValid({ name, quantity });
  if (error) {
    throw {
      status: CODES.UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: error.message,
      },
    };
  }

  const alreadyExists = await ProductsModel.getProductByName(name);
  if (alreadyExists) {
    throw {
      status: CODES.UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  const newProduct = await ProductsModel.createNewProduct(name, quantity);
  return newProduct.ops[0];
};

const getAllProducts = async () => {
  return { products: await ProductsModel.getAllProducts() };
};

const getProductById = async (id) => {
  const newError = {
    status: CODES.UNPROCESSABLE_ENTITY,
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };

  if (!ObjectId.isValid(id)) throw newError;
  const product = await ProductsModel.getProductById(id);
  if (!product) throw newError;

  return product;
};

const updateProductById = async (id, name, quantity) => {
  const newError = {
    status: CODES.UNPROCESSABLE_ENTITY,
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };
  if (!ObjectId.isValid(id)) throw newError;

  const { error } = isDataValid({ name, quantity });
  if (error) throw { ...newError, err: { ...newError.err, message: error.message } };

  const alreadyExists = await ProductsModel.getProductByName(name);
  if (alreadyExists) {
    throw {
      status: CODES.UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  const product = await ProductsModel.updateProductById(id, name, quantity);
  if (!product) throw newError;

  return product;
};

const deleteProductById = async (id) => {
  const newError = {
    status: CODES.UNPROCESSABLE_ENTITY,
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };

  if (!ObjectId.isValid(id)) throw newError;
  const product = await ProductsModel.deleteProductById(id);
  if (!product) throw newError;

  return product;
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
