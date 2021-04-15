const ServiceSales = require('../service/servicesSales');

async function addSale(req, res) {
  const responseOK = 200;
  const responseError = 422;
  const MIN_QUANTITY = 0;
  try {
    const productsSold = req.body;
    productsSold.forEach((product) => {
      if (product.quantity <= MIN_QUANTITY || typeof product.quantity !== 'number')
        throw { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
    });
    const itensSold = await ServiceSales.serviceAddSales(productsSold);
    res.status(responseOK).json(itensSold);
  } catch (err) {
    res.status(responseError).json({
      err: {
        code: err.code,
        message: err.message,
      },
    });
  }
}

async function getSales(req, res) {
  const responseOK = 200;
  const responseError = 404;
  try {
    const sales = await ServiceSales.serviceGetAllSales();
    res.status(responseOK).json({ sales });
  } catch (err) {
    res.status(responseError).json({
      err: {
        code: err.code,
        message: err.message,
      },
    });
  }
}

async function getSaleById(req, res) {
  const responseOK = 200;
  const responseError = 404;
  try {
    const id = req.params;
    const sales = await ServiceSales.serviceGetSalesById(id);
    res.status(responseOK).json(sales);
  } catch (err) {
    res.status(responseError).json({
      err: {
        code: err.code,
        message: err.message,
      },
    });
  }
}

async function updateSale(req, res) {}

async function deleteSale(req, res) {}

module.exports = {
  addSale,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
};
