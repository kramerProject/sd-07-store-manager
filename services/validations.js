const Joi = require('@hapi/joi');
const { ObjectId } = require('mongodb');
const Models = require('../models');

const isProductExists = async (id) => {
  const product = await Models.getProductById(id);
  if (!product) return false; // throw newError;
  return true;
};

const isIdValid = (id) => {
  if (!ObjectId.isValid(id)) return false; // throw newError;
  return true;
};

const isProductNameExists = async (name) => {
  return await Models.getProductByName(name);
};

const isProductDataValid = (object) => {
  const minimalLengthOfName = 5;
  const minimalQuantity = 1;
  const dataSchema = Joi.object({
    name: Joi.string().min(minimalLengthOfName).required().messages({
      'string.base': '{{ #label }} shoul\'be a type of "text"',
    }),
    quantity: Joi.number().min(minimalQuantity).required(),
  }).messages({
    'any.required': '{{ #label }} is required',
    'string.min': '{{ #label }} length must be at least {{ #limit }} characters long',
    'number.min': '{{ #label }} must be larger than or equal to {{ #limit }}',
  });
  return dataSchema.validate(object);
};

const isSaleDataValid = (array) => {
  const minimalQuantity = 1;
  const objectSchema = Joi.object({
    quantity: Joi.number().min(minimalQuantity).required().messages({
      'number.base': 'Wrong product ID or invalid quantity',
    }),
    productId: Joi.string()
      .required()
      // .custom(async (value, helper) => {
      //   // console.log(helper, 'custom');
      //   if (!isIdValid(value)) return helper.message('Wrong id format');
      //   if (!(await isProductExists(value)))
      //     return helper.message('Wrong product ID or invalid quantity');
      //   return true;
      // })
      .messages({
        'string.base': '{{ #label }} shoul\'be a type of "text"',
      }),
  }).messages({
    'any.required': '{{ #label }} is required',
    'number.min': 'Wrong product ID or invalid quantity',
  });

  const minimalSales = 1;
  const arraySchema = Joi.array().items(objectSchema).min(minimalSales).required()
    .messages({
      'any.required': '{{ #label }} is required (array)',
      'array.min': 'At least {{ #limit }} sale(s) must be made',
    });
  return arraySchema.validate(array);
};

module.exports = {
  isProductExists,
  isIdValid,
  isProductNameExists,
  isProductDataValid,
  isSaleDataValid,
};
