const productModel = require('../models/productModel');
const connection = require('../config/connection');

const registerProduct = async (req, res) => {
  const unprocessable = 422;
  const created = 201;
  const internalError = 500;
  const five = 5;
  const zero = 0;

  try {
    const { name, quantity } = req.body;
    const checkProductExist = await connection()
      .then((db) => db.collection('products').findOne({ name: name }));
    if(name.length < five) {
      return res.status(unprocessable).send({
        'err': 
				{'code': 'invalid_data',
				  'message': '"name" length must be at least 5 characters long'} });
    }
    if(checkProductExist){
      return res.status(unprocessable).send({'err': 
			{'code': 'invalid_data',
			  'message': 'Product already exists'} });
    }
    if(quantity <= zero) {
      return res.status(unprocessable).send({'err': 
			{'code': 'invalid_data',
			  'message': '"quantity" must be larger than or equal to 1'} });
    }
    if(typeof quantity === 'string') {
      return res.status(unprocessable).send({'err': 
			{'code': 'invalid_data',
			  'message': '"quantity" must be a number'} });
    }
    const newProduct = await productModel.register(name, quantity);
    res.status(created).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(internalError).json({ message: err.message });
  }
};

module.exports = {
  registerProduct
};