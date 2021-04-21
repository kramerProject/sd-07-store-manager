const { deleteProduct } = require('../models');
const { SUCCESS, ENTITY} = require('../CODE_ERROR');

async function deleteProducts(req, res) {
  const message = { 
    err: { 
      code: 'invalid_data', 
      message: 'Wrong id format' 
    }
  };
  
  try {
    const { id } = req.params;
    const data = await deleteProduct(id);
    return res.status(SUCCESS).json(data);
  } catch (error) {
    res.status(ENTITY).json(message);
  }
}

module.exports = { deleteProducts };
