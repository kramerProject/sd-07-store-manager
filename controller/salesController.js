const saleService = require('../service/salesService');


const addSale = async (req, res) => {
  const { body } = req;

  // console.log(body[0].quantity);
  // const { quantity, productId } = req.body[0];
  
  const {code, newSale, err }= await saleService.add(body);

  if(!newSale) return res.status(code).json({ err });

  const { _id, itensSold } = newSale;

  res.status(code).json( { _id, itensSold });
};

const getAllSales = async (req, res) => {
  const sales = await saleService.getAll();
  res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const getSales = await saleService.getById(id);

  res.status(200).json(getSales);
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
};