const { addSales } = require('../models');
const { update } = require('../services');
const { SUCCESS, INTERNAL} = require('../CODE_ERROR');

async function addSale(req, res) {
  try {
    const sale = req.body;
    const data = await addSales(sale);
    await update(sale);
    res.status(SUCCESS).json(data);
  } catch (error) {
    res.status(INTERNAL).json({ code: INTERNAL, message: error.message });
  }
}

module.exports = { addSale };
