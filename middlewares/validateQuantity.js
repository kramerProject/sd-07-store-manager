const validateQuantityMiddleware = (req, res, next) => {
  const { quantity } = req.body;
  const zero = 0;
  const HTTP422 = 422;
  if (quantity <= zero) {
    return res.status(HTTP422).json({
      err:{
        code: 'invalid_data', 
        message: '"quantity" must be larger than or equal to 1'
      }
             
    });
  }

  if (typeof(quantity) === 'string') {
    return res.status(HTTP422).json({
      err:{
        code: 'invalid_data', 
        message: '"quantity" must be a number'
      }
             
    });
  }
    
  next();    
};

module.exports = validateQuantityMiddleware;