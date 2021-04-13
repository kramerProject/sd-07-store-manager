const status = require('http-status');

function verifyName (req, res, next){
  const { name } = req.body;
  const minLength = 5;
  if(name.length < minLength)return res
    .status(status.UNPROCESSABLE_ENTITY)
    .json(
      {err:
        {code:'invalid_data', message:'"name" length must be at least 5 characters long'}
      });
  next();
}

function verifyQuantity (req, res, next){
  const {quantity} = req.body;
  const minimumValue = 1;
  if(quantity < minimumValue) return res
    .status(status.UNPROCESSABLE_ENTITY).json(
      {err:
        {code:'invalid_data', message:'"quantity" must be larger than or equal to 1'}
      });
  next();
  if(typeof quantity !== 'number') return res
    .status(status.UNPROCESSABLE_ENTITY).json({err:
      {code:'invalid_data', message:'"quantity" must be a number'}
    });
    
}
module.exports = {verifyName, verifyQuantity};
