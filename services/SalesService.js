const SalesModel = require('../models/SalesModel');
const ProductModel = require('../models/ProductsModel');

const SalesSchema = require('../schemas/SalesSchema');

const getAll = async () => {
  const sales = await SalesModel.getAll();
  return ({sales: sales});
};

const findById = async (id) => {
  const validate = SalesSchema.validateSaleId(id);
  if (validate.message) return({ code: 'not_found', message: 'Sale not found'});

  const sale = await SalesModel.findById(id);
  if (!sale) return({ code: 'not_found', message: 'Sale not found'});

  return ({ sale });
};

const create = async (salesArray) => {
  const multiplyerValue = -1;
  const validateSales = await SalesSchema
    .validateSales(salesArray);

  if (validateSales.message)
    return validateSales;

  await salesArray.forEach( async ({ productId, quantity }) => {
    await ProductModel.updateQtyById(productId, (quantity * multiplyerValue) );
  });

  const sales = await SalesModel.create(salesArray);

  return ({ sales });
};

const updateById = async (id, productId, quantity) => {
  const validateQuantity = await SalesSchema.validateQuantity(quantity);
  if (validateQuantity.message) return validateQuantity;

  const sale = await SalesModel.updateById(id, productId, quantity);
  return ({ sale });
};

const deleteById = async (id) => {
  const sales = await SalesModel.findById(id);
  await sales.itensSold.forEach( async ({ productId, quantity }) => {
    await ProductModel.updateQtyById(productId, quantity);
  });

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
