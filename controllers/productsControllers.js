const {
  insertProduct,
  getProducts,
  findProductById } = require('../services/productServices');
const httpStatus = {
  SUCCESS: 200,
  UNPROCESSABLE_ENTITY: 422,
  CREATED: 201,
};

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const addProduct = await insertProduct(name, quantity);
    return res.status(httpStatus.CREATED).json(addProduct);
  } catch (error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        'code': 'invalid_data',
        'message': error.message,
      }
    });
  }
};

const getAllProducts = async (req, res) => {
  const allProducts = await getProducts();
  res.status(httpStatus.SUCCESS).json({ products: allProducts});
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await findProductById(id);
    res.status(httpStatus.SUCCESS).send(product);
  } catch (error) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ err: {
      'code': 'invalid_data',
      'message': error.message
    }});
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
};