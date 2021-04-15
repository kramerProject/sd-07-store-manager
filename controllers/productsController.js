const productsServices = require('../services/productsServices');
const SUCCESS = 200;

const createProduct = async(req, res) => {
  try {
    const { name, quantity } = req.body;
    const response = await productsServices.createProduct(name, quantity);
    res.status(response.status).json(response.message);
  } catch(error) { 
    console.error(error.message);
  }
};

module.exports = {
  createProduct,
};