const { getAllProduct } = require('../Models/productModel');
const { addSale, } = require('../Models/salesModel');
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

module.exports = {
  sales,
};