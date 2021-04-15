const ProductService = require('../services/productService');
const ERROR = 500;

const addProduct = async (req, resp) => {
  try {
    const { name, quantity } = req.body;
    const { code, message, newProduct } = await ProductService.add(name, quantity);

    if (!newProduct) 
      return resp.status(code).json({ err: { code: 'invalid_data', message } });

    resp.status(code).json(newProduct);
    
  } catch (error) {
    console.error(error.message);
	  resp.status(ERROR).json({ message: error.message });
  }
};

module.exports = {
  addProduct
};