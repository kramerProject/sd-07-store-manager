const model = require('../models/sale');
const { throwError } = require('../configs/erro');
const { status, errors } = require('../configs/status');

const createSale = async (sale) => {
  const insertedId = await model.createSale(sale);

  const createdSale = {
    _id: insertedId,
    itensSold: sale,
  };

  return createdSale;
};

const getAllSales = async () => {
  const sales = await model.getAllSales();

  const resultSales = { sales };

  return resultSales;
};

const getSaleById = async (id) => {
  const sale = await model.getSaleById(id);

  return sale;
};

const updateSale = async (id, sale) => {
  const updatedSale = await model.updateSale(id, sale);

  if (updatedSale === 1) {
    const updateSales = {
      _id: id,
      itensSold: sale,
    };

    return updateSales;
  }
};

const deleteSale = async (id) => {
  const deletedSale = await model.getSaleByIdToDelete(id);

  if (!deletedSale) {
    throw new throwError(status.notFound, errors.wrongSaleID);
  }

  await model.deleteSale(id);

  return deletedSale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
