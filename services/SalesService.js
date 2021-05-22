const SalesModel = require('../models/SalesModel');

const SalesSchema = require('../schemas/SalesSchema');

const getAll = async () => {
  const sales = await SalesModel.getAll();
  return ({sales: sales});
};

const findById = async (id) => {
  const validate = SalesSchema.validateId(id);
  if (validate.message) return(validate);

  const sale = await SalesModel.findById(id);
  if (!sale) return({ code: 'invalid_data', message: 'Wrong id format'});

  return ({ sale });
};

const create = async (salesArray) => {


  const validateSales = await SalesSchema
    .validateSales(salesArray);

  if (validateSales.message)
    return validateSales;

  const sales = await SalesModel.create(salesArray);

  return ({ sales });
};

const updateById = async (id, name, quantity) => {
  const validateNameQty = await SalesSchema.validateNameQuantity(name, quantity);
  if (validateNameQty.message) return validateNameQty;

  const sale = await SalesModel.updateById(id, name, quantity);
  return ({ sale });
};

const deleteById = async (id) => {
  const result = await SalesModel.deleteById(id);
  return (result);
};

module.exports = {
  getAll,
  create,
  findById,
  updateById,
  deleteById,
};
