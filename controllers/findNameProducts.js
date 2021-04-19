const { findNameProduct } = require('../models');
const { SUCCESS, NOT_FOUND } = require('../CODE_ERROR');

async function findNameProducts(req, res) {
  try {
    const { name } = req.body;
    const data = await findNameProduct(name);
    res.status(SUCCESS).json(data);
  } catch (error) {
    res.status(NOT_FOUND).json({ 
      err: { 
        code: 'not_found', 
        message: 'Wrong name format' 
      }
    });
  }
}

module.exports = { findNameProducts };
