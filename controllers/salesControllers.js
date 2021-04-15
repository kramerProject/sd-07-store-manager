const saleModel = require('../models/saleModel');
const connection = require('../config/connection');

const sucess = 200;
const notFound = 404;
const unprocessable = 422;
const zero = 0;

//Dinâmica da função registerSale: primeiramente, é preciso verificar a questão das quantidades, se é negativa ou string. A solução foi pegar o req.body (que é um array) e executar um forEach, e para cada item verificar o 'quantity'. Superando os ifs, o req.body é enviado por completo para o model, que vai dar o tratamento necessário.

const registerSale = async (req, res) => {
  try {
    req.body.forEach((sale) => {
      if(sale.quantity <= zero) {
        return res.status(unprocessable).send({'err': 
    	{'code': 'invalid_data',
    	  'message': 'Wrong product ID or invalid quantity'} });
      }
      if(typeof sale.quantity === 'string') {
        return res.status(unprocessable).send({'err': 
    	{'code': 'invalid_data',
    	  'message': 'Wrong product ID or invalid quantity'} });
      }
    });
    const newSale = await saleModel.register(req.body);
    return res.status(sucess).json(newSale);
  } catch (err) {
    console.error(err.message);
  }
};

const getAll = async (req, res) => {
  try {
    const sales = await saleModel.getAllSales();
    res.status(sucess).json({ sales });
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

const updateSale = async (req, res) => {
  try {
    // const { productId, quantity } = req.body;
    const { id } = req.params;
    req.body.forEach((data) => {
      if(data.quantity <= zero) {
        return res.status(unprocessable).send({'err': 
    	{'code': 'invalid_data',
    	  'message': 'Wrong product ID or invalid quantity'} });
      }
      if(typeof data.quantity === 'string') {
        return res.status(unprocessable).send({'err': 
    	{'code': 'invalid_data',
    	  'message': 'Wrong product ID or invalid quantity'} });
      }
    });
    const sale = await saleModel.update(id, req.body);
    res.status(sucess).json(sale);
  } catch (err) {
    console.error(err.message);
  }
};


module.exports = {
  getAll,
  getById,
  registerSale,
  updateSale
};