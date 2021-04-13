const productService = require('../service/productService');
const STATUS_OK = 201;


const insertProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    await productService.insertProduct(name, quantity);

    return res.status(STATUS_OK).json({name, quantity});
  } catch (error) {
    console.error({ message: 'Não entrou no controller' });
  }
};
module.exports = {
  insertProduct,
};
