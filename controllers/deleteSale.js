const { deleteSales } = require('../models');
const { restore } = require('../services');
const { SUCCESS, ENTITY} = require('../CODE_ERROR');

async function deleteSale(req, res) {
  try {
    const { id } = req.params;
    await restore(id);
    const data = await deleteSales(id);
    res.status(SUCCESS).json(data);
  } catch (error) {
    res.status(ENTITY).json({ 
      err: { 
        code: 'invalid_data', 
        message: 'Wrong sale ID format' 
      }
    });
  }
}

module.exports = { deleteSale };
