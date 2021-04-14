const code = require('../utils/httpCodes');

const validNumber = (value) => {
  const min_value = 0;
  if(value <= min_value){
    return false;
  }
  return true;
};

const validateQuantity = (quantity) => {
  if(typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };

  }

  if(!validNumber(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }  
};

// const validateName = (name) => {
//   const max_length = 5;
  
//   if(name === undefined) {
//     return {
//       err: {
//         code: 'invalid_data',
//         message: '"name" length must be at least 5 characters long'
//       }
//     };
//   }

//   if(name.length < max_length) {
//     return {
//       err: {
//         code: 'invalid_data',
//         message: '"name" length must be at least 5 characters long'
//       }
//     };
//   }  
// };

const sales = (req, res, next) => {
  const values = req.body;

  values.forEach(({name, quantity}) => {
    //const nameChecker = validateName(name);
    const quantityChecker = validateQuantity(quantity);
  
    // if(proChecker) {
    //   return res.status(code.post_error).json(nameChecker);
    // }
  
    if(quantityChecker) {
      return res.status(code.post_error).json(quantityChecker);
    }      
  });

  next();
};

module.exports = sales;