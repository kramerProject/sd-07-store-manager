const { deleteSales, findIdSales } = require('../models');
const { restore } = require('../services');
const { SUCCESS, ENTITY, NOT_FOUND} = require('../CODE_ERROR');

async function deleteSale(req, res) {
  const E1 = { 
    err: { 
      code: 'invalid_data', 
      message: 'Wrong sale ID format' 
    }
  };
  const E2 = { 
    err: { 
      code: 'not_found',
      message: 'Sale not found',
    }
  };

  try {
    const { id } = req.params;
    await restore(id);
    const valid = await findIdSales(id);
    if (valid) {
      await deleteSales(id);
      return res.status(SUCCESS).json(valid);
    }
    else{
      return res.status(NOT_FOUND).json(E2);
    }
  } catch (error) {
    return res.status(ENTITY).json(E1);
  }
}

module.exports = { deleteSale };
