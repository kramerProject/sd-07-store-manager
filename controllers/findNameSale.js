const { findNameSales } = require('../models');
const { SUCCESS, NOT_FOUND } = require('../CODE_ERROR');

async function findNameSale(req, res) {
  const message = { 
    err: { 
      code: 'not_found', 
      message: 'Sale not found' 
    }
  };
  
  try {
    const { name } = req.body;
    const data = await findNameSales(name);
    res.status(SUCCESS).json(data);
  } catch (error) {
    res.status(NOT_FOUND).json(message);
  }
}

module.exports = { findNameSale };
