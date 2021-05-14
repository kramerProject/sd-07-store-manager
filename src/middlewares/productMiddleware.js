const {StatusCodes: {UNPROCESSABLE_ENTITY, NOT_FOUND}} = require('http-status-codes');
const { findByEqual, saleIsValid } = require('../service/products');
const {ObjectId} = require('mongodb');
const {updateByID, getAllById} = require('../models/ModelProducts');
const checkAddProduct = (req,res,next) => {
  const { name, quantity } = req.body;
  const zero = 0;
  const lenghtAcept = 5;
  if(typeof quantity !== 'number'){
    return res.status(UNPROCESSABLE_ENTITY).json({
      'err': {
        'code': 'invalid_data',
        'message': '"quantity\" must be a number'
      }
    });
  }
  if(quantity <= zero){
    return res.status(UNPROCESSABLE_ENTITY).json({
      'err': {
        'code': 'invalid_data',
        'message': '"quantity\" must be larger than or equal to 1'
      }
    });
  }
  if(typeof name !== 'string' || name.length <= lenghtAcept){
    return res.status(UNPROCESSABLE_ENTITY).json({
      'err': {
        'code': 'invalid_data',
        'message': '"name\" length must be at least 5 characters long'
      }
    });
  }
 

  next();
};
const checkAddSale = (req,res,next) => {
  const [{quantity}] = req.body;
  const zero = 0;
  if(typeof quantity !== 'number' || quantity <= zero){
    return res.status(UNPROCESSABLE_ENTITY).send({
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong product ID or invalid quantity'
      }
    });
  }

  next();
};

// const checkSaleValid = async (req,res,next) => {
//   const { id } = req.body;
//   const checked = await saleIsValid(id);
//   console.log(StatusCodes);
//   if(checked === undefined){
//     return res.status(NOT_FOUND).send({
//       'err': {
//         'code': 'invalid_data',
//         'message': 'Wrong product ID or invalid quantity'
//       }
//     });
//   }

// };
const checkEqualProduct = async(req,res,next) => {
  const { name } =  req.body;
  const result = await findByEqual(name);
  if(result){
    return res.status(UNPROCESSABLE_ENTITY).send({
      'err': {
        'code': 'invalid_data',
        'message': 'Product already exists'
      }
    });
  }
 
  next();
};
const checkSale = (req,res,next) => {
  const { id } =  req.params;
  if(!ObjectId.isValid(id)){
    return res.status(NOT_FOUND).send({
      'err': {
        code: 'not_found',
        message: 'Sale not found',
      }
    });
  }
 
  next();

};

const checkId = async(req,res,next) => {
  const { id } =  req.params;
  if(!ObjectId.isValid(id)){
    return res.status(UNPROCESSABLE_ENTITY).send({
      'err': {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    });
  }
 
  next();
};

const checkIdDelete = async(req,res,next) => {
  const { id } =  req.params;
  if(!ObjectId.isValid(id)){
    return res.status(UNPROCESSABLE_ENTITY).send({
      'err': {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    });
  }
 
  next();
};




module.exports = {
  checkAddProduct,
  checkEqualProduct,
  checkId,
  checkAddSale,
  checkIdDelete,
  checkSale,
  checkSubStock
};