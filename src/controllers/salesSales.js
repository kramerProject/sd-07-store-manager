const sales = require('../services/salesService');
const codes = require('../services/codes');

const addSales = async (req, res) => {
  try {
    const { body } = req;
    const result = await sales.addSales(body);
    if (result.err) return res.status(codes.notProcessed).json(result);
    res.status(codes.sucess).json(result);
  } catch (error) {
    console.log(error.message);
  }

};

module.exports = {
  addSales,
};