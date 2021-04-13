const productModel = require('./productModels');

const CREATED = 201;
const ERROR = 500;

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const item = await productModel.addProduct(name, quantity);
    res.status(CREATED).json(item);
  } catch (error) {
    console.error(error.message);
    res.status(ERROR).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
};
