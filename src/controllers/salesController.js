const {
  createNewSale
//   findAll,
//   findById,
//   updateById,
} = require('../services/salesService');
  
const { StatusCodes: {
  CREATED,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  OK} } = require('http-status-codes');

const newSale = async (req, res) => {
  try {
    const { body } = req;
    const newSale = await createNewSale(body);
    const { _id,  itensSold } = newSale;
    return res.status(OK).send({
      _id,
      itensSold
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send(error.message);
  }
};

// const getAll = async (req, res) => {
//   try {
//     const products = await findAll();
//     return res.status(OK).send({
//       'products': products
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(INTERNAL_SERVER_ERROR).send(error.message);
//   }
// };

// const getById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const ZERO = 0;
//     const product = await findById(id);
//     if (product.length === ZERO) {
//       return res.status(UNPROCESSABLE_ENTITY).send({
//         'err': {
//           'code': 'invalid_data',
//           'message': 'Wrong id format'
//         }
//       });
//     }
//     return res.status(OK).send(product);
//   } catch (error) {
//     console.log(error);
//     return res.status(INTERNAL_SERVER_ERROR).send(error.message);
//   }
// };

// const setById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, quantity } = req.body;
//     await updateById(id, name, quantity);
//     return res.status(OK).send({
//       '_id': id,
//       name,
//       quantity,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(INTERNAL_SERVER_ERROR).send(error.message);
//   }
// };
// const deleteById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await removeById(id);
//     return res.status(OK).send(deleted);
//   } catch (error) {
//     console.log(error);
//     return res.status(INTERNAL_SERVER_ERROR).send(error.message);
//   }
// };

module.exports = {
  newSale,
//   getAll,
//   getById,
//   setById,
//   deleteById,
};