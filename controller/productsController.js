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
    console.log(error.message);
    res.status(UNPROCESSABLE_ENTITY).json(JSON.parse(error.message));
  }
};

module.exports = {
  addProduct,
};