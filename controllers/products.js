const products = require('../services/products');

const great = 201;
const created = 200;
const fail = 422;
const systemError = 500;

const getProducts = async (req, res) => {
  const result = await products.getProducts();

  res.status(created).json({ products: result });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await products.getProductById(id);

  if(product.err) return res.status(fail).json({ err: product.err });

  res.status(created).json(product.data);
};

const registerProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await products.registerProduct(name, quantity);

  if(result && result.err) return res.status(fail).json({ err: result.err });
  if(!result) return res.status(systemError).send();

  res.status(great).json(result.data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await products.updateProduct(id, name, quantity);

  if(result && result.err) return res.status(fail).json({ err: result.err });
  if(!result) return res.status(systemError).send();

  res.status(created).json(result.data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await products.deleteProduct(id);

  if(deletedProduct && deletedProduct.err) (
    res.status(fail).json({ err: deletedProduct.err })
  );

  if(!deletedProduct) return res.status(systemError).send();

  res.status(created).json(deletedProduct.data);
};

module.exports = {
  registerProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
