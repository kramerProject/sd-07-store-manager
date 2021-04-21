const { editSales } = require('../models');
const { SUCCESS, ENTITY} = require('../CODE_ERROR');

async function editSale(req, res) {
  try {
    const { id } = req.params;
    const sale = req.body;
    const data = await editSales(id, sale);
    res.status(SUCCESS).json(data);
  } catch (error) {
    res.status(ENTITY).json({ 
      err: { 
        code: 'invalid_data', 
        message: 'Wrong product ID or invalid quantity' 
      }
    });
  }
}

module.exports = { editSale };
