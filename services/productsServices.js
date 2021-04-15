const productsModels = require('../models/productsModels');

const createProduct = async(name, quantity) => {
  try {
    const nameLength = 5;
    const invalidQtd = 1;
    if(name.length < nameLength) {
      return { 
        message: {
          err: {
            code: 'invalid_data',
            message: '"\name\" length must be at least 5 characters long'
          }
        },
        status: 422
      };
    }

    if(quantity < invalidQtd) {
      return { 
        message: {
          err: {
            code: 'invalid_data', 
            message: '\"quantity"\ must be larger than or equal to 1',
          }
        },
        status: 422
      };
    }

    if(typeof(quantity) !== 'number'){
      return { 
        message: {
          err: {
            code: 'invalid_data', 
            message: '\"quantity"\ must be a number',
          }
        },
        status: 422
      };
    }

    const productExist = await productsModels.getProductByName(name);
    if(productExist !== null) {
      return { 
        message: {
          err: {
            code: 'invalid_data', 
            message: 'Product already exists'
          }
        },
        status: 422
      };
    }

    const response = await productsModels.createProduct(name, quantity);
    return { message: response, status:201 };
  } catch(error) {
    console.error('createProduct');
    console.error(error.message);
  }

};

module.exports = {
  createProduct,
};