const verifyName = require('./verifyName');
const verifyQuantity = require('./verifyQuantity');
const { add, update, exclude, getById, getAll } = require('../models/Products');

const createProduct = async (name, quantity) => {
  const statusErr = 422;
  if (!verifyName.length(name)) {
    return {
      data: {
        'err': {
          'code': 'invalid_data',
          'message': '"name" length must be at least 5 characters long'
        },
      },
      code: 422,
    };
  }
  else if (await verifyName.exists(name)) {
    return {
      data: {
        'err': {
          'code': 'invalid_data',
          'message': 'Product already exists'
        },
      },
      code: 422,
    };
  }

  else if(!verifyQuantity.length(quantity)) {
    return {
      data: {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be larger than or equal to 1'
        },
      },
      code: 422,
    };
  }

  else if(!verifyQuantity.type(quantity)) {
    return {
      data: {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be a number'
        }
      },
      code: 422,
    };
  } else {
    const product = await add(name, quantity);
    return {
      data: product , code: 201};
  } 

};

const updateProduct = async (name, quantity, id) => {
  const statusErr = 422;
  if (!verifyName.length(name)) {
    return {
      data: {
        'err': {
          'code': 'invalid_data',
          'message': '"name" length must be at least 5 characters long'
        },
      },
      code: 422,
    };
  }

  else if(!verifyQuantity.length(quantity)) {
    return {
      data: {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be larger than or equal to 1'
        },
      },
      code: 422,
    };
  }

  else if(!verifyQuantity.type(quantity)) {
    return {
      data: {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be a number'
        }
      },
      code: 422,
    };
  } else {
    const dataErr = {
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong id format'
      }
    };
    const codeErr = 422;
    const codeSuccess = 200;
    try {
      const product = await update(name, quantity, id);
      if (!product) return {
        data: dataErr,
        code: codeErr
      };
  
      return {
        data: product,
        code: codeSuccess,
      };
    } catch (error) {
      return {
        data: dataErr,
        code: codeErr
      };
    }
  } 

};

const deleteProduct = async (id) => {
  const dataErr = {
    'err': {
      'code': 'invalid_data',
      'message': 'Wrong id format'
    }
  };
  const codeErr = 422;
  const codeSuccess = 200;
  try {
    const product = await exclude(id);
    if (!product) return {
      data: dataErr,
      code: codeErr
    };
    return {
      data: product,
      code: codeSuccess,
    };
  } catch (error) {
    return {
      data: dataErr,
      code: codeErr
    };
  }
};

const listProducts = async () => {
  const products = await getAll();
  return products;
};

const getProduct = async (id) => {
  const dataErr = {
    'err': {
      'code': 'invalid_data',
      'message': 'Wrong id format'
    }
  };
  const codeErr = 422;
  const codeSuccess = 200;
  try {
    const product = await getById(id);
    console.log(product);
    if (!product) return {
      data: dataErr,
      code: codeErr
    };

    return {
      data: product,
      code: codeSuccess,
    };
  } catch (error) {
    return {
      data: dataErr,
      code: codeErr
    };
  }
};

module.exports = {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};