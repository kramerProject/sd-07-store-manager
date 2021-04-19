const { addProduct } = require('../models');
const { CREATED, INTERNAL} = require('../CODE_ERROR');

async function addProducts(req, res) {
  try {
    const { name, quantity } = req.body;
    const data = await addProduct(name, quantity);
    res.status(CREATED).json(data);
  } catch (error) {
    res.status(INTERNAL).json({ message: error.message });
  }
}

module.exports = { addProducts };
