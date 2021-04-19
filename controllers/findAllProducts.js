const { findAllProduct } = require('../models');
const { SUCCESS, INTERNAL } = require('../CODE_ERROR');

async function findAllProducts(_req, res) {
  try {
    const data = await findAllProduct();
    res.status(SUCCESS).json({ products: data });
  } catch (error) {
    res.status(INTERNAL).json({ message: error.message });
  }
}

module.exports = { findAllProducts };
