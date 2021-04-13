const verifyDataProducts = require('../schemas/verifyDataProducts');

const code = {
  unprocessable: 422,
};

const validateProducts = async (req, res, next) => {
  const {  name, quantity } = req.body;
  const validate = await verifyDataProducts(name, quantity);

  if (validate.code)
    return res.status(code.unprocessable).json({ err: validate });

  next();
};

module.exports = validateProducts;
