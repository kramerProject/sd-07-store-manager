const {
  createNewSale,
  findAll,
  findById,
  removeById,
//   updateById,
} = require('../services/salesService');
  
const { StatusCodes: {
  CREATED,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
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

const getAll = async (req, res) => {
  try {
    const sales = await findAll();
    return res.status(OK).send({
      'sales': sales
    });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const ZERO = 0;
    const sales = await findById(id);
    if (!sales || sales.length === ZERO) {
      return res.status(NOT_FOUND).send({
        'err': {
          'code': 'not_found',
          'message': 'Sale not found'
        }
      });
    }
    return res.status(OK).send(sales);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error.message);
  }
};

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
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await removeById(id);
    return res.status(OK).send(deleted);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error.message);
  }
};

module.exports = {
  newSale,
  getAll,
  getById,
  deleteById,
//   setById,
};