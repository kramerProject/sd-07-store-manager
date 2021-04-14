const salesModel = require('../model/salesModel');
const salesServices = require('../services/salesServices');

const {
  ok,
  serverError,
  badRequest,
  unprocessable
} = require('../schemas/codesHTTP');

const addSale = async (req, res) => {
  try {
    await salesServices.subtractProduct(req.body);
    const newSale = await salesModel.addSale(req.body);
    return res.status(ok).json(newSale);

  } catch (error) {
    return res.status(serverError).json({ message: 'Algo deu errado' });
  }

};

const getAllSales = async (_req, res) => {
  try {
    const sales = await salesModel.getAll();
    if (sales) return res.status(ok).json({ sales });
  } catch (error) {
    return res.status(serverError).json({ message: 'Algo deu errado' });
  }
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await salesModel.getById(id);

    if (sale === null) throw new Error; 
    return res.status(ok).json(sale);
  } catch (error) {
    return res.status(badRequest).json(
      {
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }
      }
    );
  }
};

const updateSale = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSale = await salesModel.updateSale(id, req.body);
    return res.status(ok).json(updatedSale);
    
  } catch (error) {
    return res.status(serverError).json({ message: 'Algo deu errado' });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSale = await salesModel.deleteSale(id);
    if (deletedSale === null) throw new Error; 
    await salesServices.sumProduct(deletedSale.itensSold);
    return res.status(ok).json(deletedSale);
  } catch (error) {
    return res.status(unprocessable).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
