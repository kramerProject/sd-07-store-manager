const saleService = require('../service/salesService');

const OK = 200;

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
  const { code, sales } = await saleService.getAll();
  return res.status(code).json({ sales });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const { code, err, sales } = await saleService.getById(id);

  if(!sales) return res.status(code).json({ err });

  return res.status(code).json(sales);
};

const updateSales = async (req, res) => {
  const itemSold = req.body;
  const { id } = req.params;
  console.log(req.body);
  

  const { code, err, sale } = await saleService.update(id, itemSold);
  if(!sale) return res.status(code).json({ err });

  res.status(200).json(sale);
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  updateSales
};