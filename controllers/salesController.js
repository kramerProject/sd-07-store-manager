const status = require('../config/status');
const salesSevice = require('../service/salesService');

const addSalesController = async (req, res, next) => {
  try {
    const products = req.body;
    const newSale = await salesSevice.addSalesService(products);
    if (newSale.code) return next(newSale);
    return res.status(status.SUCCESS).json(newSale);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports = {
  addSalesController,
};
