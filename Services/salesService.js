const { getAllProduct } = require('../Models/productModel');
const { addSale, getAll, getForId, update } = require('../Models/salesModel');
const { ObjectId } = require('mongodb');

const sales = async (bodyReq) => {
  const allProducst = await getAllProduct();
  if(bodyReq.every(({ productId }) => allProducst
    .some((product) => String(product._id) === productId))) 

    bodyReq.forEach((sale) => {
      const zero = 0;
      if(sale.quantity <= zero || typeof sale.quantity !== 'number') {
        throw { 
          code: 'invalid_data', 
          message: 'Wrong product ID or invalid quantity'
        }; 
      }
    });
  return await addSale(bodyReq);

};

const returnAllProducts = async () => {
  return await getAll();
};

const returnProductsForId = async (_id) => {
  const allSales = await getAll();
  const idFound = allSales.find((sale) => sale._id === _id);
  if(!idFound) throw { code: 'not_found', message: 'Sale not found' };
  return await getForId(_id);
};

const updateSales = async (id, bodyReq ) => {
  if(!ObjectId.isValid(id)) 
    throw { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  bodyReq.forEach((sale) => {
    const zero = 0;
    if(sale.quantity <= zero || typeof sale.quantity !== 'number') {
      throw { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
    };
  });
  return await update(id, bodyReq );
};
module.exports = {
  sales,
  returnAllProducts,
  returnProductsForId,
  updateSales,
};