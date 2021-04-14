const productModel = require('./productModels');

const CREATED = 201;
const ERROR = 422;

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const item = await productModel.addProduct(name, quantity);
    res.status(CREATED).json(item);
  } catch (error) {
    res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message } });
  }
};

module.exports = {
  addProduct,
};
