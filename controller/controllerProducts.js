const {
  validateName,
  serviceAddItem,
  validateQuantity
} = require('../service/productService');

const addProduct = async (req, res) => {
  const unprocessable_entity = 422;
  const success= 201;
  try {
    const { name, quantity } = req.body;
    await validateName(name);
    validateQuantity(quantity);
    const newItem = await serviceAddItem(name, quantity);
    return res.status(success).json(newItem);
  } catch (err) {
    res.status(unprocessable_entity).json({ 
      'err': {
        'code': 'invalid_data', 'message': err.message
      }
    });
  }
};

module.exports = {
  addProduct
};