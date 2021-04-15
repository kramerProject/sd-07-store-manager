const ProductService = require('../services/productService');
const ERROR = 500;
const SUCESS = 200;

const addProduct = async (req, resp) => {
  try {
    const { name, quantity } = req.body;
    const { code, message, newProduct } = await ProductService.add(name, quantity);

    if (newProduct === undefined) 
      return resp.status(code).json({ err: { code: 'invalid_data', message } });

    resp.status(code).json(newProduct);
    
  } catch (error) {
    console.error(error.message);
	  resp.status(ERROR).json({ message: error.message });
  }
};

const getAll = async (req, resp) => {
  try {
    const products = await ProductService.getAll();
    resp.status(SUCESS).json({products: products});
  } catch (error) {
    console.error(error.message);
	  resp.status(ERROR).json({ message: error.message });
  }
};

const getById = async (req, resp) => {
  const { id } = req.params;
  console.log(id);
  const product = await ProductService.getById(id);
  console.log(product);
  resp.status(SUCESS).json(product);
};

module.exports = {
  addProduct,
  getAll,
  getById,
};