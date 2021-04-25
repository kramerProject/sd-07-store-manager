const Product = require('../service/Products');
const { UNPROCESSABLE_ENTITY, CREATED, OK } = require('../helper/status');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await Product.addProduct(name, quantity);

  const { code, message } = result;

  if (code === 'invalid') {
    return res.status(UNPROCESSABLE_ENTITY).send({ err: { code, message } });
  }

  res.status(CREATED).send(result);
};

const findAllProducts = async (req, res) => {
  const products = await Product.findAllProducts();

  res.status(OK).send({ products });
};

const findProductById = async (req, res) => {
  const { id } = req.params;

  const result = await Product.findProductById(id);

  const { code, message } = result;

  if (code === 'invalid')
    return res.status(UNPROCESSABLE_ENTITY).send({ err: { code, message } });

  res.status(OK).send(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await Product.updateProduct(id, name, quantity);

  const { code, message } = result;

  if (code === 'invalid') {
    return res.status(UNPROCESSABLE_ENTITY).send({ err: { code, message } });
  }

  res.status(OK).send(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const result = await Product.deleteProduct(id);

  const { code, message } = result;

  if (code === 'invalid'){
    return res.status(UNPROCESSABLE_ENTITY).send({ err: { code, message } });
  }

  res.status(OK).send({ result });
};

module.exports = {
  addProduct,
  findAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
