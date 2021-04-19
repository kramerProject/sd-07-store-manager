const { findNameSales } = require('../models');
const { SUCCESS, NOT_FOUND } = require('../CODE_ERROR');

async function findNameSale(req, res) {
  try {
    const { name } = req.body;
    const data = await findNameSales(name);
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

module.exports = { findNameSale };
