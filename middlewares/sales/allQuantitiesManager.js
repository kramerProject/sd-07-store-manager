const {
  getProductByIdService,
  updateProductService,
} = require('../../services/productsService');

const {
  getSaleByIdService
} = require('../../services/salesService');

const NOT_FOUND = 404;

// Referência das funções desenvolvidas a seguir: Rafael Guimarães
const createdQuantitiesManager = async(req, res, next) => {
  const salesItens = req.body;
  const productFound = await getProductByIdService(salesItens[0].productId);
  productFound.quantity -= salesItens[0].quantity;
  const productUpdated = await updateProductService(
    productFound._id, productFound.name, productFound.quantity
  );
  if (!productUpdated) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      }
    });
  }
  next();
};

const deletedQuantitiesManager = async (req, res, next) => {
  const { id } = req.params;

  const saleFound = await getSaleByIdService(id);
  if (saleFound._id) {
    const productFound =  await getProductByIdService(saleFound.itensSold[0].productId);
    productFound.quantity += saleFound.itensSold[0].quantity;
    await updateProductService(
      productFound._id, productFound.name, productFound.quantity
    );
  }
  next();
};

module.exports = { createdQuantitiesManager, deletedQuantitiesManager };
