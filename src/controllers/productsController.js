const { productsService } = require('../services');
const { createProduct, readyProducts } = productsService;

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

const productReady = async (_req, res) => {
  try {
    const result = await readyProducts();
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
  }
};

const productUpdate = (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

const productDelete = (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  productCreate,
  productReady,
  productUpdate,
  productDelete,
};
