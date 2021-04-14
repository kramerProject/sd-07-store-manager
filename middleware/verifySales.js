const connect = require('../db');
const status = require('http-status');
const collections = 'sales';
const sales = require('../services/salesService');

async function verifyQuantity(req, res, next){
  const sold = req.body;
  sold.forEach(sale => {
    console.log(sale.quantity);
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


module.exports = {
  verifyQuantity
};