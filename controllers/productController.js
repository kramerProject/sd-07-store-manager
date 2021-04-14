const productService = require('../service/productService');
const STATUS_CREATED = 201;
const STATUS_OK = 200;
const STATUS_UNPROCESSABLE = 422;

const insertProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await productService.insertProduct(name, quantity);
    return res.status(STATUS_CREATED).json(product.ops[0]);
  } catch (error) {
    console.error({ message: 'Não entrou no controller' });
  }
};

const showAllProducts = async (_req, res) => {
  try {
    const products = await productService.showAllProducts();
    return res.status(STATUS_OK).json({ products});
  } catch (error) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: 'Não entrou no controller' });
  }
};

const showProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.showProductId(id);
    const {_id, name, quantity } = product;
    return res.status(STATUS_OK).json({_id, name, quantity});
  } catch (err) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: 'Não entrou no controller' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productService.updateProduct(id, name, quantity);
    const valueProduct = product.value;
    return res.status(STATUS_OK).json(
      { _id:valueProduct._id, name:valueProduct.name, quantity:valueProduct.quantity }
    );
  } catch (err) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: 'Não entrou no controller' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = productService.showProductId(id);
    await productService.deleteProduct(id);
    return res.status(STATUS_OK).json(product);
  } catch (error) {

  }
};

module.exports = {
  insertProduct,
  showAllProducts,
  showProductId,
  updateProduct,
  deleteProduct
};
