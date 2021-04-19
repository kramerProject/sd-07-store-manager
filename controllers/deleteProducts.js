const { deleteProduct } = require('../models');
const { SUCCESS, ENTITY} = require('../CODE_ERROR');

async function deleteProducts(req, res) {
  try {
    const { id } = req.params;
    const data = await deleteProduct(id);
    res.status(SUCCESS).json(data);
  } catch (error) {
    res.status(ENTITY).json({ 
      err: { 
        code: 'invalid_data', 
        message: 'Wrong ID format' 
      }
    });
  }
}

module.exports = { deleteProducts };
