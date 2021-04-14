const Sale = require('../models/salesModel');
const { ObjectId } = require('mongodb');


const existingSale = async (req, res, next) => {
  const { id } = req.params;

  const code = 404;
  const err = {
    code: 'not_found',
    message: 'Sale not found',
  };

  if (!ObjectId.isValid(id)) return res.status(code).json({ err });

  const sale = await Sale.findById(id);

  if (sale === null) {
    const code = 404;
    return res.status(code).json({ err });
  }
  next();
};

module.exports = existingSale;