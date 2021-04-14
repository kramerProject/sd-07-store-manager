const connect = require('../config/connection');
const five = 5;
const zero = 0;
const unprocessable_entity = 422;

function validateName(name) {
  // throw new Error('O campo "age" é obrigatório')
   
  if (name.length < five) {
    throw new Error(JSON.stringify({
      'err': {
        'code': 'invalid_data',
        'message': '"name" length must be at least 5 characters long'
      }
    }));
  }

  connect().then(async (db) => {
    const [productList] = await db.collection('products').find({ 'name': name });
   
    if (productList.length > zero) {
      throw new Error (JSON.stringify({
        'err': {
          'code': 'invalid_data',
          'message': 'Product already exists'
        }
      }));
    }
  });
    
}

module.exports = {
  validateName
};