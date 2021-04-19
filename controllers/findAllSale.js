const { findAllSales } = require('../models');
const { SUCCESS, INTERNAL } = require('../CODE_ERROR');

async function findAllSale(_req, res) {
  try {
    const data = await findAllSales();
    res.status(SUCCESS).json({ sales: data });
  } catch (error) {
    res.status(INTERNAL).json({ message: error.message });
  }
}

module.exports = { findAllSale };
