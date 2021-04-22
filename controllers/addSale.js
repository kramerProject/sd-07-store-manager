const { addSales } = require('../models');
const { update } = require('../services');
const { SUCCESS, INTERNAL} = require('../CODE_ERROR');

async function addSale(req, res) {
  try {
    const sale = req.body;
    const data = await addSales(sale);
    await update(sale);
    return res.status(SUCCESS).json(data);
  } catch (error) {
    return res.status(INTERNAL).json({ status: INTERNAL, err: error.message });
  }
}

module.exports = { addSale };
