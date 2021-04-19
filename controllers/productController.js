const ProductService = require('../services/productService');
const ERROR = 500;
const SUCESS = 200;

const addProduct = async (req, resp) => {
  try {
    const { name, quantity } = req.body;
    const { code, message, newProduct } = await ProductService.addProduct(name, quantity);

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
  try {
    const { id } = req.params;
    const {code, message, product} = await ProductService.getById(id);
    if(message) return resp.status(code).json({ err: { code: 'invalid_data', message } });
    resp.status(code).json(product);
  } catch (error) {
    console.error(error.message);
	  resp.status(ERROR).json({ message: error.message });
  }
};

const updateProduct = async (req, resp) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const { code, message, newProduct } = 
    await ProductService.updateProduct(id, name, quantity);

    if (newProduct === undefined){
      return resp.status(code).json({ err: { code: 'invalid_data', message } });
    }
      
    return resp.status(code).json(newProduct);
    
  } catch (error) {
    console.error(error.message);
	  resp.status(ERROR).json({ message: error.message });
  }
};

const deleteProduct = async (req, resp) => {
  try {
    const { id } = req.params;
    const { code, message, deletedProduct } =  await ProductService.deleteProduct(id);
    if (deletedProduct === undefined) {
      return resp.status(code).json({ err: { code: 'invalid_data', message } });
    }
    return resp.status(code).json(deletedProduct);
  } catch (error) {
    console.error(error.message);
	  resp.status(ERROR).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};