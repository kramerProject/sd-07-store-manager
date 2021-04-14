const {
  validateName,
  serviceAddItem,
  validateQuantity
} = require('../service/productService');

const addProduct = async (req, res) => {
  const unprocessable_entity = 422;
  const twoOhOne = 201;
  try {
    const { name, quantity } = req.body;
    validateName(name);
    validateQuantity(quantity);
    const newItem = await serviceAddItem(name, quantity);
    return res.status(twoOhOne).json({ newItem });
  } catch (err) {
    res.status(unprocessable_entity).json({ message: err.message });
  }
};

module.exports = {
  addProduct
};