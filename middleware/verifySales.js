const connect = require('../db');
const status = require('http-status');
const collections = 'sales';
const sales = require('../services/salesService');

async function verifyQuantity(req, res, next){
  const sold = req.body;
  sold.forEach(sale => {
    if(sale.quantity < 1 || typeof sale.quantity !== 'number'){
      return res.status(status.UNPROCESSABLE_ENTITY)
        .json({
          err:
            { code: 'invalid_data',
              message: 'Wrong product ID or invalid quantity' }
        });
    }
  });
  next();
}

async function verifyExists(req, res, next) {
  const {id} = req.params;
  const foundId = await sales.getBySaleId(id);
  if(!foundId){
    return res
      .status(status.NOT_FOUND).json({
        err:
          { code: 'not_found', message: 'Sale not found' }
      });
  }
  next();
}

async function verifyDelete(req, res, next) {
  const {id} = req.params;
  const foundId = await sales.getBySaleId(id);
  if(!foundId){
    return res
      .status(status.UNPROCESSABLE_ENTITY).json({
        err:
          { code: 'invalid_data', message: 'Wrong sale ID format' }
      });
  }
  next();
}


module.exports = {
  verifyQuantity,
  verifyExists,
  verifyDelete
};