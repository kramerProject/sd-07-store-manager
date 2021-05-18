const { StatusCodes: { UNPROCESSABLE_ENTITY } } = require('http-status-codes');
const salesService = require('../services/salesService');
const productService = require('../services/productService');

const ZERO = 0;
const ONE = 1;

const checkIdsAndQuantities = (req, res, next) => {
  const { body } = req;
  let shouldExit = false;
  body.forEach((product) => {
    const { productId, quantity } = product;
    console.log(productId, quantity);
    const productExists = productService.findById(productId);
    console.log('produtoretorno', productExists);
    console.log('tipo', typeof quantity);
    if( productExists.length < ONE
      || quantity <= ZERO
      || typeof quantity !== 'number') {
      console.log('entrou');
      shouldExit = true;
      console.log('dentro', shouldExit);
    }
  });
  console.log('bad', shouldExit);
  if(shouldExit) {
    return res.status(UNPROCESSABLE_ENTITY).send({
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong product ID or invalid quantity'
      }
    });
  }
  next();
};
// //testado - funcionando.
// const itExists = async (req, res, next) => {
//   const { name } = req.body;
//   const exists = await findByName(name);
//   if (exists !== undefined) {
//     res.status(UNPROCESSABLE_ENTITY).send({
//       'err': {
//         'code': 'invalid_data',
//         'message': 'Product already exists'
//       }
//     });
//   }
//   next();
// };
// const idExists = async (req, res, next) => {
//   const { id } = req.body;
//   const ZERO = 0;
//   const exists = await findById(id);
//   if (!exists || exists.length === ZERO) {
//     return res.status(UNPROCESSABLE_ENTITY).send({
//       'err': {
//         'code': 'invalid_data',
//         'message': 'Wrong id format'
//       }
//     });
//   }
//   next();
// };
// const idParamsExists = async (req, res, next) => {
//   const { id } = req.params;
//   const ZERO = 0;
//   const exists = await findById(id);
//   if (!exists || exists.length === ZERO) {
//     return res.status(UNPROCESSABLE_ENTITY).send({
//       'err': {
//         'code': 'invalid_data',
//         'message': 'Wrong id format'
//       }
//     });
//   }
//   next();
// };

module.exports = {
  checkIdsAndQuantities,
};