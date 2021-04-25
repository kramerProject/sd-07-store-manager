const Sale = require('../model/Sales');
const Product = require('../model/Products');

const EMPTY_QUANTITY = 0;

const checkAvailability = (products, sales) => sales
  .some(({ productId: soldProductId, quantity: soldQuantity }) => {
    const { quantity: currentQuantity } = products.find(({ _id: currentProductId }) =>
      String(currentProductId) === soldProductId);

    if (currentQuantity - soldQuantity < EMPTY_QUANTITY) return true;
    return false;
  });

const addSales = async (sales) => {
  const products = await Product.findAllProducts();

  const areProductsRegistered = sales.every(({ productId }) =>
    products.find(({ _id }) => String(_id) === productId));

  const areQtdFieldsValid = sales.every(({ quantity }) =>
    quantity > EMPTY_QUANTITY && typeof quantity === 'number');

  const notAvailable = checkAvailability(products, sales);

  if (notAvailable) {
    return { code: 'stock_problem', message: 'Such amount is not permitted to sell' };
  }

  if (!areProductsRegistered || !areQtdFieldsValid) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }

  const { insertedId } = await Sale.addSales(sales);

  sales.forEach(({ productId, quantity }) => {
    Product.updateProductQuantity(productId, -quantity);
  });

  return { _id: insertedId, itensSold: sales };
};

const findAllSales = async () => {
  const sales = await Sale.findAllSales();

  return sales;
};

const findSaleById = async (id) => {
  const sale = await Sale.findSaleById(id);

  if (!sale || sale.status === 'error') {
    return { code: 'not_found', message: 'Sale not found' };
  }
  return sale;
};

const updateSale = async (id, sales) => {
  const areQtdFieldsValid = sales.every(({ quantity }) =>
    quantity > EMPTY_QUANTITY && typeof quantity === 'number');

  if (!areQtdFieldsValid) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }

  const products = await Product.findAllProducts();

  const notAvailable = checkAvailability(products, sales);

  if (notAvailable) {
    return { code: 'stock_problem', message: 'Such amount is not permitted to sell' };
  }

  const currentProductQuantity = await Product.findAllProducts();

  sales.forEach(({ productId, quantity: updatedQuantity }) => {
    const { quantity: currentQuantity } = currentProductQuantity
      .find(({ _id }) => String(_id) === productId);

    Product.updateProductQuantity(productId, currentQuantity - updatedQuantity);
  });

  await Sale.updateSale(id, sales);

  return { _id: id, itensSold: sales };
};

const deleteSale = async (id) => {
  const sale = await Sale.findSaleById(id);

  const { status, itensSold } = sale;
  if (status === 'error') return {
    code: 'invalid_data', message: 'Wrong sale ID format',
  };

  await Sale.deleteSale(id);

  itensSold.forEach(({ productId, quantity }) => {
    Product.updateProductQuantity(productId, quantity);
  });

  return sale;
};

module.exports = {
  addSales,
  findAllSales,
  findSaleById,
  updateSale,
  deleteSale,
};
