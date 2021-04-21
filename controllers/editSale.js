const { editSales } = require('../models');
const { SUCCESS, ENTITY} = require('../CODE_ERROR');

async function editSale(req, res) {
  const message = { 
    err: { 
      code: 'invalid_data', 
      message: 'Wrong product ID or invalid quantity' 
    }
  };

  try {
    const { id } = req.params;
    const sale = req.body;
    const data = await editSales(id, sale);
    return res.status(SUCCESS).json(data);
  } catch (error) {
    return res.status(ENTITY).json(message);
  }
}

module.exports = { editSale };
