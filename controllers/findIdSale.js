const { findIdSales } = require('../models');
const { SUCCESS, NOT_FOUND } = require('../CODE_ERROR');

async function findIdSale(req, res) {
  const E1 = { 
    err: {
      code: 'not_found', 
      message: 'Sale not found' 
    }
  };
  const { id } = req.params;
  try {
    const data = await findIdSales(id);
    if (data) return res.status(SUCCESS).json(data);
  } catch (error) {
    return res.status(NOT_FOUND).json(E1);
  }
  
  const data = await findIdSales(id);
  if(data){
    return res.status(SUCCESS).json(data);
  } else{
    return res.status(NOT_FOUND).json(E1);
  }
}

module.exports = { findIdSale };
