const { findIdProduct } = require('../models');
const { SUCCESS, ENTITY } = require('../CODE_ERROR');

async function findIdProducts(req, res) {
  try {
    const { id } = req.params;
    const data = await findIdProduct(id);
    res.status(SUCCESS).json(data);
  } catch (error) {
    res.status(ENTITY).json({ 
      err: { 
        code: 'invalid_data', 
        message: 'Wrong id format' 
      }
    });
  }
}

module.exports = { findIdProducts };
