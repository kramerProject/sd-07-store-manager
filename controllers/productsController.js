const productService = require('../service/productService');

async function addProduct(req, res) {
  const { name, quantity } =  req.body;
  const result = await productService.addNewProduct(name, quantity);
  res.status(result.status).send (result.message);
}