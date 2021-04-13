const products = require('../services/products');

const SUCCESS = 201;
const SUCCESS_GET = 200;
const FAILURE = 422;
const SYSTEM_FAILURE = 500;

const getProducts = async (req, res) => {
  const result = await products.getProducts();
  
  res.status(SUCCESS_GET).json({ products: result });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await products.getProductById(id);

  if(product.err) return res.status(FAILURE).json({ err: product.err });

  res.status(SUCCESS_GET).json(product.data);
};

const registerProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await products.registerProduct(name, quantity);

  if(result && result.err) return res.status(FAILURE).json({ err: result.err });
  if(!result) return res.status(SYSTEM_FAILURE).send();

  res.status(SUCCESS).json(result.data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await products.updateProduct(id, name, quantity);

  if(result && result.err) return res.status(FAILURE).json({ err: result.err });
  if(!result) return res.status(SYSTEM_FAILURE).send();

  res.status(SUCCESS_GET).json(result.data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await products.deleteProduct(id);
  
  if(deletedProduct && deletedProduct.err) (
    res.status(FAILURE).json({ err: deletedProduct.err })
  );

  if(!deletedProduct) return res.status(SYSTEM_FAILURE).send();

  res.status(SUCCESS_GET).json(deletedProduct.data);
};

module.exports = {
  registerProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
