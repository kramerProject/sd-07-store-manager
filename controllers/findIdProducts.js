const { findIdProduct } = require('../models');
const { SUCCESS, ENTITY } = require('../CODE_ERROR');

async function findIdProducts(req, res) {
  const message = { 
    err: { 
      code: 'invalid_data', 
      message: 'Wrong id format' 
    }
  };
  
  try {
    const { id } = req.params;
    const data = await findIdProduct(id);
    return res.status(SUCCESS).json(data);
  } catch (error) {
    return res.status(ENTITY).json(message);
  }
}

module.exports = { findIdProducts };
