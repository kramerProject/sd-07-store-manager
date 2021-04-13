const verifyDataSales = require('../schemas/verifyDataSales');

const code = {
  unprocessable: 422,
};

const validateSales = async (req, res, next) => {
  const validate = await verifyDataSales(req.body);

  if (validate.code)
    return res.status(code.unprocessable).json({ err: validate });

  next();
};

module.exports = validateSales;