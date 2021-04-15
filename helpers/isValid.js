const code = require('../returnStatus/status.json');
const message = require('../returnStatus/message.json');

const createError = (myCode, errCode, message) => ({
  code: myCode,
  json:{
    err: {
      code: errCode, message
    }
  } 
});

const nameIsOk = (name) => {
  
  const num = {
    'five': 5
  };
  
  if (name.length > num.five) {
    return true;
  } else {
    return createError(
      code.Unprocessable_Entity, message.code, message.length_character
    );
  }  
};

const nameIsAString = (name) => {
  
  if (typeof name === 'string') {
    return true;
  } else {
    return createError(
      code.Unprocessable_Entity, message.code, message.name_type
    );
  }  
};

const quantityIsOk = (quantity) => {
  const num = {
    'zero': 0,
  };
  
  if (Number(quantity) > num.zero) {
    return true;
  } else {
    return createError(
      code.Unprocessable_Entity, message.code, message.quantity_length
    );
  }  
};

const IsInteger = (quantity) => {

  if (typeof quantity === 'number') {
    return true;
  } else {
    return createError(
      code.Unprocessable_Entity, message.code, message.quantity_type
    );
  } 
};

const productExist = async (obj, name) => {
  const arrayPromise = await obj;

  const arrayOfNames = arrayPromise.map((product) => product.name);

  if (arrayOfNames.includes(name)) {
    const obj = createError(
      code.Unprocessable_Entity, message.code, message.product_exists
    );
    
    return obj;
  }
     
  return { code:false };
};

module.exports = {
  nameIsOk,
  quantityIsOk,
  nameIsAString,
  IsInteger,
  productExist,
  createError,
};