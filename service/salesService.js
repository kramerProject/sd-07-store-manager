const salesModel = require('../model/salesModel');
const productModel = require('../model/produtcModel');

const insertSales = async (itensSold) => {
  try {
    const filterEqualId = await Promise.all(
      itensSold
        .map((item) => item.productId)
        .filter(async (id) => {
          id === productModel.showProductId(id);
        }),
    );
    if (filterEqualId) return await salesModel.insertSales(itensSold);
  } catch (error) {
    console.error({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
};
const updateSale = async (id, itensSold) => {
  try {
    return await salesModel.updateSale(id, itensSold);
  } catch (error) {
    console.error({ message: 'Nem um produto cadastrado' });
  }
};

const showAllSales = async () => {
  try {
    return  salesModel.showAllSales();
  } catch (error) {
    console.error({ message: 'Nem um produto cadastrado' });
  }
};

const deleteSale = async (id) => {
  try {
    return await salesModel.deleteSale(id);
  } catch (error) {
    console.error({ message: 'Não foi possivel deletar' });
  }
};

const showSalesId = async (id) => {
  try {
    return await salesModel.showSalesId(id);
  } catch (error) {
    console.error({ message: 'Nem um produto cadastrado' });
  }
};


module.exports = {
  insertSales,
  showAllSales,
  showSalesId,
  deleteSale,
  updateSale
};
