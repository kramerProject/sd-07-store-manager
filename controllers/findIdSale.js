const { findIdSales } = require('../models');
const { SUCCESS, NOT_FOUND } = require('../CODE_ERROR');

async function findIdSale(req, res) {
  const message = { 
    err: { 
      code: 'not_found', 
      message: 'Sale not found' 
    }
  };
  
  try {
    const { id } = req.params;
    const data = await findIdSales(id);
    return res.status(SUCCESS).json(data);
  } catch (error) {
    return res.status(NOT_FOUND).json(message);
  }
}

module.exports = { findIdSale };
