const sales = require('../models/sales');

const ZERO = 0;
const TWELVE = 12;
const TWENTYFOUR = 24;

function success(data) {
  return {
    success: true,
    data
  };
}

function err(message, code = 'invalid_data') {
  return {
    success: false,
    err: {
      code, 
      message
    }
  };
}

const getSales = async () => {
  const result = await sales.getSales();

  return result;
};

const getSaleById = async (id) => {
  if (!id || id.length !== TWELVE && id.length !== TWENTYFOUR) {
    return err('Sale not found', 'not_found');
  }

  const result = await sales.getSaleById(id);

  if(!result) return err('Sale not found', 'not_found');

  return result;  
};

const registerSales = async (itensSold) => {
  const validQuantityValue = itensSold
    .some((i => i.quantity === ZERO || i.quantity < ZERO));
  const validQuantityNumber = itensSold.some((i) => typeof i.quantity !== 'number');
  if (validQuantityValue || validQuantityNumber) {
    return err('Wrong product ID or invalid quantity');
  }

  const soldRegistered = await sales.registerSales(itensSold);

  return success({
    _id: soldRegistered.insertedId,
    itensSold
  });
};

const updateSale = async (id, itensSold) => {
  const validQuantityValue = itensSold
    .some((i => i.quantity === ZERO || i.quantity < ZERO));
  const validQuantityNumber = itensSold.some((i) => typeof i.quantity !== 'number');
  if (validQuantityValue || validQuantityNumber) {
    return err('Wrong product ID or invalid quantity');
  }

  const saleUpdated = await sales.updateSale(id, itensSold);

  return success({
    _id: id,
    itensSold,
  });
};

const deleteSale = async (id) => {
  if (!id || id.length !== TWELVE && id.length !== TWENTYFOUR) {
    return err('Wrong sale ID format');
  }

  const sale = await sales.getSaleById(id);

  if(!sale) return err('Sale not found');

  const { deletedCount } = await sales.deleteSale(id);
  if (!deletedCount) {
    return err('Sale not deleted');
  }

  return success(sale);
};

module.exports = {
  registerSales,
  getSales,
  getSaleById,
  deleteSale,
  updateSale
};
