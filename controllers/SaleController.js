const { createSale, listSales,
  getSale, deleteSale } = require('../services/salesService');

const SignSale = async (req, res) => {
  try {
    const data = await createSale(req.body);
    return res.status(data.code).json(data.data);
  } catch (error) {
    console.error(err.message);
    return res.status(statusErr).json('Error');
  }
};

const allSales = async (req, res) => {
  const codeSuccess = 200;
  const products = await listSales();
  return res.status(codeSuccess).json({'sales': products});
};

const saleByID = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getSale(id);
    return res.status(data.code).json(data.data);
  } catch (error) {
    throw new Error(error);
  }
};

const excludeSale = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await deleteSale(id);
    return res.status(data.code).json(data.data);
  } catch (error) {
    throw new Error(error);
  }
};
  

module.exports = {
  SignSale,
  allSales,
  saleByID,
  excludeSale,
};