const { deleteSales, findIdSales } = require('../models');
const { restore } = require('../services');
const { SUCCESS, ENTITY } = require('../CODE_ERROR');

async function deleteSale(req, res) {
  const E1 = { 
    err: { 
      code: 'invalid_data', 
      message: 'Wrong sale ID format' 
    }
  };
  
  try {
    const { id } = req.params;
    await restore(id);
    const valid = await findIdSales(id);
    await deleteSales(id);
    return res.status(SUCCESS).json(valid);
  } catch (error) {
    return res.status(ENTITY).json(E1);
  }
}

module.exports = { deleteSale };
