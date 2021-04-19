const { findIdSales } = require('../models');
const { SUCCESS, NOT_FOUND } = require('../CODE_ERROR');

async function findIdSale(req, res) {
  try {
    const { id } = req.params;
    const data = await findIdSales(id);
    res.status(SUCCESS).json(data);
  } catch (error) {
    res.status(NOT_FOUND).json({ 
      err: { 
        code: 'not_found', 
        message: 'Sale not found' 
      }
    });
  }
}

module.exports = { findIdSale };
