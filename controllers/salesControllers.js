const saleModel = require('../models/saleModel');
const connection = require('../config/connection');

const sucess = 200;
const notFound = 404;

const registerSale = async (req, res) => {

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

const getAll = async (req, res) => {
  try {
    const sales = await saleModel.getAllSales();
    res.status(sucess).json({
      'sales': sales
    });
  } catch (err) {
    console.error(err.message);
  }
};
  
const getById = async (req, res) => {
  try {
    const { id } = req.params;
  
    const result = await saleModel.getProductsById(id);
  
    if (!result) {
      return res.status(notFound).json({'err': 
        {'code': 'not_found',
          'message': 'Sale not found'} });
    }
  
    res.status(sucess).json(result);
  } catch (err) {
    console.error(err.message);
  }
};


module.exports = {
  getAll,
  getById
};