const Sales = require('../models/sales');
const Store = require('../services/Store');
const { ObjectId } = require('mongodb');
// const LENGTH_NAME = 5;
const ZERO_QUANTITY = 0;

// const errLastFiveChar ={'err':{
//   'code':'invalid_data',
//   'message': '"name" length must be at least 5 characters long'
// }};
// const errSameName ={'err':{
//   'code':'invalid_data',
//   'message':'Product already exists'
// }};
const errLessOrEqualZero ={'err':{
  'code':'invalid_data',
  'message': 'Wrong product ID or invalid quantity'
}};
const errQuantityIsString ={'err':{
  'code':'invalid_data',
  'message': 'Wrong product ID or invalid quantity'
}};
const errWrongIdFormat ={'err':{
  'code':'invalid_data',
  'message': 'Wrong id format'
}};
// const getListProducts = (productData) => {
//   return {
//     ...productData
//   };
// };
// const isNameAlreadyExist = async(name)=>{
//   const result = await Store.findByName(name);
//   if (result !==null) return false;

//   return true;
// };
// const verifyName = (name)=>{
//   if (!name || typeof name !== 'string' || name.length< LENGTH_NAME ) return false;

//   return true;
// };
const itensSold = (salesData)=>{
  const itensArr = [];
  itensArr.push(...salesData);
  return {
    'itensSold':itensArr
  };
};
const verifyQuantity = (quantity)=>{
  if (!quantity || quantity <= ZERO_QUANTITY ) return false;

  return true;
};
const verifyTypeOfQuantity = (quantity)=>{
  if (!quantity || typeof quantity !== 'number') return false;

  return true;
};
const isValid = async(quantity) => {
  if (!verifyQuantity(quantity)) return errLessOrEqualZero;
  if (!verifyTypeOfQuantity(quantity)) return errQuantityIsString;

  return true;
};
// const updateValidation = async(name, quantity) => {
//   if (!verifyName(name) ) return errLastFiveChar;
//   if (!verifyQuantity(quantity)) return errLessOrEqualZero;
//   if (!verifyTypeOfQuantity(quantity)) return errQuantityIsString;

//   return true;
// };
// const getAll = async () => {
//   const store = await Store.getAll();
//   return {'products':store};

//   // return store;
// };

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return errWrongIdFormat;
  }
  const result = await Sales.findById(id);

  if (result === null) return errWrongIdFormat;

  return result;
};
// const deleteProduct = async (id) => {
//   if (!ObjectId.isValid(id)) {
//     return errWrongIdFormat;
//   }
//   const store = await Store.findById(id);

//   if (store === null) return errWrongIdFormat;


//   await Store.deleteById(id);

//   return store;
// };

const create = async (arr) => {
  // let index;
  const ZEROINDEX = 0;
  let index;
  for( index= ZEROINDEX;index<arr.length;index += 1){
    let resultFindByIdProducts = await Store.findById(arr[index].productId);

    if(resultFindByIdProducts.err) return resultFindByIdProducts;

    let productValid = await isValid(arr[index].quantity);

    if( typeof productValid ==='object') return productValid;
  }
  const resultItensSold = itensSold(arr);

  const { insertedId } = await Sales.create(resultItensSold);

  const result = await findById(insertedId);

  return result;

};
// const updateById = async (name, quantity,id) => {

//   if (!ObjectId.isValid(id)) {
//     return errWrongIdFormat;
//   }
//   const productValid = await updateValidation(name,quantity);

//   if( typeof productValid ==='object') return productValid;


//   await Store.updateById(name, quantity,id);

//   return {
//     _id: id,
//     name,
//     quantity
//   };
// };




module.exports = {
  // updateById,
  // deleteProduct,
  // getAll,
  findById,
  create,
};
