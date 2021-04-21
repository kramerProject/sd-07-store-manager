const { findNameProduct } = require('../models');
const { SUCCESS, NOT_FOUND } = require('../CODE_ERROR');

async function findNameProducts(req, res) {
  const message = { 
    err: { 
      code: 'not_found', 
      message: 'Wrong name format' 
    }
  };
  
  try {
    const { name } = req.body;
    const data = await findNameProduct(name);
    return res.status(SUCCESS).json(data);
  } catch (error) {
    return res.status(NOT_FOUND).json(message);
  }
}

module.exports = { findNameProducts };
