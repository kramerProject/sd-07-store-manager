const { productsService } = require('../services');
const {
  createProduct,
  readProducts,
  readProductsById,
  updateProductById,
  deleteProductById,
} = productsService;

const SUCESS = 200;
const CREATE = 201;

const productCreate = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await createProduct(name, quantity);
    res.status(CREATE).json(result);
  } catch (error) {
    console.error(error);
  }
};

const productRead = async (_req, res) => {
  try {
    const result = await readProducts();
    res.status(SUCESS).json({
      products: result,
    });
  } catch (error) {
    console.error(error);
  }
};

const productReadById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await readProductsById(id);
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
  }
};

const productUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await updateProductById(id, name, quantity);
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
  }
};

const productDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductById(id);
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  productCreate,
  productRead,
  productReadById,
  productUpdate,
  productDelete,
};
