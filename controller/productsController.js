const productsService = require('../service/productService');
const {
  UNPROCESSABLE_ENTITY,
  CREATED
} = require('../httpsStatus.json');

const addProduct = async (req, res) => {
  try {
    const { addProduct } = productsService;
    const { name, quantity } = req.body;
  
    const newProduct = await addProduct(name, quantity);

    res.status(CREATED).json(newProduct);
  } catch (error) {
    res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        'code': 'invalid_data',
        'message': error.message
      }
    });
  }
};

module.exports = {
  addProduct,
};