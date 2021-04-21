const { deleteSales } = require('../models');
const { restore } = require('../services');
const { SUCCESS, ENTITY} = require('../CODE_ERROR');

async function deleteSale(req, res) {
  const message = { 
    err: { 
      code: 'invalid_data', 
      message: 'Wrong sale ID format' 
    }
  };

  try {
    const { id } = req.params;
    await restore(id);
    const data = await deleteSales(id);
    return res.status(SUCCESS).json(data);
  } catch (error) {
    return res.status(ENTITY).json(message);
  }
}

module.exports = { deleteSale };
