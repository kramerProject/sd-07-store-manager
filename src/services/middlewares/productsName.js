
const productMiddlewaresName = (req, res, next) => {
  const { name } = req.body;
 
  if (!name || name.length < 5) {
    return  res.status(422).json(
      {
        err: {
          code: 'invalid_data',
          message: '\"name\" length must be at least 5 characters long'
        }
      }
    );
  }

  next();
};

module.exports = productMiddlewaresName;