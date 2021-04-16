const Product = require('../models/productsModel');
const Sale = require('../models/salesModel');

const updateProductQuantity = async (req, res, next) => {

  let saleList = req.body;
  const { id } = req.params;
  const { method } = req;

  if (method === 'DELETE') {
    const sales = await Sale.findById(id);
    saleList = sales.itensSold;
  }

  const newQuantityList = await Promise.all(saleList.map(async (item) => {
    const { quantity } = await Product.findById(item.productId);
    if (method === 'DELETE') return quantity + item.quantity;
    return quantity - item.quantity;
  }));

  const minQuantity = 0;
  const validateQuantity = newQuantityList.every((value) => value >= minQuantity);

  // const validateQuantity = saleList.every(async (item) => {
  //   const result = await validateProductQuantityUpdate(item.productId, item.quantity);
  //   console.log('result', result)
  //   if (!result) return false;
  // });
  // console.log('validateQuantity', validateQuantity)

  if (!validateQuantity) {
    const code = 404;
    return res.status(code).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      }
    });
  }

  saleList.forEach(async (product, index) => {
    await Product.updateQuantity(product.productId, newQuantityList[index]);
  });

  next();
};

module.exports = updateProductQuantity;



