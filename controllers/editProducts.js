const { editProduct } = require('../models');
const { SUCCESS, ENTITY} = require('../CODE_ERROR');

async function editProducts(req, res) {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const data = await editProduct(id, name, quantity);
    res.status(SUCCESS).json(data);
  } catch (error) {
    res.status(ENTITY).json({
      err: { 
        code: 'invalid_data', 
        message: 'Wrong sale id format' 
      }
    });
  }
}

module.exports = { editProducts };
