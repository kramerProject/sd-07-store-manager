const Product = require('../models/productModel');

module.exports = async (id) => {
  console.log('entrei no teste');
  console.log(id);

  const productById = await Products.getProductById(id);
  console.log(productById);
  if(!productById) throw ({ err: {
    code: 'invalid_data',
    message: 'Wrong id format'
  }});
};
