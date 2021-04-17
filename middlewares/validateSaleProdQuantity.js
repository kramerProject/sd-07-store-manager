const validateSaleProdQuantityMiddleware = (req, res, next) => {
  const zero = 0;
  const HTTP422 = 422;
  const  quantity = req.body;
  console.log(quantity);  
  quantity.map((quant) => {
    if(quant.quantity <= zero || typeof(quant.quantity) === 'string' ) {
      return res.status(HTTP422).json({
        err:{
          code: 'invalid_data', 
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }
    

  });
  
  next(); 

};

module.exports = validateSaleProdQuantityMiddleware;