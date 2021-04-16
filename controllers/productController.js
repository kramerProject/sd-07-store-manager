const productService = require('../services/productService');
const HTTP200 = 200;
const HTTP201 = 201;
const HTTP500 = 500;
const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productService.createProduct(name, quantity);
        
    res.status(HTTP201).json(result);
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

const allProducts = async (req, res) => {
  try {
    const result = await productService.getAllProduct();
        
    res.status(HTTP200).json(result);
    
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

const oneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getOneProduct(id);
        
    res.status(HTTP200).json(result);
    
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};


module.exports = {
  createProduct,
  allProducts,
  oneProduct
};