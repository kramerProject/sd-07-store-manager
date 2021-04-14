const productsModel = require('../model/productsModel');
const {
  created,
  ok,
  serverError,
  badRequest,
  unprocessable
} = require('../schemas/codesHTTP');

const addProduct =  async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const newProduct = await productsModel.addProduct(name, quantity);
    if (newProduct) {
      return res.status(created).json(newProduct);
    }
  } catch (error) {
    return res.status(serverError).json({ message: 'Algo deu errado' });
  }
};

const getAllProducts = async (_req, res) => {
  try {
    const products = await productsModel.getAll();
    if (products)
      return res.status(ok).json({ products });
  } catch (error) {
    return res.status(serverError).json({ message: 'Algo deu errado' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsModel.getById(id);

    if (!product) 
      return res.status(badRequest).json({ message: 'Produto não encontrado' });

    return res.status(ok).json(product);

  } catch (error) {

    return res.status(unprocessable).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const alteredProduct = await productsModel.updateProduct(id, name, quantity);
    return res.status(ok).json(alteredProduct);

  } catch (error) {
    return res.status(unprocessable).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await productsModel.deleteProduct(id);

    if (!deletedProduct) 
      return res.status(badRequest).json({ message: 'Produto não encontrado' });

    return res.status(ok).json(deletedProduct);

  } catch (error) {

    return res.status(unprocessable).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }

};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
