const validateNamedMiddleware = (req, res, next) => {
  const { name } = req.body;
  const cinco =  5;
  const HTTP422 = 422;
  if (name.length < cinco ) {
    return res.status(HTTP422).json({
      err:{
        code: 'invalid_data', 
        message: '"name" length must be at least 5 characters long'
      }
             
    });
  }
  next();    
};

module.exports = validateNamedMiddleware;