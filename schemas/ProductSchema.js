
const errors = {
  WRONG_ID_FORMAT: { err: 
    {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  }
};

const hasProp = (obj, key) => obj.hasOwnProperty(key);

const isProduct = (product) => {

  if(typeof(product) === 'object' && hasProp(product, 'name') && hasProp(product, 'quantity') && hasProp(product, '_id')) {
    console.log('1');
    return product;
  } 

  console.log('2');
  return errors.WRONG_ID_FORMAT;
};

module.exports = {
  isProduct,
  errors
};