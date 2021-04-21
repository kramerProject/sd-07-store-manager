const { findAllProduct } = require('../models');
const { SUCCESS, INTERNAL } = require('../CODE_ERROR');

async function findAllProducts(_req, res) {
  try {
    const data = await findAllProduct();
    return res.status(SUCCESS).json({ products: data });
  } catch (error) {
    return res.status(INTERNAL).json({ message: error.message });
  }
}

module.exports = { findAllProducts };
