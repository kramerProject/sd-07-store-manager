const { addProduct } = require('../models');
const { CREATED, INTERNAL} = require('../CODE_ERROR');

async function addProducts(req, res) {
  try {
    const { name, quantity } = req.body;
    const data = await addProduct(name, quantity);
    return res.status(CREATED).json(data);
  } catch (error) {
    return res.status(INTERNAL).json({ status: INTERNAL, err: error.message });
  }
}

module.exports = { addProducts };
